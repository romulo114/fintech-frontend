import React from 'react'
import { Paper, Container } from '@mui/material'
import { PortfolioUpdateForm } from './portfolio-update-form'

export const PortfolioUpdate: React.FC = () => {
  return (
    <Container maxWidth='md' sx={{ p: 3, mt: 4 }}>
      <PortfolioUpdateForm />
    </Container>
  )
}
