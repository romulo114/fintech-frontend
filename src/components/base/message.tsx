import React, { useCallback, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

interface MessageProps {
  type: 'error' | 'warning' | 'info' | 'success';
  duration?: number;
}
export const Message: React.FC<MessageProps> = (props) => {

  const { children, type, duration } = props
  const [show, setShow] = useState(true)

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  return (
    <Snackbar
      autoHideDuration={duration}
      open={show}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Alert severity={type} onClose={handleClose} variant='filled'>
        {children}
      </Alert>
    </Snackbar>
  )
}

Message.defaultProps = {
  duration: 3000
}
