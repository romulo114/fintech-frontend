import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LinearProgress, Button } from '@mui/material'
import { AccountApis } from 'service/accounts'
import { useAuthenticate } from 'hooks/auth'

import { AccountTable } from 'components/user/account-table'
import { AccountInfo } from 'types/account'
import { MessageType, Message, Dialog, PageTitle } from 'components/base'

export const AccountsPage: React.FC = () => {

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [accounts, setAccounts] = useState<AccountInfo[]>([])
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(-1)

  const { tokens } = useAuthenticate()
  const history = useHistory()

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setError({})
        setBusy(true)

        const data = await AccountApis.getAll(tokens?.accessToken ?? '')
        setAccounts(data)
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

  const handleDelete: (id: number) => void = useCallback((id: number) => {
    setDeleteId(id)
    setOpen(true)
  }, [])

  const handleClose: () => void = useCallback(() => {
    setOpen(false)
  }, [])

  const onDelete: () => Promise<void> = useCallback(async () => {
    try {
      setOpen(false)
      setError({})
      setBusy(true)

      const accessToken = tokens?.accessToken ?? ''
      await AccountApis.delete(accessToken, deleteId)
      setAccounts(await AccountApis.getAll(accessToken))
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }, [tokens?.accessToken, deleteId])

  const handleEdit = useCallback((id: number) => {
    history.push(`/user/business/accounts/${id}/edit`)
  }, [history])

  return (
    <>
      <PageTitle>My Accounts</PageTitle>

      <Dialog
        open={open}
        onClose={handleClose}
        header='Confirm Delete account'
        body='Are you sure to delete the account?'
        yes='Delete'
        cancel='Cancel'
        onYes={onDelete}
        onCancel={handleClose}
      />

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
        <Button variant='contained' onClick={handleCreate} disabled={busy}>
          Create
        </Button>
      </section>
    </>
  )
}
