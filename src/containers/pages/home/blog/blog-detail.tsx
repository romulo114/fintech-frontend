import React from 'react'
import { useParams } from 'react-router-dom'

export const BlogDetail: React.FC = () => {

  const { blogId } = useParams<{blogId: string}>()

  return (
    <div>
      blog detail: {blogId}
    </div>
  )
}
