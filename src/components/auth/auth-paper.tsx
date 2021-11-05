import React from 'react'
import { Paper } from '@mui/material'

type AuthPaperProps = {
  className?: string;
}
export const AuthPaper: React.FC<AuthPaperProps> = ({children, className}) => {
  return (
    <Paper
      sx={{
        padding: theme => theme.spacing(3),
        width: theme => theme.spacing(60)
      }}
      className={className ?? 'auth-paper'}
    >
      {children}
    </Paper>
  )
}
