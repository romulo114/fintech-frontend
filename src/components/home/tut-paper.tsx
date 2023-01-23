import React from 'react'
import { Paper } from '@mui/material'

type TutPaperProps = {
  className?: string;
  title?: string;
  children: React.ReactNode;
}
export const TutPaper = ({children, className, title}: TutPaperProps) => {
  return (
    <Paper
      sx={{ padding: theme => theme.spacing(3) }}
      className={className ?? 'tut-paper'}
    >
      {!!title && <h2 className='title'>{title}</h2>}
      {children}
    </Paper>
  )
}
