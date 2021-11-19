import React from 'react'
import { Container } from '@mui/material'
import { StrategyForm } from './strategy-form'

export const StrategyCreate: React.FC = () => {
  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 4 }}>
      <StrategyForm />
    </Container>
  )
}
