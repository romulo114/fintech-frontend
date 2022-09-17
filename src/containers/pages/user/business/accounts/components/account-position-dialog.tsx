import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ActionButton } from 'components/base/action-button';
import { AccountPosition } from 'types';
import { useBusiness } from 'hooks/use-business';
import { BusinessPrice } from 'types/business';
import { useNotification } from 'hooks/use-notification';

type FormState = {
  symbol: string;
  shares: number;
  isCash: boolean;
}
const validationSchema = Yup.object().shape({
  symbol: Yup.string().required('Symbol is required'),
  shares: Yup.number().min(0, 'Share must be positive').required('Share is required'),
  isCash: Yup.boolean()
});
type AccountPositionDialogProps = {
  open: boolean;
  positions: AccountPosition[];
  position?: AccountPosition;
  onClose: () => void;
  onAdd: (symbol: string, shares: number, isCash: boolean) => Promise<void>;
  onUpdate: (id: number, symbol: string, shares: number, isCash: boolean) => Promise<void>;
}
export const AccountPositionDialog = (
  { open, position, positions, onClose, onAdd, onUpdate }: AccountPositionDialogProps
) => {
  const { prices } = useBusiness();
  const { sendNotification } = useNotification();

  const [busy, setBusy] = useState(false);
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
    },
    validationSchema,
    onSubmit: async (values: FormState) => {
      setBusy(true);

      try {
        if (!position?.id) {
          await onAdd(values.symbol, values.shares, values.isCash);
        } else {
          onUpdate(
            position.id, values.symbol, values.shares, values.isCash
          );
        }
        onClose();
      } catch (e: any) {
        sendNotification?.(e.message ?? JSON.stringify(e), 'error', 3000);
      } finally {
        setBusy(false);
      }
    }
  });

  useEffect(() => {
    if (open) {
      if (position) {
        setValues({
          symbol: position.symbol,
          shares: position.shares,
          isCash: position.isCash
        });
      } else {
        setValues({
          symbol: '',
          shares: 0,
          isCash: false
        });
      }
    }
  }, [open, position, setValues]);

  const availablePrices = prices.filter(price => {
    return positions.every(pos => pos.symbol !== price.symbol) || price.symbol === position?.symbol;
  })
  return (
    <Dialog open={open} maxWidth='md'>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h3' sx={{ fontSize: 20, fontWeight: 600, my: 2 }}>
            {position ? 'Edit Position' : 'New Position'}
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="symbol-select">Symbol</InputLabel>
            <Select
              labelId="symbol-select"
              id="symbol"
              name='symbol'
              value={values.symbol}
              label="Symbol"
              onChange={handleChange}
              error={touched.symbol && Boolean(errors.symbol)}
              onBlur={handleBlur}
              sx={{ width: 400 }}
            >
              {availablePrices.map((price: BusinessPrice) => (
                <MenuItem key={price.id} value={price.symbol}>
                  {price.symbol}
                </MenuItem>
              ))}
            </Select>
            {availablePrices.length === 0 && (
              <Typography
                variant='body2'
                sx={{
                  color: theme => theme.palette.warning.main,
                  fontWeight: 300,
                  fontSize: 14,
                  my: 1
                }}
              >
                There are no available prices. Please add prices first
              </Typography>
            )}
          </FormControl>
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