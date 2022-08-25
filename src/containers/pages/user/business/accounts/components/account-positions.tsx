import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { CircleIconButton } from 'components/base';
import { AccountPositionsTable } from './account-position-table';
import { AccountInfo } from 'types';

type AccountPositionsProps = {
  account?: AccountInfo;
}
export const AccountPositions = ({ account }: AccountPositionsProps) => {
	const onDeletePosition = (id: number) => {
    console.log('Delete', id);
  }

  const onEditPosition = (id: number) => {
    console.log('Edit', id);
  }

  const onAddPosition = () => {
    console.log('add position');
  }

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
				<Typography variant='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
					Positions
				</Typography>
				<CircleIconButton onClick={onAddPosition}>
					<AddIcon />
				</CircleIconButton>
			</Box>

			<AccountPositionsTable
				positions={account?.positions ?? []}
				onDelete={onDeletePosition}
				onEdit={onEditPosition}
			/>
		</Box>
	)
};
