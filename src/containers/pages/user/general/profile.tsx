import React, { MouseEventHandler, MouseEvent, useState } from 'react'
import {
  Paper, Container, Typography,
  Button, Grid, LinearProgress, Box
} from '@mui/material'
import { 
  confirmValidators, emailValidators,
  passValidators, requireValidators
} from 'utils/validators'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { Message, MessageType } from 'components/base'
import { useAuthenticate, useDispatch } from 'hooks/auth'
import { AuthActions } from 'contexts/auth'
import { UserApis, UpdatePayload } from 'service/user'

export const Profile: React.FC = () => {

  const { user, tokens } = useAuthenticate()
  const dispatch = useDispatch()

  const [fname, setFname] = useState<ValidatedText>({ value: user?.firstName ?? '', error: '' })
  const [lname, setLname] = useState<ValidatedText>({ value: user?.lastName ?? '', error: '' })
  const [email, setEmail] = useState<ValidatedText>({ value: user?.email ?? '', error: '' })
  const [phone, setPhone] = useState<ValidatedText>({ value: user?.phoneNumber ?? '', error: '' })
  const [company, setCompany] = useState<ValidatedText>({ value: user?.company ?? '', error: '' })

  const [pass, setPass] = useState(false)
  const [oldpwd, setOldpwd] = useState<ValidatedText>({ value: '', error: '' })
  const [newpwd, setNewpwd] = useState<ValidatedText>({ value: '', error: '' })
  const [confirm, setConfirm] = useState<ValidatedText>({ value: '', error: '' })

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})

  const changePassword: MouseEventHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setPass(pass => !pass)
  }

  const saveProfile: MouseEventHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setBusy(true)
      setError({})

      const payload: UpdatePayload = {
        email: email.value,
        first_name: fname.value,
        last_name: lname.value,
        company: company.value,
        phone_number: phone.value
      }
      if (pass) {
        payload.old_password = oldpwd.value
        payload.new_password = newpwd.value
      }

      const response = await UserApis.update(tokens?.accessToken ?? '', payload)
      dispatch({
        type: AuthActions.setUser,
        payload: {
          user: {
            id: response.id,
            username: response.username,
            email: response.email,
            active: response.active,
            firstName: response.first_name,
            lastName: response.last_name,
            company: response.company,
            phoneNumber: response.phone_number,
          }
        }
      })
      setError({ type: 'success', message: 'Profile saved' })
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }

  let enabled = !!fname.value && !!lname.value && !!email.value &&
                  !fname.error && !lname.error && !email.error
  if (pass) {
    enabled = enabled && !!oldpwd.value && !!newpwd.value && !!confirm.value &&
              !oldpwd.error && !newpwd.error && !confirm.error
  }
  return (
    <Container maxWidth='md' className='profile-container'>
      <Paper sx={{ padding: theme => theme.spacing(4), width: '100%' }}>
        <Typography
          variant='h1'
          sx={{
            fontWeight: 600,
            fontSize: theme => 1.75 * theme.typography.fontSize,
            margin: theme => theme.spacing(2, 0)
          }}
          className='title'
        >
          Profile Settings
        </Typography>

        <form>
          {busy && <LinearProgress />}
          {error.type && <Message type={error.type}>{error.message}</Message>}
          <Grid spacing={2} container>
            <Grid item xs={12} sm={6}>
              <ValidatedInput
                fullWidth
                id='first-name'
                label='First Name'
                variant='standard'
                className='input'
                validators={requireValidators}
                value={fname}
                setValue={setFname}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedInput
                fullWidth
                id='last-name'
                label='Last Name'
                variant='standard'
                className='input'
                validators={requireValidators}
                value={lname}
                setValue={setLname}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedInput
                fullWidth
                id='email'
                label='Email'
                variant='standard'
                className='input'
                validators={emailValidators}
                value={email}
                setValue={setEmail}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedInput
                fullWidth
                id='phoneno'
                label='Phone Number'
                variant='standard'
                className='input'
                validators={[]}
                value={phone}
                setValue={setPhone}
              />
            </Grid>
            <Grid item xs={12}>
              <ValidatedInput
                fullWidth
                id='company'
                label='Your Company'
                variant='standard'
                className='input'
                validators={[]}
                value={company}
                setValue={setCompany}
              />
            </Grid>
          </Grid>
          <Button
            size='large'
            onClick={changePassword}
            className='input'
            variant={pass ? 'contained' : 'outlined'}
          >
            Change Password
          </Button>
          {pass && (
            <Grid spacing={2} container>
              <Grid item xs={12} md={4}>
                <ValidatedInput
                  fullWidth
                  id='old-pwd'
                  type='password'
                  label='Old Password'
                  variant='standard'
                  className='input'
                  validators={passValidators}
                  value={oldpwd}
                  setValue={setOldpwd}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ValidatedInput
                  fullWidth
                  id='new-pwd'
                  type='password'
                  label='New Password'
                  variant='standard'
                  className='input'
                  validators={passValidators}
                  value={newpwd}
                  setValue={setNewpwd}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ValidatedInput
                  fullWidth
                  id='confirm'
                  type='password'
                  label='Confirm'
                  variant='standard'
                  className='input'
                  validators={confirmValidators(newpwd.value)}
                  value={confirm}
                  setValue={setConfirm}
                />
              </Grid>
            </Grid>
          )}
          <Box className='actions'>
            <Button
              size='large'
              onClick={saveProfile}
              variant='contained'
              disabled={!enabled}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
