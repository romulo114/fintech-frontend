import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, LinearProgress } from '@mui/material'
import { Message, MessageType } from 'components/base'
import { StrategyForm } from './strategy-form'
import { useTitle } from 'contexts/app'
import { useAuthenticate } from 'hooks'
import { ModelApis } from 'service/models'
import { ModelInfo } from 'types/model'

export const StrategyUpdate: React.FC = () => {

  useTitle('Update strategy')

  const { strategyId } = useParams<{ strategyId: string }>()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [model, setModel] = useState<ModelInfo | null>(null)
  const { tokens } = useAuthenticate()

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        const data = await ModelApis.get(+strategyId)
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
