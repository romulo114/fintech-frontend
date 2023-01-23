import { useTitle } from 'contexts/app'
import React from 'react'

export const Dashboard: React.FC = () => {
  useTitle('Dashboard');
  return (
    <div>
      dashboard
    </div>
  )
}
