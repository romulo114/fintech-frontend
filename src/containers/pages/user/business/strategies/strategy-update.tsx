import React from 'react'
import { Container } from '@mui/material'
import { StrategyForm } from './strategy-form'
import { useTitle } from 'contexts/app'

export const StrategyUpdate: React.FC = () => {
  useTitle('Update strategy');

  return (
    <Container maxWidth='md' sx={{ p: 3, mt: 4 }}>
      <StrategyForm />
    </Container>
  )
}
