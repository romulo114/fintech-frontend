import React from 'react'
import { Container } from '@mui/material'
import { AccountForm } from './components/account-form'
import { PageTitle } from 'components/base';
import { useTitle } from 'contexts/app'

export const AccountCreatePage: React.FC = () => {

  useTitle('Create account')

  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 3 }}>
      <PageTitle>Create your Account</PageTitle>

      <AccountForm />
    </Container>
  )
}

