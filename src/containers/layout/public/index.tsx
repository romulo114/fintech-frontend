import React, { PropsWithChildren } from 'react'
import { Box } from '@material-ui/core'

import { Header, Footer } from '../shared'

export const PublicLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <Box>
      <Header />
      <Box component='main'>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
