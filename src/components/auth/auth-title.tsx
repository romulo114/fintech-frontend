import React from 'react'
import { Typography } from '@mui/material'

export const AuthTitle = ({ children }: React.PropsWithChildren) => {
  return (
    <Typography
      variant='h1'
      sx={{
        fontSize: theme => 1.5 * theme.typography.fontSize,
        margin: theme => theme.spacing(2, 0)
      }}
      className='title'
    >
      {children}
    </Typography>
  )
}
