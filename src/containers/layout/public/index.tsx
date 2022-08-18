import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import { Header, Footer } from '../shared';

export const PublicLayout = () => {
  return (
    <Box className='public-layout'>
      <CssBaseline />
      <Header />
      <Box component='main' className='main'>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
