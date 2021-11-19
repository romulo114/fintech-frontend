import React, { useCallback, useState } from 'react'
import {
  Box, Button, LinearProgress, FormControlLabel,
  Checkbox, Typography, TableHead, TableRow,
  Table, TableBody, TableCell, TableContainer, TextField,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import {
  Message, MessageType, PageTitle, CircleIconButton
} from 'components/base'
import { ValidatedInput } from 'components/form'
import { useAuthenticate } from 'hooks'
import { requireValidators } from 'utils/validators'
import { ValidatedText } from 'types/validate'
import { ModelInfo } from 'types/model'

type MPosition = {
  symbol: string;
  weight: number;
}
type StrategyFormProps = {
  model?: ModelInfo;
}
export const StrategyForm: React.FC<StrategyFormProps> = (props) => {

  const { model } = props
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  const [name, setName] = useState<ValidatedText>({ value: '', error: '' })
  const [keywords, setKeywords] = useState('')
  const [desc, setDesc] = useState('')
  const [shared, setShared] = useState(false)

  const [positions, setPositions] = useState<MPosition[]>([])
  const [symbol, setSymbol] = useState<ValidatedText>({ value: '', error: '' })
  const [weight, setWeight] = useState<ValidatedText>({ value: '0.0', error: '' })
  const [editing, setEditing] = useState(-1)

  const { tokens } = useAuthenticate()

  const changeShared = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShared(e.target.checked)
  }, [])

  const changeKeywords = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value)
  }, [])

  const changeDesc = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value)
  }, [])

  const addNewPosition = (): void => {
    setSymbol({ value: '', error: '' })
    setWeight({ value: '0.0', error: '' })
    setEditing(positions.length)
  }

  const editPosition = (idx: number): void => {
    setEditing(idx)
    setSymbol({ value: positions[idx].symbol, error: '' })
    setWeight({ value: `${positions[idx].weight}`, error: '' })
  }

  const deletePosition = (idx: number): void => {
    positions.splice(idx, 1)
    setPositions([...positions])
  }

  const cancelChange = (): void => {
    setEditing(-1)
  }

  const saveChange = (): void => {
    if (editing === positions.length) {
      positions.push({ symbol: symbol.value, weight: +weight.value })
    } else {
      positions[editing].symbol = symbol.value
      positions[editing].weight = +weight.value
    }
    setPositions([...positions])
    setEditing(-1)
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    try {
      setBusy(true)
      setError({})

    } catch (e: any) {

    } finally {
      setBusy(false)
    }
  }

  const editingPosition = (
    <>
      <TableCell sx={{ verticalAlign: 'top' }}>
        <ValidatedInput
          fullWidth
          id='model-symbol'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={symbol}
          setValue={setSymbol}
        />
      </TableCell>
      <TableCell sx={{ verticalAlign: 'top' }}>
        <ValidatedInput
          fullWidth
          type='number'
          id='model-weight'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={weight}
          setValue={setWeight}
        />
      </TableCell>
    </>
  )

  const normalActions = (idx: number): JSX.Element => (
    <div className='absolute hover-child' style={{ right: 24, top: 8 }}>
      <CircleIconButton onClick={() => editPosition(idx)}>
        <EditIcon />
      </CircleIconButton>
      <CircleIconButton onClick={() => deletePosition(idx)}>
        <DeleteIcon />
      </CircleIconButton>
    </div>
  )

  const editingActions = (
    <div className='absolute hover-child' style={{ right: 24, top: 8 }}>
      <CircleIconButton onClick={cancelChange}>
        <CloseIcon />
      </CircleIconButton>
      <CircleIconButton
        onClick={saveChange}
        disabled={!weight.value || !!weight.error || !symbol.value || !!symbol.error}
      >
        <CheckIcon />
      </CircleIconButton>
    </div>
  )

  const disabled = !name.value || !!name.error

  return (
    <form className='strategy-form'>
      <PageTitle>
        Create a Strategy
      </PageTitle>

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
        <div className='d-flex'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Positions
          </Typography>
          <Box className='d-flex align-items-center' sx={{ ml: 2 }}>
            <CircleIconButton onClick={addNewPosition}>
              <AddIcon />
            </CircleIconButton>
          </Box>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell key='symbol' style={{ minWidth: 120 }}>Symbol</TableCell>
                <TableCell key='weight' style={{ minWidth: 120 }}>Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positions.map((pos, idx) => idx === editing ? (
                <TableRow key={idx} className='relative'>
                  {editingPosition}
                  {editingActions}
                </TableRow>
              ) : (
                <TableRow key={pos.symbol} className='relative hover-wrapper'>
                  <TableCell>{pos.symbol}</TableCell>
                  <TableCell>{pos.weight}</TableCell>
                  {normalActions(idx)}
                </TableRow>
              ))}
              {editing === positions.length && (
                <TableRow className='relative hover-wrapper'>
                  {editingPosition}
                  {editingActions}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section className='actions'>
        <Button type='submit' variant='contained' onClick={onSubmit} disabled={disabled}>
          Create
        </Button>
      </section>
    </form >
  )
}
