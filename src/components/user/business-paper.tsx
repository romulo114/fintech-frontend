import React from 'react'
import { Paper } from '@mui/material'

type BusinessPaperProps = {
  className?: string;
  children: React.ReactElement;
}
export const BusinessPaper = ({children, className}: BusinessPaperProps) => {
  return (
    <Paper
      sx={{
        padding: theme => theme.spacing(3),
        width: '100%'
      }}
      className={className ?? 'busi-paper'}
    >
      {children}
    </Paper>
  )
}
