import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar, MenuItem } from '@mui/material'
import { UserMenu } from '../shared/user-menu'

export const Header: React.FC = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuItem>
            <Link className='menu-item' to='/'>
              Fithm LLC
            </Link>
          </MenuItem>
          <Box sx={{ flexGrow: 1 }} />
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
