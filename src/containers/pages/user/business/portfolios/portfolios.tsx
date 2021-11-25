import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LinearProgress, Button } from '@mui/material'
import { MessageType, Message, PageTitle } from 'components/base'
import { PortfolioTable } from 'components/user'
import { useTitle } from 'contexts/app'
import { useAuthenticate } from 'hooks/auth'
import { PortfolioApis } from 'service/portfolios'
import { PortfolioInfo } from 'types/portfolio'

export const PortfoliosPage: React.FC = () => {

  useTitle('My Portfolios')

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)
  const [portfolios, setPortfolios] = useState<PortfolioInfo[]>([])

  const { tokens } = useAuthenticate()
  const history = useHistory()

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setError({})
        setBusy(true)

        const data = await PortfolioApis.getAll()
        setPortfolios(data)
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [tokens?.accessToken])

  const handleCreate: React.MouseEventHandler = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()

    history.push('/user/business/portfolios/create')
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <PageTitle>My Portfolios</PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='accounts-list'>
        <PortfolioTable portfolios={portfolios} />
      </section>
      <section className='actions'>
        <Button variant='contained' onClick={handleCreate}>
          Create
        </Button>
      </section>
    </>
  )
}
