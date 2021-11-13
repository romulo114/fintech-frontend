import React from 'react'
import { useParams } from 'react-router-dom'

export const BlogEdit: React.FC = () => {

  const { blogId } = useParams<{blogId: string}>()

  return (
    <div>
      blog edit: {blogId}
    </div>
  )
}
