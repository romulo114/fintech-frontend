import React from 'react'
import { useTitle } from 'contexts/app'
import { TradeInfo } from 'types'

type TradeUpdateProps = {
  trade: TradeInfo;
}
export const TradeUpdate: React.FC<TradeUpdateProps> = (props) => {

  const { trade } = props

  useTitle('Update trade')

  return (
    <form className='trade-update-form'>
      
    </form>
  )
}
