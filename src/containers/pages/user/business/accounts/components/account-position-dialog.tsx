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
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ActionButton } from 'components/base/action-button';
import { AccountPosition } from 'types';
import { useNotification } from 'hooks/use-notification';

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
  price: Yup.number().nullable()
});
type AccountPositionDialogProps = {
  open: boolean;
  position?: AccountPosition;
  onClose: () => void;
  onAdd: (symbol: string, shares: number, price: number | null, isCash: boolean) => Promise<void>;
  onUpdate: (
    id: number, symbol: string, shares: number, price: number | null, isCash: boolean
  ) => Promise<void>;
}
export const AccountPositionDialog = (
  { open, position, onClose, onAdd, onUpdate }: AccountPositionDialogProps
) => {
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
      price: null
    },
    validationSchema,
    onSubmit: async (values: FormState) => {
      setBusy(true);

      try {
        if (!position?.id) {
          await onAdd(values.symbol, values.shares, values.price, values.isCash);
        } else {
          onUpdate(
            position.id, values.symbol, values.shares, values.price, values.isCash
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
          isCash: position.isCash,
          price: position.price.price
        });
      } else {
        setValues({
          symbol: '',
          shares: 0,
          isCash: false,
          price: null
        });
      }
    }
  }, [open, position, setValues]);

  return (
    <Dialog open={open} maxWidth='sm' fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h3' sx={{ fontSize: 20, fontWeight: 600, my: 2 }}>
            {position ? 'Edit Position' : 'New Position'}
          </Typography>
          <FormControl fullWidth>
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
              sx={{ my: 1 }}
            />
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
          <TextField
						name='price'
						id='price'
						type='number'
						fullWidth
						label='Price(Optional)'
						value={values.price}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.price && Boolean(errors.price)}
						helperText={touched.price && errors.price}
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