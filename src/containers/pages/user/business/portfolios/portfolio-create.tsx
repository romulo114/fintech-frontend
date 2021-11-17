import React from 'react'
import { Paper, Container } from '@mui/material'
import { PortfolioForm } from './portfolio-form'

export const PortfolioCreate: React.FC = () => {
  return (
    <Container maxWidth='sm'>
      <Paper sx={{ p: 3, mt: 4 }}>
        <PortfolioForm />
      </Paper>
    </Container>
  )
}
