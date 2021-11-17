import React from 'react'
import { Avatar } from '@mui/material'
import { useTitle } from 'contexts/app'
import { AuthPaper } from 'components/auth'
import { FormTitle } from 'components/form'
import { SignupForm } from './signup-form'

export const SignupPage: React.FC = () => {

  useTitle('Sign up')

  return (
    <AuthPaper>
      <Avatar src="/broken-image.jpg" className='avatar' />
      <FormTitle>
          Create your fithm account
      </FormTitle>
      <SignupForm />
    </AuthPaper>
  )
}
