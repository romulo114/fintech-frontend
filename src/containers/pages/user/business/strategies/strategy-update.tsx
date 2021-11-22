import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, LinearProgress } from '@mui/material'
import { StrategyForm } from './strategy-form'
import { Message, MessageType } from 'components/base'
import { useAuthenticate } from 'hooks'
import { ModelApis } from 'service/models'
import { ModelInfo } from 'types/model'

export const StrategyUpdate: React.FC = () => {

  const { strategyId } = useParams<{ strategyId: string }>()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [model, setModel] = useState<ModelInfo | null>(null)
  const { tokens } = useAuthenticate()

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        const data = await ModelApis.get(tokens?.accessToken ?? '', +strategyId)
        setModel(data)
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [tokens?.accessToken, strategyId])
  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 4 }}>
      {busy && (<LinearProgress />)}
      {error.type && <Message type={error.type}>{error.message}</Message>}
      {model && (<StrategyForm model={model} />)}
    </Container>
  )
}
