import React from 'react'
import { Paper } from '@mui/material'

type BusinessPaperProps = {
  className?: string;
}
export const BusinessPaper: React.FC<BusinessPaperProps> = ({children, className}) => {
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
