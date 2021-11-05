import React from 'react'
import { CssBaseline } from '@mui/material'

import { PrivateLayout } from 'containers/layout/private'
import { UserPage } from 'containers/pages/user'

export const PrivatePages: React.FC = () => {

  return (
    <PrivateLayout>
      <CssBaseline />
      <UserPage />
    </PrivateLayout>
  )
}
