import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Box, Container } from '@mui/material'
import { useTitle } from 'contexts/app'
import { IntroCard, IntroCardProps } from 'components/home/intro-card'
import { introData, concept } from './data'

export const HomePage: React.FC = () => {

  const [intros, setIntros] = useState<IntroCardProps[]>([])
  useTitle('Home')

  useEffect(() => {
    setIntros(introData)
  }, [])

  return (
    <>
      <section className='banner relative'>
        <video
          controls
          poster='assets/images/landing_header.png'
          src='assets/images/landing_video.mp4'
        />
        <div className='text-center absolute-center'>
          <h2>Invest Like A Professional</h2>
          <h5>Achieve your financial goals with our easy powerful platform.</h5>
        </div>
      </section>
      <section className='actions'>
        <Link to='/auth/signup' className='button'>
          Try fithm now
        </Link>
        <Link to='/demo' className='button'>
          Try demo version
        </Link>
      </section>
      <Container className='intro' maxWidth='lg'>
        <Grid container spacing={2}>
          {intros.map(item => (
            <Grid item xs={12} sm={4} key={item.title}>
              <IntroCard
                className='card'
                image={item.image}
                title={item.title}
                description={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container className='intro' maxWidth='lg'>
        <Box className='header'>
          <IntroCard
            className='title'
            title={concept[0].title}
            description={concept[0].description}
            extra={concept[0].extra}
          />
        </Box>
        <Grid container spacing={8} padding='16px 32px'>
          <Grid item xs={12} sm={6} key={concept[1].title}>
            <IntroCard
              className='card'
              title={concept[1].title}
              description={concept[1].description}
              extra={concept[1].extra}
            />
          </Grid>
          <Grid item xs={12} sm={6} key={concept[2].title}>
            <IntroCard
              className='card'
              title={concept[2].title}
              description={concept[2].description}
              extra={concept[2].extra}
            />
          </Grid>
        </Grid>
      </Container>
      <section className='actions flex-center'>
        <Link to='/auth/signup' className='button'>
          Try fithm now
        </Link>
        <Link to='/demo' className='button'>
          Try demo version
        </Link>
      </section>
    </>
  )
}
