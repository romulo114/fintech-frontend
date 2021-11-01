import React from 'react'
import { Paper, Avatar, Typography } from '@mui/material'
import { useTitle } from 'contexts/app'
import { SignupForm } from './signup-form'

export const SignupPage: React.FC = () => {

  useTitle('Sign up')

  return (
    <Paper
      sx={{
        padding: theme => theme.spacing(3),
        width: theme => theme.spacing(60)
      }}
      className='auth-signup'
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
          Create your fithm account
      </Typography>
      <SignupForm />
    </Paper>
  )
}
