import React from 'react'
import { Typography } from '@mui/material'

export const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant='h1'
    sx={{
      fontSize: theme => 1.5 * theme.typography.fontSize,
      margin: theme => theme.spacing(2, 0)
    }}
    className='page-title'
  >
    {children}
  </Typography>
)
