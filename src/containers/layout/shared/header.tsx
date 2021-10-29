import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar } from '@mui/material'
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
            <Link className='menu-item' to='/'>
              Fithm LLC
            </Link>
          </LeftLinkWrapper>
          <LeftLinkWrapper>
            <Link className='menu-item' to='/#doc'>
              Documentation
            </Link>
          </LeftLinkWrapper>
          <LeftLinkWrapper>
            <Link className='menu-item' to='/#about'>
              About US
            </Link>
          </LeftLinkWrapper>

          <Box sx={{ flexGrow: 1 }} />

          <Link className='menu-item' to='/auth/signin'>
            Sign in
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
