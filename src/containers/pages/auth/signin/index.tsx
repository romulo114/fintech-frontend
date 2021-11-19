import React from 'react'
import { Avatar } from '@mui/material'
import { useTitle } from 'contexts/app'
import { AuthPaper } from 'components/auth'
import { PageTitle } from 'components/base'
import { SigninForm } from './signin-form'

export const SigninPage: React.FC = () => {

  useTitle('Sign in')

  return (
    <AuthPaper>
      <Avatar src="/broken-image.jpg" className='avatar' />
      <PageTitle>
        Sign in with your fithm account
      </PageTitle>
      <SigninForm />
    </AuthPaper>
  )
}
