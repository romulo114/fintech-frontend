import React from 'react'
import { Paper, Avatar, Typography } from '@mui/material'
import { useTitle } from 'contexts/app'
import { SigninForm } from './signin-form'

export const SigninPage: React.FC = () => {

  useTitle('Sign in')

  return (
    <Paper
      sx={{
        padding: theme => theme.spacing(3),
        width: theme => theme.spacing(60)
      }}
      className='auth-signin'
    >
      <Avatar src="/broken-image.jpg" className='avatar' />
      <Typography
        variant='h1'
        sx={{ 
          fontSize: theme => 1.5 * theme.typography.fontSize,
          margin: theme => theme.spacing(2, 0)
        }}
        className='title'
      >
          Sign in with your fithm account
      </Typography>
      <SigninForm />
    </Paper>
  )
}
