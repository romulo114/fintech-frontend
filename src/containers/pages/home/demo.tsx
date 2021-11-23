import React from 'react'
import { useTitle } from 'contexts/app'

export const DemoPage: React.FC = () => {

  useTitle('Demo')

  return (
    <div>
      Demo Page
    </div>
  )
}
