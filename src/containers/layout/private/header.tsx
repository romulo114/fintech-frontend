import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AppBar, Box, Toolbar, IconButton, CssBaseline,
  Drawer, Divider, List, ListItem, ListItemIcon,
  ListItemText
} from '@mui/material'
import DescIcon from '@mui/icons-material/Description'
import MenuIcon from '@mui/icons-material/Menu'
import DashIcon from '@mui/icons-material/Dashboard'
import AccountIcon from '@mui/icons-material/SupervisorAccount'
import SwapIcon from '@mui/icons-material/SwapHoriz'
import BusinessIcon from '@mui/icons-material/Business'
import BadgeIcon from '@mui/icons-material/Badge'
import { UserMenu } from '../shared/user-menu'

export const DRAWER_WIDTH = 240
const BASE_URL = '/user/business'

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setMobileOpen(flag => !flag);
  }, []);

  const handleLink = (link: string) => () => {
    setMobileOpen(false);
    navigate(link);
  }

  const drawer = (
    <div>
      <Toolbar className='flex-center drawer-toolbar'>
        <Link className='menu-item' to='/'>
          Fithm
        </Link>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button onClick={handleLink(`${BASE_URL}/dashboard`)}>
          <ListItemIcon>
            <DashIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
        <ListItem button onClick={handleLink(`${BASE_URL}/accounts`)}>
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText primary='Accounts' />
        </ListItem>
        <ListItem button onClick={handleLink(`${BASE_URL}/portfolios`)}>
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText primary='Portfolios' />
        </ListItem>
        <ListItem button onClick={handleLink(`${BASE_URL}/strategies`)}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary='Strategies' />
        </ListItem>
        <ListItem button onClick={handleLink(`${BASE_URL}/trades`)}>
          <ListItemIcon>
            <SwapIcon />
          </ListItemIcon>
          <ListItemText primary='Trades' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLink(`${BASE_URL}/documentation`)}>
          <ListItemIcon>
            <DescIcon />
          </ListItemIcon>
          <ListItemText primary='Documentation' />
        </ListItem>
      </List>
    </div>
  )

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon color='primary' />
          </IconButton>
          <Link className='menu-item' to='/blogs'>
            Blog
          </Link>
          <Link className='menu-item' to='/tutorial'>
            Tutorials
          </Link>
          <Link className='menu-item' to='/about'>
            About
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <UserMenu />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="business folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={window.document.body}
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              height: `calc(100% - 64px)`
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}
