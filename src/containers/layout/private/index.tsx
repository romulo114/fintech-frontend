import React, { PropsWithChildren} from 'react'
import { Box } from '@material-ui/core'
import { Header } from './header'
import { Footer } from './footer'

export const PrivateLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
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
