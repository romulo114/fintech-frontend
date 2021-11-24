import React from 'react'
import { Container } from '@mui/material'
import { PortfolioUpdateForm } from './portfolio-update-form'
import { useTitle } from 'contexts/app'

export const PortfolioUpdate: React.FC = () => {

  useTitle('Update portfolio')

  return (
    <Container maxWidth='md' sx={{ p: 3, mt: 4 }}>
      <PortfolioUpdateForm />
    </Container>
  )
}
