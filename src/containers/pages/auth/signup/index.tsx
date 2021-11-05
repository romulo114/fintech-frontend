import React from 'react'
import { Avatar } from '@mui/material'
import { useTitle } from 'contexts/app'
import { AuthPaper, AuthTitle } from 'components/auth'
import { SignupForm } from './signup-form'

export const SignupPage: React.FC = () => {

  useTitle('Sign up')

  return (
    <AuthPaper>
      <Avatar src="/broken-image.jpg" className='avatar' />
      <AuthTitle>
          Create your fithm account
      </AuthTitle>
      <SignupForm />
    </AuthPaper>
  )
}
