import { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { CircleIconButton, Dialog } from 'components/base';
import { AccountPositionsTable } from './account-position-table';
import { AccountPositionDialog } from './account-position-dialog';
import { AccountInfo, AccountPositionPayload } from 'types';
import { useNotification } from 'hooks/use-notification';
import { useMutation } from 'react-query';

type AccountPositionsProps = {
  account: AccountInfo;
  onUpdatePositions: (positions: AccountPositionPayload[]) => Promise<void>;
}
export const AccountPositions = (
  { account, onUpdatePositions }: AccountPositionsProps
) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const positions = account.positions;

  const { sendNotification } = useNotification();

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);
  const openConfirmDialog = () => setShowConfirmDialog(true);
  const closeConfirmDialog = () => setShowConfirmDialog(false);

  const onEditPosition = (id: number) => {
    setPosition(id);
    openDialog();
  }

  const { isLoading: deleting, mutate: deletePosition } = useMutation(() => {
    return onUpdatePositions(positions.filter(
      pos => pos.id !== position
    ).map(pos => ({
      ...pos,
      price: pos.price?.price
    })));
  }, {
    onSuccess: () => {
      closeConfirmDialog();
      sendNotification('Position deleted successfully', 'success', 3000);
    },
    onError: () => {
      sendNotification('Position deleting failed', 'error', 3000);
    }
  });

  const { isLoading: adding, mutate: addPosition } = useMutation((body: AccountPositionPayload) => {
    const payload: AccountPositionPayload[] = positions.map(pos => ({
      ...pos, price: pos.price?.price
    }));
    return onUpdatePositions([
      ...payload,
      body
    ]);
  }, {
    onSuccess: () => {
      sendNotification('Position added successfully', 'success', 3000);
    },
    onError: () => {
      sendNotification('Position adding failed', 'error', 3000);
    }
  });

  const { isLoading: updating, mutate: updatePosition } = useMutation((
    body: { id: number, payload: AccountPositionPayload }
  ) => {
    const { id, payload } = body;
    const payloads: AccountPositionPayload[] = positions.map(pos => pos.id === id ? ({
      ...pos, ...payload
    }) : ({
      ...pos, price: pos.price?.price
    }));

    return onUpdatePositions(payloads);
  }, {
    onSuccess: () => {
      sendNotification('Position updated successfully', 'success', 3000);
    },
    onError: () => {
      sendNotification('Position updating failed', 'error', 3000);
    }
  })

  const onDeletePosition = async (id: number) => {
    setPosition(id);
    openConfirmDialog();
  }

  const onNewPosition = () => {
    setPosition(null);
    openDialog();
  }

  const onAddPosition = async (
    symbol: string, shares: number, price: number | string, isCash: boolean
  ) => {
    return addPosition({ symbol, shares, price, isCash });
  }

  const onUpdatePosition = async (
    id: number, symbol: string, shares: number, price: number | string, isCash: boolean
  ) => {
    return updatePosition({ id, payload: { symbol, shares, price, isCash }});
  }

  const busy = adding || deleting || updating;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
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
