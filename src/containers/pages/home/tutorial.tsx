import React from 'react'
import { Container } from '@mui/material'
import { TutPaper, VideoHelp } from 'components/home'
import { tutIntro, tutDepth } from './data'
import { useTitle } from 'contexts/app'

export const TutorialPage = () => {

  useTitle('Tutorials')

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
