import React from 'react'
import { Container } from '@mui/material'
import { PortfolioForm } from './portfolio-form'

export const PortfolioCreate: React.FC = () => {
  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 4 }}>
      <PortfolioForm />
    </Container>
  )
}
