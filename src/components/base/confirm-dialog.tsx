import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  CircularProgress,
  DialogProps
} from '@mui/material';
import { useTheme } from '@mui/material';
import { useNotification } from 'hooks/use-notification';

type ConfirmDialogProps = {
    sx?: DialogProps['sx'];
    title?: string;
    target?: string;
    subtitle?: string;
    description?: string | React.ReactNode;
    open: boolean;
    onClose: () => void;
    cancel?: string;
    yes?: string;
    onYes: () => (void | Promise<void>);
}
export const ConfirmDialog = ({
  sx = {},
  title,
  target,
  subtitle,
  description,
  open,
  onClose,
  cancel = 'Cancel',
  yes = 'Yes',
  onYes
}: ConfirmDialogProps) => {
  const theme = useTheme();
  const { sendNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setBusy(true);
      setError('');
      await onYes();
      onClose();
    } catch (e: any) {
      sendNotification(e.message ?? JSON.stringify(e), 'error', 3000);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog
      {...{ open, onClose }}
      sx={{
        '& .MuiDialog-paper': { py: 2 },
        ...sx
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {title}
        {target && (
          <Typography sx={{
            mx: 1,
            color: theme.palette.grey['700'],
            fontWeight: 600,
            fontSize: 16,
            maxWidth: 200
          }}>
            {target}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        {subtitle && (
          <Typography sx={{ color: theme.palette.grey['900'], fontWeight: 600, fontSize: 16 }}>
            {subtitle}
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          {description}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, alignItems: 'center', gap: 2 }}>
        {error && <Typography sx={{ flexGrow: 1 }} color='error'>{error}</Typography>}
        <Button
          onClick={onClose}
          sx={{ width: 120, lineHeight: '24px' }}
          autoFocus
          variant='text'
        >
          {cancel}
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ width: 120, display: 'flex', alignItems: 'center', gap: 1, lineHeight: '24px' }}
          variant='contained'
        >
          {yes}
          {busy && <CircularProgress color='warning' size={16} />}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
