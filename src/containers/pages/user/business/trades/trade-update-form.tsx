import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {
  LinearProgress, Typography,
  Button, FormControlLabel, Checkbox
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { ValidatedInput } from 'components/form'
import { Message, MessageType, PageTitle, CircleIconButton } from 'components/base'
import { AccountEditTable, StrategySelectTable } from 'components/user'
import { PortfolioApis } from 'service/portfolios'
import { TradeApis } from 'service/trade'
import { requireValidators } from 'utils/validators'
import { ValidatedText } from 'types/validate'
import { TradeInfo, PortfolioInfo } from 'types'

export const TradeUpdateForm: React.FC = () => {

  const { tradeId } = useParams<{ tradeId: string }>()
  const history = useHistory()

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  const [trade, setTrade] = useState<TradeInfo | null>(null)
  // update name
  const [name, setName] = useState<ValidatedText>({ value: '', error: '' })
  const [editTrade, setEditTrade] = useState(false)
  const [status, setStatus] = useState<boolean>(trade?.status ?? false)

  // update portfolios
  const [portfolios, setPortfolios] = useState<PortfolioInfo[]>([])
  const [selected, setSelected] = useState<PortfolioInfo[]>([])
  const [editPortfolio, setEditPortfolio] = useState(false)

  const toggleEditTrade: () => void = useCallback(() => {
    setEditTrade(edit => !edit)
    setName({ value: trade?.name ?? '', error: '' })
    setStatus(trade?.status ?? false)
  }, [trade])

  const toggleEditPortfolio: () => void = useCallback(() => {
    setEditPortfolio(edit => !edit)
    setSelected(trade?.portfolios ?? [])
  }, [trade?.portfolios])

  const updateTrade: () => Promise<void> = useCallback(async () => {
    try {
      setBusy(true)
      setError({})

      const updated = await TradeApis.update(+tradeId, { name: name.value, status })
      setTrade(updated)
      setName({ value: updated.name, error: '' })
      setStatus(updated.status)
      setError({ type: 'success', message: 'Trade updated' })
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }, [name, status, tradeId])

  const updatePortfolios: () => Promise<void> = async () => {
    try {
      setBusy(true)
      setError({})

      const updated = await TradeApis.updatePortfolios(
        +tradeId, { portfolios: selected.map(sel => sel.id) }
      )
      setTrade(updated)
      setEditPortfolio(false)
      setError({ type: 'success', message: 'Portfolios saved' })
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }

  const changeStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.checked)
  }, [])

  const onDelete: () => Promise<void> = async () => {
    try {
      setBusy(true)
      setError({})

      await TradeApis.delete(+tradeId)
      setError({ type: 'success', message: 'Trade deleted' })
      setTimeout(() => {
        history.push('/user/business/trades')
      }, 2000)
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        setError({})

        const portfolios = await PortfolioApis.getAll()
        setPortfolios(portfolios)
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [])

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        setError({})

        const result = await TradeApis.get(+tradeId)
        setTrade(result)
        setName({ value: result.name, error: '' })
        setStatus(result.status)
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [tradeId])

  useEffect(() => {
    if (editPortfolio) {
      const current = trade?.portfolios ?? []
      setSelected([...current])
    }
  }, [editPortfolio, trade?.portfolios])

  return (
    <form className='trade-form'>
      <PageTitle>Update Trade</PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='input-group hover-show-wrapper'>
        <div className='d-flex align-items-end'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Name & Status
          </Typography>

          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditTrade}>
              {editTrade ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editTrade && (
              <CircleIconButton onClick={updateTrade}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        <ValidatedInput
          fullWidth
          id='portfolio-name'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={name}
          setValue={setName}
          disabled={!editTrade}
        />
        <FormControlLabel
          control={<Checkbox checked={status} onChange={changeStatus} />}
          label="Status"
          className='input'
          disabled={!editTrade}
        />
      </section>

      <section className='input-group hover-show-wrapper'>
        <div className='d-flex align-items-end'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Portfolios
          </Typography>
          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditPortfolio}>
              {editPortfolio ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editPortfolio && (
              <CircleIconButton onClick={updatePortfolios}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        {/* <AccountEditTable
          all={accounts}
          accounts={portfolio?.accounts ?? []}
          editing={editAccount}
          selected={selected}
          setSelected={setSelected}
        /> */}
      </section >

      <section className='actions justify-content-start'>
        <Button variant='outlined' color='error' onClick={onDelete}>
          Delete
        </Button>
      </section>
    </form >
  )
}
