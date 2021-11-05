import React, { PropsWithChildren} from 'react'
import { Box } from '@mui/material'
import { Header } from './header'
import { Footer } from './footer'

export const PrivateLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <Box className='private-layout'>
      <Header />
      <Box component='main'>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
