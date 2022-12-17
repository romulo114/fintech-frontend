import { useState, useEffect } from 'react';
import {
  Typography, TextField, Box,
  Button, FormControlLabel, Checkbox,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { CircleIconButton, ConfirmDialog } from 'components/base';
import { TradeBaseInfo, TradeInfo } from 'types';

type TradeEditProps = {
  trade: TradeInfo;
  onUpdateTrade: (values: TradeBaseInfo) => void;
  onDeleteTrade: () => void;
}
export const TradeEdit = ({ trade, onUpdateTrade, onDeleteTrade }: TradeEditProps) => {
  const [editTrade, setEditTrade] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik<TradeBaseInfo>({
    initialValues: {
      name: '',
      status: false,
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      status: yup.bool()
    }),
    onSubmit: (values) => {
      onUpdateTrade(values);
    }
  })

  const toggleEditTrade: () => void = () => {
    setEditTrade(edit => !edit);
    formik.setFieldValue('name', trade.name);
    formik.setFieldValue('status', trade.status);
  }

  useEffect(() => {
    formik.setValues({
      name: trade.name,
      status: trade.status
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trade]);


  return (
    <form onSubmit={formik.handleSubmit}>
      <section className='input-group hover-show-wrapper'>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Name & Status
          </Typography>

          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditTrade}>
              {editTrade ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editTrade && (
              <CircleIconButton type='submit'>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </Box>

        <TextField
          name='name'
          id='name'
          label='Name'
          variant='outlined'
          fullWidth
          disabled={!editTrade}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ my: 1 }}
        />

        <FormControlLabel
          control={(
            <Checkbox
              checked={formik.values.status}
              onChange={(_, checked) => formik.setFieldValue('status', checked)}
            />
          )}
          label="Status"
          className='input'
          disabled={!editTrade}
        />
      </section>

      <section className='actions justify-content-start'>
        <Button variant='outlined' color='error' onClick={() => setShowConfirm(true)}>
          Delete
        </Button>
      </section>

      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title='Delete Portfolio'
        target={trade.name}
        description={
          <>
            You are about to{' '}
            <Typography
              component="span"
              sx={{ color: (theme) => theme.palette.grey['900'], fontWeight: 500 }}
            >
              delete
            </Typography>{' '}
            this trade. This action cannot be undone.
          </>
        }
        onYes={onDeleteTrade}
      />
    </form>
  )
}