import React, { useState, useEffect, useCallback } from 'react'
import { LinearProgress, Button } from '@mui/material'
import { MessageType, Message, PageTitle } from 'components/base'
import { ValidatedInput } from 'components/form'
import { useTitle } from 'contexts/app'
import { TradeApis } from 'service/trade'
import { requireValidators } from 'utils/validators'
import { ValidatedText } from 'types/validate'
import { TradeInfo } from 'types'
import { TradeTable } from 'components/user/trade-table'

export const TradeList: React.FC = () => {

  useTitle('My Trades')

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState<ValidatedText>({ value: '', error: '' })

  const [trades, setTrades] = useState<TradeInfo[]>([])

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        setBusy(true)
        setError({})

        const trades = await TradeApis.getAll()
        setTrades(trades)
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetch()
  }, [])

  const handleCreate = useCallback(async () => {
    if (!creating) {
      setCreating(true)
    } else {
      try {
        setBusy(true)
        setError({})

        await TradeApis.create({ name: name.value })
        const trades = await TradeApis.getAll()
        console.log(trades)
        setTrades(trades)
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }
  }, [creating, name.value])

  const handleCancel = useCallback(() => {
    setCreating(false)
  }, [])

  const disabled = creating && (!name.value || !!name.error)

  return (
    <>
      <PageTitle>My Trades</PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='data-list'>
        <TradeTable trades={trades} />
      </section>

      {creating && (
        <form className='trade-form'>
          <ValidatedInput
            fullWidth
            id='strategy-name'
            label='Name'
            variant='standard'
            className='input'
            validators={requireValidators}
            value={name}
            setValue={setName}
          />
        </form>
      )}

      <section className='actions'>
        {creating && (
          <Button variant='outlined' onClick={handleCancel} sx={{ mr: 2 }}>
            Cancel
          </Button>
        )}
        <Button variant='contained' onClick={handleCreate} disabled={disabled}>
          Create
        </Button>
      </section>
    </>
  )
}
