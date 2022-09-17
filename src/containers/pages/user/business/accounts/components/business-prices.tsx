import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { ActionButton, CircleIconButton } from 'components/base';
import { Message } from 'components/base';
import { useBusiness } from 'hooks/use-business';
import { BusinessPriceDialog } from './business-price-dialog';
import { BusinessPricesTable } from './business-price-table';
import { useDialog } from 'hooks/use-dialog';

type BusinessPriceProps = {
  onDelete: () => Promise<void>;
}
export const BusinessPrices = ({ onDelete }: BusinessPriceProps) => {
  const { prices, createPrice, updatePrice, deletePrice } = useBusiness();
  const { openDialog, onClose } = useDialog();

  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [price, setPrice] = useState<number | null>(null);

  const openPriceDialog = () => setShowPriceDialog(true);
  const closePriceDialog = () => setShowPriceDialog(false);

  const onNewPrice = () => {
    setPrice(null);
    openPriceDialog();
  }

  const onEditPrice = (id: number) => {
    setPrice(id);
    openPriceDialog();
  }

  const handleDelete = async (id: number) => {
    setBusy(true);
    try {
      await deletePrice(id);
      await onDelete();
      onClose();
    } catch (e: any) {
      setError(e.message ?? JSON.stringify(e));
    } finally {
      setBusy(false);
    }
  }

  const onDeletePrice = (id: number) => {
    openDialog('Delete Price', (
      <Box>
        <Typography sx={{ color: theme => theme.palette.grey['700'], mb: 2 }}>
          Are you sure to delete the price and related positions?
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant='outlined' onClick={onClose}>Cancel</Button>
          <ActionButton
            variant='contained'
            onClick={() => handleDelete(id)}
            color='error'
            loading={busy}
          >
            Delete
          </ActionButton>
        </Box>
      </Box>
    ));
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
          onDelete={onDeletePrice}
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
