import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LinearProgress, Button } from '@mui/material'

import { PortfolioTable } from 'components/user/portfolio-table'
import { PortfolioInfo } from 'types/portfolio'
import { MessageType, Message, PageTitle } from 'components/base'
import { useAuthenticate } from 'hooks/auth'
import { PortfolioApis } from 'service/portfolios'

export const PortfoliosPage: React.FC = () => {

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

        const data = await PortfolioApis.getAll(tokens?.accessToken ?? '')
        setPortfolios(data)
        console.log('portfolios: ', data)
      } catch (e: any) {
        setError(e.message)
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
