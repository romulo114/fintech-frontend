import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { LinearProgress, Button, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { MessageType, Message, PageTitle } from 'components/base'
import { useAuthenticate } from 'hooks/auth'
import { StrategyTable } from 'components/user'
import { ModelApis } from 'service/models'
import { ModelInfo } from 'types/model'

export const StrategyList: React.FC = () => {

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  const [mine, setMine] = useState(false)
  const [models, setModels] = useState<ModelInfo[]>([])
  const history = useHistory()
  const { tokens } = useAuthenticate()

  const handleChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    setMine(value === 'mine')
  }, [])

  const handleCreate = useCallback(() => {
    history.push('/user/business/strategies/create')
  }, [history])

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        setError({})
        const data = await ModelApis.getAll(tokens?.accessToken ?? '', !mine)
        console.log(data)
        setModels(data)
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [mine, tokens?.accessToken])

  return (
    <>
      <PageTitle>My Strategies</PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='strategy-list'>
        <ToggleButtonGroup
          color='primary'
          value={mine ? 'mine': 'public'}
          exclusive
          onChange={handleChange}
          size='small'
          sx={{ my: 1 }}
          disabled={busy}
        >
          <ToggleButton value='mine'>My Strategies</ToggleButton>
          <ToggleButton value='public'>Public Strategies</ToggleButton>
        </ToggleButtonGroup>

        <StrategyTable models={models} />
      </section>

      <section className='actions'>
        <Button variant='contained' onClick={handleCreate}>
          Create
        </Button>
      </section>
    </>
  )
}
