import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, LinearProgress, FormControlLabel,
  Checkbox, TextField
} from '@mui/material';
import { PageTitle, Dialog } from 'components/base';
import { ValidatedInput } from 'components/form';
import { EditablePosition } from './editable-position';
import { useAuthenticate } from 'hooks';
import { requireValidators } from 'utils/validators';
import { ValidatedText } from 'types/validate';
import { ModelInfo, ModelPositionData } from 'types/model';
import { ModelApis } from 'service/models';
import { delayedCall } from 'utils/delay';
import { useNotification } from 'hooks/use-notification';

export const StrategyForm: React.FC = () => {

  const [busy, setBusy] = useState(false);
  const { sendNotification } = useNotification();

  const { strategyId } = useParams<{ strategyId: string }>();
  const [model, setModel] = useState<ModelInfo | null>(null);

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      if (!strategyId) return;

      try {
        setBusy(true)
        const data = await delayedCall(ModelApis.get(+strategyId));
        setModel(data);
      } catch (e: any) {
        sendNotification?.(e.message, 'error');
      } finally {
        setBusy(false);
      }
    }

    fetchFn();
  }, [sendNotification, strategyId])


  const [name, setName] = useState<ValidatedText>({ value: '', error: '' });
  const [keywords, setKeywords] = useState('');
  const [desc, setDesc] = useState('');
  const [shared, setShared] = useState(false);
  const [positions, setPositions] = useState<ModelPositionData[]>([]);

  useEffect(() => {
    setName({ value: model?.name ?? '', error: '' });
    setKeywords(model?.keywords?.join(',') ?? '');
    setDesc(model?.description ?? '')
    setShared(model?.public ?? false);
    setPositions(model?.positions ?? []);
  }, [model])

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthenticate();

  const changeShared = (e: React.ChangeEvent<HTMLInputElement>) => setShared(e.target.checked);
  const changeKeywords = (e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value);
  const changeDesc = (e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    try {
      setBusy(true);

      const symbols = positions.map(pos => pos.symbol);
      if (new Set(symbols).size !== symbols.length) {
        sendNotification?.('Symbol can not be duplicated.', 'error');
        return;
      }

      const payload = {
        name: name.value,
        keywords: keywords.split(','),
        description: desc,
        public: shared
      }

      if (model) {
        for (const pos of positions) {
          pos.model_id = model.id;
        }
        await ModelApis.update(model.id, payload);
        const updated = await ModelApis.updatePositions(model.id, { positions });
        setModel(updated);
        sendNotification?.('Strategy updated.', 'success');
      } else {
        const result = await ModelApis.create(payload);
        await ModelApis.updatePositions(result.id, { positions });
        sendNotification?.('Strategy created.', 'success');
        setTimeout(() => {
          navigate('/user/business/strategies');
        }, 1500)
      }
    } catch (e: any) {
      sendNotification?.(e.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  const handleDelete = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete: () => Promise<void> = useCallback(async () => {
    if (!model) return;

    try {
      setOpen(false);
      setBusy(true);

      await delayedCall(ModelApis.delete(model.id));
      sendNotification?.('Strategy deleted', 'success');
      setTimeout(() => {
        navigate('/user/business/strategies');
      }, 1500)
    } catch (e: any) {
      sendNotification?.(e.message, 'error');
    } finally {
      setBusy(false)
    }
  }, [model, navigate, sendNotification])

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

      {busy && <LinearProgress />}

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
        </Button>
        {!!model && model.userId === user?.id && (
          <Button color='error' variant='outlined' onClick={handleDelete} sx={{ mr: 2 }}>
            Delete
          </Button>
        )}
      </section>
    </form >
  )
}
