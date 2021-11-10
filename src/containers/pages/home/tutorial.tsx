import React from 'react'
import { Container } from '@mui/material'
import { TutPaper, VideoHelp } from 'components/home'
import { tutIntro, tutDepth } from './data'

export const TutorialPage: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <h1>
        Fithm Tutorials
      </h1>
      <TutPaper title='Introduction and Overview of Fithm'>
        {tutIntro.map(item => (
          <VideoHelp
            key={item.url}
            url={item.url}
            title={item.title}
            description={item.description}
          />
        ))}
      </TutPaper>

      <TutPaper title='Fithm Pages In Depth'>
        {tutDepth.map(item => (
          <VideoHelp
            key={item.url}
            url={item.url}
            title={item.title}
            description={item.description}
          />
        ))}
      </TutPaper>
    </Container>
  )
}
