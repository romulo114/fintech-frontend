import { Snackbar, Alert } from '@mui/material'
import { useNotification } from 'hooks/use-notification';

export const AppNotification = () => {
	const { open, duration, type, message, onClose } = useNotification();

	return (
		<Snackbar
			autoHideDuration={duration}
			open={open}
			onClose={onClose}
			anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
		>
			<Alert severity={type} onClose={onClose} variant='filled'>
				{message}
			</Alert>
		</Snackbar>
	);
};
