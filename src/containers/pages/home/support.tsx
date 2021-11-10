import React from 'react'
import { Container } from '@mui/material'

export const SupportPage: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <h1>
        Fithm
      </h1>
      Contact Us: 
      <a href='mailto:info@fithm.com' className='contact-link'>
        info@fithm.com
      </a>
    </Container>
  )
}
