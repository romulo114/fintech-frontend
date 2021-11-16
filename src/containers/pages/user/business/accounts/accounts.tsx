import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LinearProgress } from '@mui/material'
import { AccountApis } from 'service/accounts'
import { useAuthenticate } from 'hooks/auth'
import { Button } from '@mui/material'

import { AccountTable } from 'components/user/account-table'
import { AccountInfo } from 'types/account'
import { MessageType, Message } from 'components/base'

export const AccountsPage: React.FC = () => {

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)
  const [accounts, setAccounts] = useState<AccountInfo[]>([])

  const { tokens } = useAuthenticate()
  const history = useHistory()

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setError({})
        setBusy(true)

        const data = await AccountApis.getAll(tokens?.accessToken ?? '')
        setAccounts(data)
        console.log('accounts: ', data)
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

    history.push('/user/business/accounts/create')
    // eslint-disable-next-line
  }, [])

  const handleDelete: (id: number) => Promise<void> = useCallback(async (id: number) => {
    try {
      setError({})
      setBusy(true)

      const accessToken = tokens?.accessToken ?? ''
      await AccountApis.delete(accessToken, id)
      setAccounts(await AccountApis.getAll(accessToken))
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }, [tokens?.accessToken])

  const handleEdit = useCallback((id: number) => {
    history.push(`/user/business/accounts/${id}/edit`)
  }, [history])

  return (
    <>
      <h1 className='title'>My Accounts</h1>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='accounts-list'>
        <AccountTable
          accounts={accounts}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>
      <section className='actions'>
        <Button variant='contained' onClick={handleCreate}>
          Create
        </Button>
      </section>
    </>
  )
}
