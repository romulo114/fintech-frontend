import React from 'react'
import { Helmet } from "react-helmet"
import { useSelector } from 'contexts/app'

export const Title: React.FC = () => {
  const title = useSelector(state => state.title)
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
