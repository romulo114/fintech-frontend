import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button, LinearProgress, FormControlLabel,
  Checkbox, TextField
} from '@mui/material'
import { Message, MessageType, PageTitle, Dialog } from 'components/base'
import { ValidatedInput } from 'components/form'
import { EditablePosition } from './editable-position'
import { useAuthenticate } from 'hooks'
import { requireValidators } from 'utils/validators'
import { ValidatedText } from 'types/validate'
import { ModelInfo, ModelPositionData } from 'types/model'
import { ModelApis } from 'service/models'

type StrategyFormProps = {
  model?: ModelInfo;
}
export const StrategyForm: React.FC<StrategyFormProps> = (props) => {

  const { model } = props
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  const [name, setName] = useState<ValidatedText>({ value: model?.name ?? '', error: '' })
  const [keywords, setKeywords] = useState(model?.keywords?.join(',') ?? '')
  const [desc, setDesc] = useState(model?.description ?? '')
  const [shared, setShared] = useState(model?.public ?? false)

  const [positions, setPositions] = useState<ModelPositionData[]>(model?.positions ?? [])

  const [open, setOpen] = useState(false)


  const history = useHistory()
  const { user, tokens } = useAuthenticate()

  const changeShared = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShared(e.target.checked)
  }, [])

  const changeKeywords = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value)
  }, [])

  const changeDesc = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value)
  }, [])

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()

    try {
      setBusy(true)
      setError({})

      const payload = {
        name: name.value,
        keywords: keywords.split(','),
        description: desc,
        public: shared
      }

      if (model) {
        const result = await ModelApis.update(tokens?.accessToken ?? '', model.id, payload)
        await ModelApis.updatePositions(tokens?.accessToken ?? '', result.id, { positions })
        setError({ type: 'success', message: 'Strategy updated' })
      } else {
        const result = await ModelApis.create(tokens?.accessToken ?? '', payload)
        await ModelApis.updatePositions(tokens?.accessToken ?? '', result.id, { positions })
        setError({ type: 'success', message: 'Strategy created' })
        setTimeout(() => {
          history.push('/user/business/strategies')
        }, 1500)
      }
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onDelete: () => Promise<void> = useCallback(async () => {
    if (!model) return

    try {
      setOpen(false)
      setError({})
      setBusy(true)

      const accessToken = tokens?.accessToken ?? ''
      await ModelApis.delete(accessToken, model.id)
      setError({ type: 'success', message: 'Strategy deleted' })
      setTimeout(() => {
        history.push('/user/business/strategies')
      }, 1500)
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }, [tokens?.accessToken, model, history])

  const disabled = !name.value || !!name.error

  return (
    <form className='strategy-form'>
      <PageTitle>
        Create a Strategy
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
      {error.type && <Message type={error.type}>{error.message}</Message>}

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

      <section className='actions'>
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
