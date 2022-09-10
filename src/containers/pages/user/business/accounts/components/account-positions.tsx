import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { CircleIconButton } from 'components/base';
import { AccountPositionsTable } from './account-position-table';
import { AccountPositionDialog } from './account-position-dialog';
import { AccountInfo, AccountPosition } from 'types';
import { ActionButton, Message } from 'components/base';

type AccountPositionsProps = {
	account: AccountInfo;
	onAddPosition: (
		symbol: string,
		share: number,
		isCash: boolean
	) => Promise<void>;
	onUpdatePositions: (positions: AccountPosition[]) => Promise<void>;
}
export const AccountPositions = (
	{ account, onAddPosition, onUpdatePositions }: AccountPositionsProps
) => {
	const [showDialog, setShowDialog] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState('');
	const [positions, setPositions] = useState<AccountPosition[]>([...account.positions]);
	const [position, setPosition] = useState<number | null>(null);

	const openDialog = () => setShowDialog(true);
	const closeDialog = () => setShowDialog(false);

	const onEditPosition = (id: number) => {
		setPosition(id);
		openDialog();
	}

	const onDeletePosition = (id: number) => {
		setPositions(positions.filter(pos => pos.id !== id));
	}

	const onNewPosition = () => {
		setPosition(null);
		openDialog();
	}

	const onUpdatePosition = (
		id: number, symbol: string, shares: number, isCash: boolean
	) => {
		for (const pos of positions) {
			if (pos.id !== id) continue;
			pos.symbol = symbol;
			pos.shares = shares;
			pos.isCash = isCash;
		}

		setPositions([...positions]);
	}

	const onResetPositions = () => {
		setPositions([...account.positions]);
	}

	const onSavePositions = async () => {
		setBusy(true);

		try {
			await onUpdatePositions(positions);
		} catch (e: any) {
			setError(e.message ?? JSON.stringify(e));
		} finally {
			setBusy(false);
		}
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			{!!error && <Message type='error'>{error}</Message>}
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
			{positions && positions.length > 0 && (
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
					<Button onClick={onResetPositions} variant='outlined'>Reset</Button>
					<ActionButton onClick={onSavePositions} variant='contained' loading={busy}>
						Save
					</ActionButton>
				</Box>
			)}
			<AccountPositionDialog
				open={showDialog}
				position={positions.find(pos => pos.id === position)}
				onClose={closeDialog}
				onAdd={onAddPosition}
				onUpdate={onUpdatePosition}
			/>
		</Box>
	)
};
