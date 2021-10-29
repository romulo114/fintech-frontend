import React from 'react'
import { AppBar, Box, Toolbar, Link } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

const LeftLinkWrapper = styled('div')(({theme}) => ({
  marginRight: theme.spacing(2),
  '&:hover': alpha(theme.palette.common.white, 0.25)
}))

export const Header: React.FC = () => {
  return (
    <Box component='header' className='header'>
      <AppBar position='static' color='primary'>
        <Toolbar sx={{ fontSize: '1.25rem' }}>
          <LeftLinkWrapper>
            <Link color='inherit' href='/' underline='none'>
              Fithm LLC
            </Link>
          </LeftLinkWrapper>
          <LeftLinkWrapper>
            <Link color='inherit' href='/#doc' underline='none'>
              Documentation
            </Link>
          </LeftLinkWrapper>
          <LeftLinkWrapper>
            <Link color='inherit' href='/#about' underline='none'>
              About US
            </Link>
          </LeftLinkWrapper>

          <Box sx={{ flexGrow: 1 }} />

          <Link color='inherit' href='/auth/signin' underline='none'>
            Sign in
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
