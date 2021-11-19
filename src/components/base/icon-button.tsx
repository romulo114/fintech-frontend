import React from 'react'
import { Fab, FabProps } from '@mui/material'

export const IconButton: React.FC<FabProps> = (props) => {

  const { sx, children, ...others } = props

  return (
    <Fab sx={{ width: 32, height: 32, minHeight: 32, ...sx }} {...others}>
      {children}
    </Fab>
  )
}
