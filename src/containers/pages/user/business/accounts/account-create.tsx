import React from 'react'
import { Container } from '@mui/material'
import { AccountForm } from './account-form'
import { useTitle } from 'contexts/app'

export const AccountCreatePage: React.FC = () => {

  useTitle('Create account')

  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 4 }}>
      <AccountForm />
    </Container>
  )
}

