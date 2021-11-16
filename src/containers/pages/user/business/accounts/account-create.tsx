import React from 'react'
import { Paper, Container } from '@mui/material'
import { AccountForm } from './account-form'

export const AccountCreatePage: React.FC = () => (
  <Container maxWidth='sm'>
    <Paper sx={{ p: 3, mt: 4 }}>
      <AccountForm />
    </Paper>
  </Container>
)
