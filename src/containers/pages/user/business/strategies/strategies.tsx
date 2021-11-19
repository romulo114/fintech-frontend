import React, { useState } from 'react'
import { LinearProgress, Button } from '@mui/material'
import { MessageType, Message, PageTitle } from 'components/base'

export const StrategyList: React.FC = () => {

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  return (
    <>
      <PageTitle>My Strategies</PageTitle> 

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

    </>
  )
}
