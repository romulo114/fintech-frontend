import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AccountApis } from 'service/accounts'
import { useAuthenticate } from 'hooks/auth'
import { Button } from '@mui/material'

import { AccountTable } from 'components/user/account-table'
import { AccountInfo } from 'types/account'

export const AccountsPage: React.FC = () => {

  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [accounts, setAccounts] = useState<AccountInfo[]>([])

  const { tokens } = useAuthenticate()
  const history = useHistory()

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setError('')
        setBusy(true)

        const data = await AccountApis.getAll(tokens?.accessToken ?? '')
        console.log('accounts: ', data)
      } catch (e: any) {
        setError(e.message)
        console.log(e)
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

  const handleDelete: (id: number) => Promise<void> = useCallback((id: number) => {
    return new Promise(resolve => {
      resolve()
    })
  }, [])

  const handleEdit = useCallback((id: number) => {

  }, [])

  return (
    <>
      <h1 className='title'>My Accounts</h1>
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
