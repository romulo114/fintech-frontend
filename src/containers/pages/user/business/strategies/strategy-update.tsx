import React, { useState } from 'react';
import { Container } from '@mui/material';
import { StrategyForm } from './strategy-form';
import { useTitle } from 'contexts/app';
import { usePrompt } from 'hooks/use-prompt';

export const StrategyUpdate: React.FC = () => {
  useTitle('Update strategy');

  const [isDirty, setIsDirty] = useState(false);
  usePrompt('Your changes will be lost. Do you want to continue?', isDirty);

  return (
    <Container maxWidth='md' sx={{ p: 3, mt: 4 }}>
      <StrategyForm onChanged={setIsDirty} />
    </Container>
  )
}
