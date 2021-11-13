import React from 'react'
import { BlogType } from 'types/blog'

type BlogItemProps = {
  data: BlogType;
}
export const BlogItem: React.FC<BlogItemProps> = (props) => {

  const { data } = props
  
  return (
    <div>
      
    </div>
  )
}
