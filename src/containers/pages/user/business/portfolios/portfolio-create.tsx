import React from 'react'
import { Container } from '@mui/material'
import { PortfolioForm } from './portfolio-form'
import { useTitle } from 'contexts/app'

export const PortfolioCreate: React.FC = () => {

  useTitle('Create portfolio')

  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 4 }}>
      <PortfolioForm />
    </Container>
  )
}
