import { Modal, Typography, Box } from '@mui/material'
import { useDialog } from 'hooks/use-dialog';

export const AppDialog = () => {
	const { open, title, body, onClose } = useDialog();

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby='dialog-header'
			aria-describedby='dialog-body'
		>
			<Box className='dialog'>
				<section className='header'>
					{typeof title === 'string' ? (
						<Typography id='dialog-header' variant='h6' component='h2'>
							{title}
						</Typography>
					) : title}
				</section>

				<section className='body'>
					{typeof body === 'string' ? (
						<Typography id='dialog-body'>
							{body}
						</Typography>
					) : body}
				</section>
			</Box>
		</Modal>
	)
};
