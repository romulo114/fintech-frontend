import React from 'react'
import { Grid } from '@mui/material'

export type VideoHelpProps = {
  title: string;
  description: string;
  url: string;
}
export const VideoHelp: React.FC<VideoHelpProps> = (props: VideoHelpProps) => {

  const { title, description, url } = props

  return (
    <Grid
      container
      spacing={2}
      direction={['column-reverse', 'row']}
      sx={{ marginTop: 1, marginBottom: 1, flexWrap: 'nowrap' }}>
      <Grid item sm={12} md={6}>
        <iframe
          src={url}
          frameBorder={0}
          allow='autoplay; fullscreen'
          allowFullScreen
        />
        </Grid>
        <Grid item sm={12} md={6}>
          <h5>{title}</h5>
          <p>{description}</p>
        </Grid>
    </Grid>
  )
}
