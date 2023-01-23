import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type ActionButtonProps = Partial<ButtonProps> & {
	loading: boolean;
	children: React.ReactNode;
};
export const ActionButton = ({ loading, children, sx, ...others }: ActionButtonProps) => (
	<Button
		sx={{ display: 'flex', gap: 1, alignItems: 'center', ...sx }}
		{...others}
	>
		{children}
		{loading && <CircularProgress size={20} color='warning' />}
	</Button>
);
