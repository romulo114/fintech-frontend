import { useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Message, MessageType } from 'components/base';
import { ActionButton } from 'components/base/action-button';
import { BusinessPrice } from 'types/business';

type FormState = {
	symbol: string;
	price: number;
}
const validationSchema = Yup.object().shape({
	symbol: Yup.string().required('Symbol is required'),
	price: Yup.number().min(0, 'Share must be positive').required('Share is required'),
});
type BusinessPriceDialogProps = {
	open: boolean;
	price?: BusinessPrice;
	onClose: () => void;
	onAdd: (symbol: string, shares: number) => Promise<void>;
	onUpdate: (id: number, symbol: string, price: number) => Promise<void>;
}
export const BusinessPriceDialog = (
	{ open, price, onClose, onAdd, onUpdate }: BusinessPriceDialogProps
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
			price: 0,
		},
		validationSchema,
		onSubmit: async (values: FormState) => {
			setBusy(true);

			try {
				if (!price) {
					await onAdd(values.symbol, values.price);
				} else {
					await onUpdate(price.id, values.symbol, values.price);
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
		if (open && price) {
			setValues({
				symbol: price.symbol,
                price: price.price
			});
		}
	}, [open, price, setValues]);

	return (
		<Dialog open={open} maxWidth='md'>
			{error.type && <Message type={error.type}>{error.message}</Message>}
			<form onSubmit={handleSubmit}>
				<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Typography variant='h3' sx={{ fontSize: 20, fontWeight: 600, my: 2 }}>
						{price ? 'Edit Price' : 'New Price'}
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
						name='price'
						id='price'
						type='number'
						fullWidth
						label='Shares'
						value={values.price}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.price && Boolean(errors.price)}
						helperText={touched.price && errors.price}
						sx={{ my: 1 }}
					/>
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 3 }}>
					<Button onClick={onClose} variant='outlined'>
						<Typography sx={{ fontSize: 16, lineHeight: 1.75, px: 2 }}>
							Cancel
						</Typography>
					</Button>
					<ActionButton type='submit' loading={busy} variant='contained'>
						<Typography sx={{ fontSize: 16, lineHeight: 1.75, px: 2 }}>
							{price ? 'Update' : 'Add'}
						</Typography>
					</ActionButton>
				</DialogActions>
			</form>
		</Dialog>
	)
};
