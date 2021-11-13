import React from 'react'
import { Container } from '@mui/material'
import { useTitle } from 'contexts/app'

export const SupportPage: React.FC = () => {

  useTitle('About')

  return (
    <Container maxWidth='lg'>
      <h1>
        Fithm
      </h1>
      <div className='about'>
        <h3>
          About fithm
        </h3>
        <p>
          fithm creates investment tools for investors. 
          Our mission is leverage technology as much as possible 
          in order to automate investing and allow people to focus on their core strengths.
        </p>
      </div>
      <div className='imagine'>
        <h3>Imagine a Strategy Exchange</h3>
        <p>
          A centralized marketplace for strategies. 
          Investors could exit and enter entire portfolios with one click. 
          It would create more competition among providers driving down fees. 
          It allows easier entry into providing active management. 
          It fundamentally changes the industry.
        </p>
        <p>
          Yes this may sound a bit grandiose but we see as inevitable. 
          The Platform takes us one step closer.
        </p>
      </div>
      <div className='contact'>
        <b>Contact Us: </b>
        <a href='mailto:info@fithm.com' className='contact-link'>
          info@fithm.com
        </a>
      </div>
    </Container>
  )
}
