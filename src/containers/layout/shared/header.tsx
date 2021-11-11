import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar } from '@mui/material'
import { UserMenu } from './user-menu'

export const Header: React.FC = () => {
  return (
    <Box component='header' className='header'>
      <AppBar position='static' color='primary'>
        <Toolbar sx={{ fontSize: '1.25rem' }}>
          <Link className='menu-item' to='/'>
            Fithm
          </Link>
          <Link className='menu-item' to='/blogs'>
            Blog
          </Link>
          <Link className='menu-item' to='/tutorial'>
            Tutorials
          </Link>
          <Link className='menu-item' to='/support'>
            Support
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
