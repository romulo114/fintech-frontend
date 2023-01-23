import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, LinearProgress, FormControlLabel,
  Checkbox, TextField, CircularProgress
} from '@mui/material';
import { PageTitle, Dialog } from 'components/base';
import { EditablePosition } from './editable-position';
import { ModelPositionPayload } from 'types/model';
import { ModelApis } from 'service/models';
import { delayedCall, delayedFunc } from 'utils/delay';
import { useNotification } from 'hooks/use-notification';
import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';

type StrategyFormData = {
  name: string;
  keywords: string;
  desc: string;
  shared: boolean;
  positions: ModelPositionPayload[];
}
type StrategyFormProps = {
  onChanged?: (flag: boolean) => void;
}
export const StrategyForm: React.FC<StrategyFormProps> = ({ onChanged }) => {

  const { sendNotification } = useNotification();
  const { strategyId } = useParams<{ strategyId: string }>();

  const [open, setOpen] = useState(false);
  const [positionChanged, setPositionChanged] = useState(false);
  const navigate = useNavigate();

  const { isLoading, refetch, data: model } = useQuery('models', {
    queryFn: delayedFunc(async () => {
      if (!strategyId) return;
      return ModelApis.get(+strategyId);
    }),
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  });

  const { isLoading: updating, mutate: updateModel } = useMutation({
    mutationFn: async (values: StrategyFormData) => {
      const payload = {
        name: values.name,
        keywords: values.keywords.split(','),
        description: values.desc,
        public: values.shared
      };

      const { positions } = values;
      if (model) {
        for (const pos of positions) {
          pos.model_id = model.id;
        }
        await ModelApis.update(model.id, payload);
        await ModelApis.updatePositions(model.id, { positions });
        await refetch();
        sendNotification('Strategy updated.', 'success', 3000);
      } else {
        const result = await ModelApis.create(payload);
        await ModelApis.updatePositions(result.id, { positions });
        sendNotification('Strategy created.', 'success', 3000);
        setTimeout(() => {
          navigate('/user/business/strategies');
        }, 1500)
      }
    },
    onSuccess: () => {
      sendNotification('Strategy updated.', 'success', 3000);
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  });

  const formik = useFormik<StrategyFormData>({
    initialValues: {
      name: '',
      keywords: '',
      desc: '',
      shared: false,
      positions: []
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required')
    }),
    onSubmit: async values => {
      const symbols = values.positions.map(pos => pos.symbol);
      if (new Set(symbols).size !== symbols.length) {
        sendNotification('Symbol can not be duplicated.', 'error', 3000);
        return;
      }

      await updateModel(values);
    }
  })

  useEffect(() => {
    onChanged && onChanged(formik.dirty || positionChanged);
  }, [formik.dirty, onChanged, positionChanged])

  useEffect(() => {
    formik.resetForm({
      values: {
        name: model?.name ?? '',
        keywords: model?.keywords?.join(',') ?? '',
        desc: model?.description ?? '',
        shared: model?.public ?? false,
        positions: model?.positions ?? []
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model])

  const changeShared = (e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue(
    'shared', e.target.checked
  );

  const { isLoading: deleting, mutate: deleteModel } = useMutation({
    mutationFn: async () => {
      if (!model) return;

      await delayedCall(ModelApis.delete(model.id));
    },
    onSuccess: () => {
      sendNotification('Strategy deleted', 'success', 3000);
      setTimeout(() => {
        navigate('/user/business/strategies');
      }, 1500);
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  })

  const handleDelete = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete: () => Promise<void> = async () => {
    setOpen(false);
    await deleteModel();
  }

  return (
    <form className='strategy-form' onSubmit={formik.handleSubmit}>
      <PageTitle>
        {model ? 'Update' : 'Create'} a Strategy
      </PageTitle>

      <Dialog
        open={open}
        onClose={handleClose}
        header='Confirm Delete strategy'
        body='Are you sure to delete the strategy?'
        yes='Delete'
        cancel='Cancel'
        onYes={onDelete}
        onCancel={handleClose}
      />

      {(isLoading || deleting) && <LinearProgress />}

      <section className='input-group'>
        <TextField
          name='name'
          id='name'
          label='Name'
          fullWidth
          variant='standard'
          className='input'
          value={formik.values.name}
          onChange={formik.handleChange}
          helperText={formik.errors.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        <TextField
          name='keywords'
          id='keywords'
          fullWidth
          label='Keywords'
          variant='standard'
          className='input'
          value={formik.values.keywords}
          onChange={formik.handleChange}
        />
        <TextField
          name='desc'
          id='desc'
          fullWidth
          multiline
          rows={5}
          label='Description'
          variant='standard'
          className='input'
          value={formik.values.desc}
          onChange={formik.handleChange}
        />
        <FormControlLabel
          control={<Checkbox checked={formik.values.shared} onChange={changeShared} />}
          label="Public"
          className='input'
        />
      </section>

      <section className='input-group'>
        <EditablePosition
          positions={formik.values.positions}
          onChange={(positions: ModelPositionPayload[]) => {
            setPositionChanged(true);
            formik.setFieldValue('positions', positions);
          }}
        />
      </section>

      <section className='actions justify-content-between row-reverse'>
        <Button type='submit' variant='contained'>
          {model ? 'Update' : 'Create'}
          {updating && <CircularProgress color='warning' sx={{ ml: 1 }} size={20} />}
        </Button>
        <Button color='error' variant='outlined' onClick={handleDelete} sx={{ mr: 2 }}>
          Delete
        </Button>
      </section>
    </form >
  )
}
