import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { CircleIconButton } from 'components/base';
import { Message } from 'components/base';
import { useBusiness } from 'hooks/use-business';
import { BusinessPrice } from 'types/business';
import { BusinessPriceDialog } from './business-price-dialog';
import { BusinessPricesTable } from './business-price-table';

export const BusinessPrices = () => {
	const business = useBusiness();
	const { prices, createPrice, updatePrice, deletePrice } = business;

	const [showPriceDialog, setShowPriceDialog] = useState(false);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState('');
	const [price, setPrice] = useState<number | null>(null);

	const openPriceDialog = () => setShowPriceDialog(true);
	const closePriceDialog = () => setShowPriceDialog(false);
	const openConfirmDialog = () => setShowConfirmDialog(true);
	const closeConfirmDialog = () => setShowConfirmDialog(false);

	const onNewPrice = () => {
		setPrice(null);
		openPriceDialog();
	}

	const onEditPrice = (id: number) => {
		setPrice(id);
		openPriceDialog();
	}

	const onDeletePrice = (id: number) => {
		setPrice(id);
		openConfirmDialog();
	}

	const handleDelete = async () => {
		if (!price) return;

		setBusy(true);
		try {
			await deletePrice(price);
			closeConfirmDialog();
		} catch (e: any) {
			setError(e.message ?? JSON.stringify(e));
		} finally {
			setBusy(false);
		}
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			{!!error && <Message type='error'>{error}</Message>}
			<Box component='section' id='prices'>
				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
					<Typography variant='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
						Prices
					</Typography>
					<CircleIconButton onClick={onNewPrice}>
						<AddIcon />
					</CircleIconButton>
				</Box>

				<BusinessPricesTable
					prices={prices}
					onDelete={deletePrice}
					onEdit={onEditPrice}
				/>

				<BusinessPriceDialog
					open={showPriceDialog}
					price={prices.find(item => item.id === price)}
					onClose={closePriceDialog}
					onAdd={createPrice}
					onUpdate={updatePrice}
				/>
			</Box>
		</Box>
	)
};
