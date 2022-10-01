import React from 'react'
import { Container } from '@mui/material'
import { TradeUpdateForm } from './trade-update-form'
import { useTitle } from 'contexts/app'

export const TradeUpdate: React.FC = () => {


  useTitle('Update trade')

  return (
    <Container maxWidth='lg' sx={{ p: 3, mt: 4 }}>
      <TradeUpdateForm />
    </Container>
  )

}
