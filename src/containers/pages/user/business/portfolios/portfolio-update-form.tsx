import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LinearProgress, Typography, Button, Autocomplete, TextField, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useQueries, useMutation, useQueryClient } from 'react-query';
import { ValidatedInput } from 'components/form';
import { PageTitle, CircleIconButton } from 'components/base';
import { AccountEditTable } from 'components/user';
import { PortfolioApis, PortfolioPayload } from 'service/portfolios';
import { AccountApis } from 'service/accounts';
import { ModelApis } from 'service/models';
import { requireValidators } from 'utils/validators';
import { ValidatedText } from 'types/validate';
import { AccountInfo } from 'types/account';
import { ModelInfo } from 'types/model';
import { delayedCall, delayedFunc } from 'utils/delay';
import { useNotification } from 'hooks/use-notification';

export const PortfolioUpdateForm: React.FC = () => {

  const { portfolioId } = useParams<{ portfolioId: string }>();
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const client = useQueryClient();

  const [name, setName] = useState<ValidatedText>({ value: '', error: '' });
  const [editName, setEditName] = useState(false);

  const [selected, setSelected] = useState<AccountInfo[]>([]);
  const [editAccount, setEditAccount] = useState(false);

  // update Model
  const [editModel, setEditModel] = useState(false);
  const [model, setModel] = useState<ModelInfo>();

  // update accounts
  const results = useQueries([
    {
      queryKey: ['portfolio', portfolioId],
      queryFn: delayedFunc(() => PortfolioApis.get(+(portfolioId ?? 0))),
      enabled: !!portfolioId,
      refetchOnWindowFocus: false,
      onError: (e: any) => sendNotification(e.message, 'error', 3000)
    },
    {
      queryKey: 'free_accounts',
      queryFn: delayedFunc(AccountApis.getAllWithoutPortfolio),
      refetchOnWindowFocus: false,
      onError: (e: any) => sendNotification(e.message, 'error', 3000)
    },
    {
      queryKey: 'models_public',
      queryFn: delayedFunc(() => ModelApis.getAll(true)),
      refetchOnWindowFocus: false,
      onError: (e: any) => sendNotification(e.message, 'error', 3000)
    },
    {
      queryKey: 'models_private',
      queryFn: delayedFunc(() => ModelApis.getAll(false)),
      refetchOnWindowFocus: false,
      onError: (e: any) => sendNotification(e.message, 'error', 3000)
    }
  ]);

  const portfolio = results[0].data;
  const accounts = results[1].data ?? [];
  const publicModels = results[2].data ?? [];
  const privateModels = results[3].data ?? [];

  useEffect(() => {
    if (portfolio) {
      setName({ value: portfolio.name, error: '' });
      setModel(portfolio.model);
      setSelected(portfolio?.accounts ?? []);
    }
  }, [portfolio])

  const { mutate: updateName, isLoading: updatingName } = useMutation({
    mutationFn: ({ id, body }: { id: number, body: PortfolioPayload }) => {
      return delayedCall(PortfolioApis.update(id, body));
    },
    onError: (e: any) => sendNotification(e.message, 'error', 3000),
    onSuccess: () => {
      setEditName(false);
      sendNotification('Name changed successfully', 'success', 3000);
      client.invalidateQueries(['portfolio', portfolioId]);
    }
  });

  const { mutate: updateAccounts, isLoading: updatingAccounts } = useMutation({
    mutationFn: ({ id, accounts }: { id: number, accounts: number[] }) => {
      return delayedCall(PortfolioApis.updateAccounts(id, { accounts }));
    },
    onError: (e: any) => sendNotification(e.message, 'error', 3000),
    onSuccess: () => {
      setEditAccount(false);
      sendNotification('Accounts changed successfully', 'success', 3000);
      client.invalidateQueries(['portfolio', portfolioId]);
    }
  });

  const { mutate: updateModel, isLoading: updatingModel } = useMutation({
    mutationFn: ({ id, modelId }: { id: number, modelId?: number }) => {
      return delayedCall(PortfolioApis.updateModel(id, { model_id: modelId ?? null }));
    },
    onError: (e: any) => sendNotification(e.message, 'error', 3000),
    onSuccess: () => {
      setEditModel(false);
      sendNotification('Model changed successfully', 'success', 3000);
      client.invalidateQueries(['portfolio', portfolioId]);
    }
  });

  const { mutate: deletePortfolio, isLoading: deleting } = useMutation({
    mutationFn: (id: number) => {
      return delayedCall(PortfolioApis.delete(id));
    },
    onError: (e: any) => sendNotification(e.message, 'error', 3000),
    onSuccess: () => {
      sendNotification('Portfolio deleted. Redirecting ...', 'success', 1500);
      client.invalidateQueries('portfolios');
      setTimeout(() => {
        navigate('/user/business/portfolios');
      }, 1200);
    }
  })

  const toggleEditName: () => void = useCallback(() => {
    setEditName(edit => !edit);
    setName({ value: portfolio?.name ?? '', error: '' });
  }, [portfolio]);

  const toggleEditAccount: () => void = useCallback(() => {
    setEditAccount(edit => !edit);
    setSelected(portfolio?.accounts ?? []);
  }, [portfolio?.accounts]);

  const toggleEditModel: () => void = useCallback(() => {
    setEditModel(edit => !edit);
    setModel(portfolio?.model);
  }, [portfolio?.model]);

  useEffect(() => {
    if (editAccount) {
      const current = portfolio?.accounts ?? [];
      setSelected([...current]);
    }
  }, [editAccount, portfolio?.accounts])

  useEffect(() => {
    setModel(portfolio?.model);
  }, [portfolio?.model])

  const handleUpdateName = () => {
    if (portfolioId) {
      updateName({ id: +portfolioId, body: { name: name.value } });
    }
  }

  const handleUpdateAccounts = () => {
    if (portfolioId) {
      updateAccounts({ id: +portfolioId, accounts: selected.map(item => item.id) });
    }
  }

  const handleUpdateModel = () => {
    if (portfolioId) {
      updateModel({ id: +portfolioId, modelId: model?.id });
    }
  }

  const handleDelete = () => {
    if (portfolioId) {
      deletePortfolio(+portfolioId);
    }
  }

  const busy = (
    results[0].isLoading || results[1].isLoading || results[2].isLoading || results[3].isLoading ||
    updatingName || updatingAccounts || updatingModel || deleting
  );

  const allAccounts = [...(portfolio?.accounts ?? []), ...(accounts ?? [])];
  return (
    <form className='portfolio-form'>
      <PageTitle>Update Portfolio</PageTitle>

      {busy && <LinearProgress />}

      <section className='input-group hover-show-wrapper'>
        <div className='d-flex align-items-end'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Name
          </Typography>
          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditName}>
              {editName ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editName && (
              <CircleIconButton onClick={handleUpdateName}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        <ValidatedInput
          fullWidth
          id='portfolio-name'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={name}
          setValue={setName}
          disabled={!editName}
        />
      </section>

      <section className='input-group hover-show-wrapper'>
        <div className='d-flex align-items-end'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Accounts
          </Typography>
          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditAccount}>
              {editAccount ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editAccount && (
              <CircleIconButton onClick={handleUpdateAccounts}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        <AccountEditTable
          all={allAccounts}
          accounts={portfolio?.accounts ?? []}
          editing={editAccount}
          selected={selected}
          setSelected={setSelected}
        />
      </section >

      <section className='input-group hover-show-wrapper'>
        <div className='d-flex align-items-end'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Model
          </Typography>
          <div className='align-items-center hover-show'>
            <CircleIconButton onClick={toggleEditModel}>
              {editModel ? <CloseIcon /> : <EditIcon />}
            </CircleIconButton>
            {editModel && (
              <CircleIconButton onClick={handleUpdateModel}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        <Box sx={{ my: 1 }}>
          {editModel && (
            <Autocomplete
              disablePortal
              options={[...publicModels, ...privateModels]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
              value={model}
              onChange={(_, value) => setModel(value ?? undefined)}
              getOptionLabel={opt => opt.name}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography>{option.name}</Typography>
                </li>
              )}
            />
          )}
          {!editModel && !!model && (
            <Typography>{model.name}</Typography>
          )}
        </Box>
      </section>

      <section className='actions justify-content-start'>
        <Button variant='outlined' color='error' onClick={handleDelete}>
          Delete
        </Button>
      </section>
    </form >
  )
}
