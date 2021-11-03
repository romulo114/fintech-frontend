import React from 'react'
import { Avatar } from '@mui/material'
import { useTitle } from 'contexts/app'
import { AuthPaper, AuthTitle } from 'components/auth'
import { SigninForm } from './signin-form'

export const SigninPage: React.FC = () => {

  useTitle('Sign in')

  return (
    <AuthPaper>
      <Avatar src="/broken-image.jpg" className='avatar' />
      <AuthTitle>
        Sign in with your fithm account
      </AuthTitle>
      <SigninForm />
    </AuthPaper>
  )
}
