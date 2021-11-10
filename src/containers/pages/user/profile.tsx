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

export const Profile: React.FC = () => {

  const [fname, setFname] = useState<ValidatedText>({ value: '', error: '' })
  const [lname, setLname] = useState<ValidatedText>({ value: '', error: '' })
  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const [phone, setPhone] = useState<ValidatedText>({ value: '', error: '' })
  const [company, setCompany] = useState<ValidatedText>({ value: '', error: '' })

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


      setError({ type: 'success', message: 'Profile saved' })
    } catch (e: any) {
      setError({ type: 'error', message: e.response?.data?.message })
    } finally {
      setBusy(false)
    }
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedInput
                fullWidth
                id='phoneno'
                label='Phone Number'
                variant='standard'
                className='input'
                validators={requireValidators}
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
                validators={requireValidators}
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
            <Button size='large' onClick={saveProfile} variant='contained'>
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
