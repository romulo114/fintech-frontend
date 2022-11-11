import React, { useState } from 'react'
import {
  Box, Typography, TableHead, TableRow,
  Table, TableBody, TableCell, TableContainer
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { CircleIconButton } from 'components/base'
import { ValidatedInput } from 'components/form'
import { requireValidators } from 'utils/validators'
import { ModelPositionPayload } from 'types/model'
import { ValidatedText } from 'types/validate'

type EditablePositionProps = {
  positions: ModelPositionPayload[];
  onChange: (data: ModelPositionPayload[]) => void;
}
export const EditablePosition: React.FC<EditablePositionProps> = (props) => {

  const { positions, onChange } = props
  const [symbol, setSymbol] = useState<ValidatedText>({ value: '', error: '' });
  const [weight, setWeight] = useState<ValidatedText>({ value: '0.0', error: '' });
  const [price, setPrice] = useState<ValidatedText>({ value: '', error: '' });
  const [editing, setEditing] = useState(-1)

  const addNewPosition = (): void => {
    setSymbol({ value: '', error: '' });
    setWeight({ value: '0.0', error: '' });
    setPrice({ value: '', error: '' });
    setEditing(positions.length)
  }

  const editPosition = (idx: number): void => {
    setEditing(idx);
    setSymbol({ value: positions[idx].symbol, error: '' });
    setWeight({ value: `${positions[idx].weight}`, error: '' });
    setPrice({ value: '', error: '' });
  }

  const deletePosition = (idx: number): void => {
    positions.splice(idx, 1)
    onChange([...positions])
  }

  const cancelChange = (): void => {
    setEditing(-1)
  }

  const saveChange = (): void => {
    if (editing === positions.length) {
      positions.push({
        symbol: symbol.value,
        weight: +weight.value,
        price: price.value ?? ''
      });
    } else {
      positions[editing].symbol = symbol.value;
      positions[editing].weight = +weight.value;
      positions[editing].price = price.value;
    }

    onChange([...positions]);
    setEditing(-1);
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
      <TableCell sx={{ verticalAlign: 'top' }}>
        <ValidatedInput
          fullWidth
          type='number'
          id='model-price'
          variant='standard'
          className='input'
          validators={[]}
          value={price}
          setValue={setPrice}
        />
      </TableCell>
    </>
  )

  const normalActions = (idx: number): JSX.Element => (
    <td className='absolute hover-child' style={{ right: 24, top: 8 }}>
      <CircleIconButton onClick={() => editPosition(idx)}>
        <EditIcon />
      </CircleIconButton>
      <CircleIconButton onClick={() => deletePosition(idx)}>
        <DeleteIcon />
      </CircleIconButton>
    </td>
  )

  const editingActions = (
    <td className='absolute hover-child' style={{ right: 24, top: 8 }}>
      <CircleIconButton onClick={cancelChange}>
        <CloseIcon />
      </CircleIconButton>
      <CircleIconButton
        onClick={saveChange}
        disabled={!weight.value || !!weight.error || !symbol.value || !!symbol.error}
      >
        <CheckIcon />
      </CircleIconButton>
    </td>
  )


  return (
    <>
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
              <TableCell key='price' style={{ minWidth: 120 }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((pos, idx) => idx === editing ? (
              <TableRow key={idx} className='relative'>
                {editingPosition}
                {editingActions}
              </TableRow>
            ) : (
              <TableRow key={idx} className='relative hover-wrapper'>
                <TableCell>{pos.symbol}</TableCell>
                <TableCell>{pos.weight}</TableCell>
                <TableCell>{pos.price}</TableCell>
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
    </>
  )
}
