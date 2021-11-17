import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Button, Typography, LinearProgress } from '@mui/material'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { requireValidators } from 'utils/validators'
import { Message, MessageType } from 'components/base'
import { FormTitle } from 'components/form'
import { PortfolioApis } from 'service/portfolios'
import { useAuthenticate } from 'hooks'

export const PortfolioUpdateForm: React.FC = () => {

  const { portfolioId } = useParams<{ portfolioId: string }>()

  const [name, setName] = useState<ValidatedText>({ value: '', error: '' })
  const [editName, setEditName] = useState(false)

  useEffect(() => {

  }, [])

  return (
    <form className='portfolio-form'>
      <FormTitle>Update Portfolio</FormTitle>

      <section className='input-group'>
        <ValidatedInput
          fullWidth
          id='portfolio-name'
          label='Name'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={name}
          setValue={setName}
          disabled={!editName}
        />
      </section>
    </form>
  )
}
