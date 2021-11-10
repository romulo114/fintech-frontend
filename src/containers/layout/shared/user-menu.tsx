import React, { MouseEvent, MouseEventHandler, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Menu, MenuItem,
  ListItemIcon, Avatar, Link
} from '@mui/material'
import { useAuthenticate } from 'hooks/auth'
import { nameToAbbr } from 'utils/strings'
import Logout from '@mui/icons-material/Logout'


export const UserMenu: React.FC = () => {

  const { user, signout } = useAuthenticate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const history = useHistory()

  const handleSignout = async (): Promise<void> => {
    await signout()
    history.replace('/')
  }

  const menuOpen: MouseEventHandler<HTMLDivElement> = (e: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const menuClose = (): void => {
    setAnchorEl(null);
  }

  const goProfile = (): void => {
    history.push('/user/profile')
  }

  if (!user) {
    return (
      <Link className='menu-item' href='/auth/signin'>
        Sign in
      </Link>
    )
  }

  return (
    <>
      <Avatar
        sx={{ bgcolor: theme => theme.palette.primary.dark }}
        onClick={menuOpen}
      >
        {nameToAbbr(user?.username)}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        id='user-menu'
        keepMounted
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        open={!!anchorEl}
        onClose={menuClose}
      >
        {user?.active && (
          <>
            <MenuItem onClick={goProfile}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={goProfile}>
              <Avatar /> My account
            </MenuItem>
          </>
        )}
        <MenuItem onClick={handleSignout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </>
  )
}
