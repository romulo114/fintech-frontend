import React from 'react'
import { Fab, FabProps, IconButton, IconButtonProps } from '@mui/material'

export const FabIconButton: React.FC<FabProps> = (props) => {

  const { sx, children, ...others } = props

  return (
    <Fab sx={{ width: 32, height: 32, minHeight: 32, ...sx }} {...others}>
      {children}
    </Fab>
  )
}

export const CircleIconButton: React.FC<IconButtonProps> = (props) => {

  const { sx, children, ...others } = props

  return (
    <IconButton
      sx={{ borderRadius: 16, width: 32, height: 32, minHeight: 32, ...sx}}
      {...others}
    >
      {children}
    </IconButton>
  )
}