import React from 'react'
import { Typography } from '@mui/material'

export const FormTitle: React.FC = ({ children }) => (
  <Typography
    variant='h1'
    sx={{
      fontSize: theme => 1.5 * theme.typography.fontSize,
      margin: theme => theme.spacing(2, 0)
    }}
    className='form-title'
  >
    {children}
  </Typography>
)
