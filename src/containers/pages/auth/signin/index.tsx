import React from 'react'
import { Avatar } from '@mui/material'
import { useTitle } from 'contexts/app'
import { AuthPaper } from 'components/auth'
import { FormTitle } from 'components/form'
import { SigninForm } from './signin-form'

export const SigninPage: React.FC = () => {

  useTitle('Sign in')

  return (
    <AuthPaper>
      <Avatar src="/broken-image.jpg" className='avatar' />
      <FormTitle>
        Sign in with your fithm account
      </FormTitle>
      <SigninForm />
    </AuthPaper>
  )
}
