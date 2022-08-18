import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LinearProgress, Typography, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { ValidatedInput } from 'components/form';
import { Message, MessageType, PageTitle, CircleIconButton } from 'components/base';
import { AccountEditTable, StrategySelectTable } from 'components/user';
import { PortfolioApis } from 'service/portfolios';
import { AccountApis } from 'service/accounts';
import { ModelApis } from 'service/models';
import { useAuthenticate } from 'hooks';
import { requireValidators } from 'utils/validators';
import { ValidatedText } from 'types/validate';
import { AccountInfo } from 'types/account';
import { PortfolioInfo } from 'types/portfolio';
import { ModelInfo } from 'types/model';

export const PortfolioUpdateForm: React.FC = () => {

  const { portfolioId } = useParams<{ portfolioId: string }>();
  const navigate = useNavigate();

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({});
  const [busy, setBusy] = useState(false);

  // update name
  const [name, setName] = useState<ValidatedText>({ value: '', error: '' });
  const [editName, setEditName] = useState(false);

  // update accounts
  const [portfolio, setPortfolio] = useState<PortfolioInfo | null>(null);
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [selected, setSelected] = useState<AccountInfo[]>([]);
  const [editAccount, setEditAccount] = useState(false);

  // update Model
  const [editModel, setEditModel] = useState(false);
  const [publics, setPublics] = useState<ModelInfo[]>([]);
  const [privates, setPrivates] = useState<ModelInfo[]>([]);
  const [model, setModel] = useState<ModelInfo | null>(portfolio?.model ?? null);
  const { tokens } = useAuthenticate();

  const toggleEditName: () => void = useCallback(() => {
    setEditName(edit => !edit)
    setName({ value: portfolio?.name ?? '', error: '' })
  }, [portfolio?.name]);

  const toggleEditAccount: () => void = useCallback(() => {
    setEditAccount(edit => !edit)
    setSelected(portfolio?.accounts ?? [])
  }, [portfolio?.accounts]);

  const toggleEditModel: () => void = useCallback(() => {
    setEditModel(edit => !edit)
    setModel(portfolio?.model ?? null)
  }, [portfolio?.model]);

  const updateName: () => Promise<void> = useCallback(async () => {
    if (!portfolioId) return;
    try {
      setBusy(true);
      setError({});

      const updated = await PortfolioApis.update(
        +portfolioId, { name: name.value }
      );
      setPortfolio(updated);
      setName({ value: updated.name, error: '' });
      setError({ type: 'success', message: 'Name saved' });
    } catch (e: any) {
      setError({ type: 'error', message: e.message });
    } finally {
      setBusy(false);
    }
  }, [name, portfolioId])

  const updateAccounts: () => Promise<void> = async () => {
    if (!portfolioId) return;
    try {
      setBusy(true);
      setError({});

      const updated = await PortfolioApis.updateAccounts(
        +portfolioId, { accounts: selected.map(sel => sel.id) }
      );
      setPortfolio(updated);
      setEditAccount(false);
      setError({ type: 'success', message: 'Accounts saved' });
    } catch (e: any) {
      setError({ type: 'error', message: e.message });
    } finally {
      setBusy(false);
    }
  }

  const updateModel: () => Promise<void> = async () => {
    if (!portfolioId) return;
    try {
      setBusy(true);
      setError({});

      const updated = await PortfolioApis.updateModel(
        +portfolioId,
        { model_id: model?.id ?? null }
      );
      setPortfolio(updated);
      setEditModel(false);
      setError({ type: 'success', message: 'Model changed' });
    } catch (e: any) {
      setError({ type: 'error', message: e.message });
    } finally {
      setBusy(false);
    }
  }

  const onDelete: () => Promise<void> = async () => {
    if (!portfolioId) return;
    try {
      setBusy(true);
      setError({});

      await PortfolioApis.delete(+portfolioId);
      setError({ type: 'success', message: 'Portfolio deleted' });
      setTimeout(() => {
        navigate('/user/business/portfolios');
      }, 2000)
    } catch (e: any) {
      setError({ type: 'error', message: e.message });
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        setError({})

        const result = await Promise.all([
          ModelApis.getAll(true),
          ModelApis.getAll(false)
        ])
        setPublics(result[0])
        setPrivates(result[1])
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [])

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      if (!portfolioId) return;

      try {
        setBusy(true)
        setError({})

        const result = await Promise.all([
          PortfolioApis.get(+portfolioId),
          AccountApis.getAll()
        ])
        setPortfolio(result[0])
        setName({ value: result[0].name, error: '' })
        setAccounts(result[1])
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [portfolioId])

  useEffect(() => {
    if (editAccount) {
      const current = portfolio?.accounts ?? []
      setSelected([...current])
    }
  }, [editAccount, portfolio?.accounts])

  useEffect(() => {
    setModel(portfolio?.model ?? null)
  }, [portfolio?.model])


  return (
    <form className='portfolio-form'>
      <PageTitle>Update Portfolio</PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

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
              <CircleIconButton onClick={updateName}>
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
              <CircleIconButton onClick={updateAccounts}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        <AccountEditTable
          all={accounts}
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
              <CircleIconButton onClick={updateModel}>
                <CheckIcon />
              </CircleIconButton>
            )}
          </div>
        </div>
        <StrategySelectTable
          publics={publics}
          privates={privates}
          editing={editModel}
          value={model}
          setModel={setModel}
        />
      </section>

      <section className='actions justify-content-start'>
        <Button variant='outlined' color='error' onClick={onDelete}>
          Delete
        </Button>
      </section>
    </form >
  )
}
