import React, { PropsWithChildren } from 'react'
import { Box, Toolbar } from '@mui/material'
import { Header, DRAWER_WIDTH } from './header'
import { Footer } from './footer'

export const PrivateLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box className='private-layout'>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` }
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
