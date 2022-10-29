import { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { CircleIconButton, Dialog } from 'components/base';
import { AccountPositionsTable } from './account-position-table';
import { AccountPositionDialog } from './account-position-dialog';
import { AccountInfo, AccountPositionPayload } from 'types';
import { Message } from 'components/base';

type AccountPositionsProps = {
  account: AccountInfo;
  onUpdatePositions: (positions: AccountPositionPayload[]) => Promise<void>;
}
export const AccountPositions = (
  { account, onUpdatePositions }: AccountPositionsProps
) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const positions = account.positions;

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);
  const openConfirmDialog = () => setShowConfirmDialog(true);
  const closeConfirmDialog = () => setShowConfirmDialog(false);

  const onEditPosition = (id: number) => {
    setPosition(id);
    openDialog();
  }

  const deletePosition = async () => {
    setBusy(true);

    try {
      await onUpdatePositions(positions.filter(
        pos => pos.id !== position
      ).map(pos => ({
        ...pos,
        price: pos.price.price
      })));
      closeConfirmDialog();
    } catch (e: any) {
      setError(e.message ?? JSON.stringify(e));
    } finally {
      setBusy(false);
    }
  }

  const onDeletePosition = async (id: number) => {
    setPosition(id);
    openConfirmDialog();
  }

  const onNewPosition = () => {
    setPosition(null);
    openDialog();
  }

  const onAddPosition = async (
    symbol: string, shares: number, price: number | null, isCash: boolean
  ) => {
    setBusy(true);

    const payload: AccountPositionPayload[] = positions.map(pos => ({
      ...pos, price: pos.price.price
    }));
    try {
      await onUpdatePositions([
        ...payload,
        { symbol, shares, isCash, price }
      ]);
    } catch (e: any) {
      setError(e.message ?? JSON.stringify(e));
    } finally {
      setBusy(false);
    }
  }

  const onUpdatePosition = async (
    id: number, symbol: string, shares: number, price: number | null, isCash: boolean
  ) => {
    const payload: AccountPositionPayload[] = positions.map(pos => pos.id === id ? ({
      ...pos, symbol, shares, price, isCash
    }) : ({
      ...pos, price: pos.price.price
    }));
    
    setBusy(true);
    try {
      await onUpdatePositions(payload);
    } catch (e: any) {
      setError(e.message ?? JSON.stringify(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
      {!!error && <Message type='error'>{error}</Message>}
      {busy && (
        <CircularProgress sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        />
      )}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
          Positions
        </Typography>
        <CircleIconButton onClick={onNewPosition}>
          <AddIcon />
        </CircleIconButton>
      </Box>

      <AccountPositionsTable
        positions={positions}
        onDelete={onDeletePosition}
        onEdit={onEditPosition}
      />

      <AccountPositionDialog
        open={showDialog}
        position={positions.find(pos => pos.id === position)}
        onClose={closeDialog}
        onAdd={onAddPosition}
        onUpdate={onUpdatePosition}
      />

      <Dialog
        open={showConfirmDialog}
        onClose={closeConfirmDialog}
        header='Confirm Delete position'
        body={`Are you sure to delete the position ${
          positions.find(pos => pos.id === position)?.symbol ?? ''
        }?`}
        yes='Delete'
        cancel='Cancel'
        onYes={deletePosition}
        onCancel={closeConfirmDialog}
      />
    </Box>
  )
};
