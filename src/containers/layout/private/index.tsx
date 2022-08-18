import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { Header, DRAWER_WIDTH } from './header';
import { Footer } from './footer';
import { BusinessPaper } from 'components/user/business-paper';

export const PrivateLayout = () => {
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
        <Box className='contents'>
          <BusinessPaper>
            <Outlet />
          </BusinessPaper>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
