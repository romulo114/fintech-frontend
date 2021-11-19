import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import {
  Button, LinearProgress, Grid, Typography
} from '@mui/material'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { requireValidators } from 'utils/validators'
import { Message, MessageType, PageTitle } from 'components/base'
import { AccountEditTable } from 'components/user/account-table-edit'
import { PortfolioApis } from 'service/portfolios'
import { AccountApis } from 'service/accounts'
import { useAuthenticate } from 'hooks'
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

      <section className='input-group'>
        <Grid spacing={2} container>
          <Grid item xs={12} sm={8}>
            <ValidatedInput
              fullWidth
              id='portfolio-name'
              label='Name'
              variant='standard'
              className='input'
              validators={requireValidators}
              value={name}
              setValue={setName}
              disabled={!editName}
            />
          </Grid>
          <Grid item xs={12} sm={4} className='d-flex align-items-end justify-content-between'>
            <Button variant='outlined' onClick={toggleEditName}>
              {editName ? 'Cancel' : 'Edit'}
            </Button>
            {editName && (
              <Button variant='contained' onClick={updateName}>
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </section>

      <section className='input-group'>
        <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
          Accounts
        </Typography>
        <Grid spacing={2} container>
          <Grid item xs={12} sm={8}>
            <AccountEditTable
              all={accounts}
              accounts={portfolio?.accounts ?? []}
              editing={editAccount}
              selected={selected}
              setSelected={setSelected}
            />
          </Grid>
          <Grid item xs={12} sm={4} className='d-flex align-items-end justify-content-between'>
            <Button variant='outlined' onClick={toggleEditAccount}>
              {editAccount ? 'Cancel' : 'Edit'}
            </Button>
            {editAccount && (
              <Button variant='contained' onClick={updateAccounts}>
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </section>

      <section className='input-group'>
        <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
          Model
        </Typography>

        <Grid spacing={2} container>
          <Grid item xs={12} sm={8}>

          </Grid>
          <Grid item xs={12} sm={4} className='d-flex align-items-end justify-content-between'>
            <Button variant='outlined' onClick={toggleEditModel}>
              {editModel ? 'Cancel' : 'Edit'}
            </Button>
            {editModel && (
              <Button variant='contained' onClick={updateName}>
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </section>
    </form>
  )
}
