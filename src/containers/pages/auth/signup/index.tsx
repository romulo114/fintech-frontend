import React from 'react'
import { Avatar } from '@mui/material'
import { useTitle } from 'contexts/app'
import { AuthPaper } from 'components/auth'
import { PageTitle } from 'components/base'
import { SignupForm } from './signup-form'

export const SignupPage: React.FC = () => {

  useTitle('Sign up')

  return (
    <AuthPaper>
      <Avatar src="/broken-image.jpg" className='avatar' />
      <PageTitle>
          Create your fithm account
      </PageTitle>
      <SignupForm />
    </AuthPaper>
  )
}
