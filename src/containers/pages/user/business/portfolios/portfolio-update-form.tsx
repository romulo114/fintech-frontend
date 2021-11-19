import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import {
  Button, LinearProgress, Grid, Typography
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { Message, MessageType, PageTitle, CircleIconButton } from 'components/base'
import { ValidatedInput } from 'components/form'
import { AccountEditTable } from 'components/user/account-table-edit'
import { PortfolioApis } from 'service/portfolios'
import { AccountApis } from 'service/accounts'
import { useAuthenticate } from 'hooks'
import { requireValidators } from 'utils/validators'
import { ValidatedText } from 'types/validate'
import { AccountInfo } from 'types/account'
import { PortfolioInfo } from 'types/portfolio'

export const PortfolioUpdateForm: React.FC = () => {

  const { portfolioId } = useParams<{ portfolioId: string }>()

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  // update name
  const [name, setName] = useState<ValidatedText>({ value: '', error: '' })
  const [editName, setEditName] = useState(false)

  // update accounts
  const [portfolio, setPortfolio] = useState<PortfolioInfo | null>(null)
  const [accounts, setAccounts] = useState<AccountInfo[]>([])
  const [selected, setSelected] = useState<AccountInfo[]>([])
  const [editAccount, setEditAccount] = useState(false)

  // update Model
  const [editModel, setEditModel] = useState(false)
  const { tokens } = useAuthenticate()

  const toggleEditName: () => void = useCallback(() => {
    setEditName(edit => !edit)
    setName({ value: portfolio?.name ?? '', error: '' })
  }, [portfolio?.name])

  const toggleEditAccount: () => void = useCallback(() => {
    setEditAccount(edit => !edit)
    setSelected(portfolio?.accounts ?? [])
  }, [portfolio?.accounts])

  const toggleEditModel: () => void = useCallback(() => {
    setEditModel(edit => !edit)
  }, [])

  const updateName: () => Promise<void> = useCallback(async () => {
    try {
      setBusy(true)
      setError({})

      const updated = await PortfolioApis.update(
        tokens?.accessToken ?? '', +portfolioId, { name: name.value }
      )
      setPortfolio(updated)
      setName({ value: updated.name, error: '' })
      setError({ type: 'success', message: 'Name saved' })
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }, [tokens?.accessToken, name, portfolioId])

  const updateAccounts: () => Promise<void> = async () => {
    try {
      setBusy(true)
      setError({})

      const updated = await PortfolioApis.updateAccounts(
        tokens?.accessToken ?? '', +portfolioId, { accounts: selected.map(sel => sel.id) }
      )
      setPortfolio(updated)
      setEditAccount(false)
      setError({ type: 'success', message: 'Accounts saved' })
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

        const result = await Promise.all([
          PortfolioApis.get(tokens?.accessToken ?? '', +portfolioId),
          AccountApis.getAll(tokens?.accessToken ?? '')
        ])
        setPortfolio(result[0])
        setName({ value: result[0].name, error: '' })
        setAccounts(result[1])
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [portfolioId, tokens?.accessToken])

  useEffect(() => {
    if (editAccount) {
      const current = portfolio?.accounts ?? []
      setSelected([...current])
    }
  }, [editAccount, portfolio?.accounts])


  return (
    <form className='portfolio-form'>
      <PageTitle>Update Portfolio</PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='input-group hover-show-wrapper'>
        <div className='d-flex'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Name
          </Typography>
          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditName}>
              {editName ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editName && (
              <CircleIconButton onClick={updateName}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        <ValidatedInput
          fullWidth
          id='portfolio-name'
          // label='Name'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={name}
          setValue={setName}
          disabled={!editName}
        />
      </section>

      <section className='input-group hover-show-wrapper'>
        <div className='d-flex'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Accounts
          </Typography>
          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditAccount}>
              {editAccount ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editAccount && (
              <CircleIconButton onClick={updateAccounts}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        <AccountEditTable
          all={accounts}
          accounts={portfolio?.accounts ?? []}
          editing={editAccount}
          selected={selected}
          setSelected={setSelected}
        />
      </section >

      <section className='input-group hover-show-wrapper'>
        <div className='d-flex'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Model
          </Typography>
          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditModel}>
              {editModel ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editModel && (
              <CircleIconButton onClick={updateName}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>

        </div>


      </section>
    </form >
  )
}
