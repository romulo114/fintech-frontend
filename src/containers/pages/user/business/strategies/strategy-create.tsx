import React from 'react'
import { Container } from '@mui/material'
import { StrategyForm } from './strategy-form'
import { useTitle } from 'contexts/app'

export const StrategyCreate: React.FC = () => {

  useTitle('Create strategy')

  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 4 }}>
      <StrategyForm />
    </Container>
  )
}