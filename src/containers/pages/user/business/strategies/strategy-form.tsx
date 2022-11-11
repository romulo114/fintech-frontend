import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, LinearProgress, FormControlLabel,
  Checkbox, TextField, CircularProgress
} from '@mui/material';
import { PageTitle, Dialog } from 'components/base';
import { ValidatedInput } from 'components/form';
import { EditablePosition } from './editable-position';
import { requireValidators } from 'utils/validators';
import { ValidatedText } from 'types/validate';
import { ModelPositionPayload } from 'types/model';
import { ModelApis } from 'service/models';
import { delayedCall, delayedFunc } from 'utils/delay';
import { useNotification } from 'hooks/use-notification';
import { useMutation, useQuery } from 'react-query';

export const StrategyForm: React.FC = () => {

  const { sendNotification } = useNotification();

  const { strategyId } = useParams<{ strategyId: string }>();

  const { isLoading, refetch, data: model } = useQuery('models', {
    queryFn: delayedFunc(async () => {
      if (!strategyId) return;
      return ModelApis.get(+strategyId);
    }),
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  });

  const [name, setName] = useState<ValidatedText>({ value: '', error: '' });
  const [keywords, setKeywords] = useState('');
  const [desc, setDesc] = useState('');
  const [shared, setShared] = useState(false);
  const [positions, setPositions] = useState<ModelPositionPayload[]>([]);

  useEffect(() => {
    setName({ value: model?.name ?? '', error: '' });
    setKeywords(model?.keywords?.join(',') ?? '');
    setDesc(model?.description ?? '')
    setShared(model?.public ?? false);
    setPositions(model?.positions ?? []);
  }, [model])

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeShared = (e: React.ChangeEvent<HTMLInputElement>) => setShared(e.target.checked);
  const changeKeywords = (e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value);
  const changeDesc = (e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value);

  const { isLoading: updating, mutate: updateModel } = useMutation({
    mutationFn: async () => {
      const payload = {
        name: name.value,
        keywords: keywords.split(','),
        description: desc,
        public: shared
      };

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

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    const symbols = positions.map(pos => pos.symbol);
    if (new Set(symbols).size !== symbols.length) {
      sendNotification('Symbol can not be duplicated.', 'error', 3000);
      return;
    }

    await updateModel();
  }

  const handleDelete = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete: () => Promise<void> = async () => {
    setOpen(false);
    await deleteModel();
  }

  const disabled = !name.value || !!name.error

  return (
    <form className='strategy-form'>
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
        <ValidatedInput
          fullWidth
          id='strategy-name'
          label='Name'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={name}
          setValue={setName}
        />
        <TextField
          fullWidth
          id='strategy-keywords'
          label='Keywords'
          variant='standard'
          className='input'
          value={keywords}
          onChange={changeKeywords}
        />
        <TextField
          fullWidth
          multiline
          rows={5}
          id='strategy-desc'
          label='Description'
          variant='standard'
          className='input'
          value={desc}
          onChange={changeDesc}
        />
        <FormControlLabel
          control={<Checkbox checked={shared} onChange={changeShared} />}
          label="Public"
          className='input'
        />
      </section>

      <section className='input-group'>
        <EditablePosition
          positions={positions}
          onChange={setPositions}
        />
      </section>

      <section className='actions justify-content-between row-reverse'>
        <Button type='submit' variant='contained' onClick={onSubmit} disabled={disabled}>
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
