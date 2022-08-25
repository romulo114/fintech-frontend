import { useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	Typography,
	FormControlLabel,
	Checkbox
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Message, MessageType } from 'components/base';
import { ActionButton } from 'components/base/action-button';
import { AccountPosition } from 'types';

type FormState = {
	symbol: string;
	shares: number;
	isCash: boolean;
	price: number | null
}
const validationSchema = Yup.object().shape({
	symbol: Yup.string().required('Symbol is required'),
	shares: Yup.number().min(0, 'Share must be positive').required('Share is required'),
	isCash: Yup.boolean(),
	price: Yup.number().nullable().min(0, 'Price can not be negative')
});
type AccountPositionDialogProps = {
	open: boolean;
	position?: AccountPosition;
	onClose: () => void;
	onAdd: (symbol: string, shares: number, isCash: boolean, price: number | null) => Promise<void>;
	onUpdate: (
		id: number, symbol: string, shares: number, isCash: boolean, price: number | null
	) => void;
}
export const AccountPositionDialog = (
	{ open, position, onClose, onAdd, onUpdate }: AccountPositionDialogProps
) => {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<{ type?: MessageType, message?: string }>({});
	const {
		handleChange,
		handleSubmit,
		handleBlur,
		setValues,
		touched,
		values,
		errors
	} = useFormik<FormState>({
		initialValues: {
			symbol: '',
			shares: 0,
			isCash: false,
			price: null
		},
		validationSchema,
		onSubmit: async (values: FormState) => {
			setBusy(true);

			try {
				if (!position) {
					await onAdd(values.symbol, values.shares, values.isCash, values.price);
				} else {
					onUpdate(
						position.id, values.symbol, values.shares, values.isCash, values.price
					);
				}
				onClose();
			} catch (e: any) {
				setError({ type: 'error', message: e.message ?? JSON.stringify(e) });
			} finally {
				setBusy(false);
			}
		}
	});

	useEffect(() => {
		if (open && position) {
			setValues({
				symbol: position.symbol,
				price: position.price?.id ?? null,
				shares: position.shares,
				isCash: position.isCash
			});
		}
	}, [open, position, setValues]);

	return (
		<Dialog open={open} maxWidth='sm'>
			{error.type && <Message type={error.type}>{error.message}</Message>}
			<form onSubmit={handleSubmit}>
				<DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant='h3' sx={{ fontSize: 20, fontWeight: 600, my: 2 }}>
						New Position
					</Typography>
					<TextField
						name='symbol'
						id='symbol'
						fullWidth
						label='Symbol'
						value={values.symbol}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.symbol && Boolean(errors.symbol)}
						helperText={touched.symbol && errors.symbol}
						sx={{ my: 1, width: 400, maxWidth: '100%' }}
					/>
					<TextField
						name='shares'
						id='shares'
						type='number'
						fullWidth
						label='Shares'
						value={values.shares}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.shares && Boolean(errors.shares)}
						helperText={touched.shares && errors.shares}
						sx={{ my: 1 }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								name='isCash'
								id='isCash'
								checked={values.isCash}
								onChange={handleChange}
							/>
						}
						label="Cash"
					/>
					{/* <TextField
						name='price'
						id='price'
						type='number'
						fullWidth
						label='Price'
						value={values.price}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.price && Boolean(errors.price)}
						helperText={touched.price && errors.price}
						sx={{ my: 1 }}
					/> */}
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 3 }}>
					<Button onClick={onClose} variant='outlined'>
						<Typography sx={{ fontSize: 16, lineHeight: 1.75, px: 2 }}>
							Cancel
						</Typography>
					</Button>
					<ActionButton type='submit' loading={busy} variant='contained'>
						<Typography sx={{ fontSize: 16, lineHeight: 1.75, px: 2 }}>
							{position ? 'Update' : 'Add'}
						</Typography>
					</ActionButton>
				</DialogActions>
			</form>
		</Dialog>
	)
}