import React from 'react'
import { Paper } from '@mui/material'

type TutPaperProps = {
  className?: string;
  title?: string;
}
export const TutPaper: React.FC<TutPaperProps> = ({children, className, title}) => {
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
