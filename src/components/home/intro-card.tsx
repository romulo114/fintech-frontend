import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'

export type IntroCardProps = {
  image?: string;
  title: string;
  description: string;
  extra?: string;
  className?: string
}
export const IntroCard: React.FC<IntroCardProps> = (props: IntroCardProps) => {

  const { image, title, description, extra, ...others } = props
  return (
    <Card {...others}>
      <CardContent>
        {image && (
          <Box sx={{ margin: 'auto', height: 64, my: 4 }}>
            <img src={image} alt="cover icon" />
          </Box>
        )}
        <Typography
          variant="h5"
          component="div"
          sx={{ fontSize: '1.25rem', margin: '16px 8px', fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className='fw-600'>
          {description}
        </Typography>
        {extra && (
          <Typography variant="body2" color="text.secondary" className='fw-600'>
            <br />
            {extra}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
