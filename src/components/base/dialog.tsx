import React from 'react'
import { Button, Modal, Box, Typography } from '@mui/material'

type DialogProps = {
  yes: string;
  cancel?: string;
  header: string | React.ReactElement;
  body: string | React.ReactElement;
  open: boolean;
  onClose: () => void;
  onYes: () => void;
  onCancel?: () => void;
}
export const Dialog: React.FC<DialogProps> = (props) => {

  const { yes, cancel, header, body, open, onClose, onYes, onCancel } = props

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='dialog-header'
      aria-describedby='dialog-body'
    >
      <Box className='dialog'>
        <section className='header'>
          {typeof header === 'string' ? (
            <Typography id='dialog-header' variant='h6' component='h2'>
              {header}
            </Typography>
          ) : header}
        </section>

        <section className='body'>
          {typeof body === 'string' ? (
            <Typography id='dialog-body'>
              {body}
            </Typography>
          ) : body}
        </section>

        <section className='actions'>
          {cancel && onCancel && (
            <Button type='button' color='inherit' onClick={onCancel} variant="outlined">
              {cancel}
            </Button>
          )}
          <Button type='submit' onClick={onYes} variant='contained' color='error'>{yes}</Button>
        </section>
      </Box>
    </Modal>
  )
}
