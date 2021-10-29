import React, { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

import { Header, Footer } from '../shared'

export const PublicLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <Box className='public-layout'>
      <Header />
      <Box component='main'>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
