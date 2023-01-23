import { IntroCardProps, VideoHelpProps } from 'components/home'
import Shapes from 'assets/images/shapes.svg'
import Worldwide from 'assets/images/worldwide.svg'
import Target from 'assets/images/target.svg'


export const introData: IntroCardProps[] = [
  {
    image: Shapes,
    title: 'Find professional investment strategies',
    description: 'Fithm collects investment strategies from managers \
                  around the world into one library. \
                  Using this library, you pick the strategy you want. Or create one!'
  },
  {
    image: Worldwide,
    title: 'Use your existing accounts',
    description: 'No more switching brokers. \
                  Fithm uses your existing accounts so you can get invested today.'
  },
  {
    image: Target,
    title: 'Get trades with one click',
    description: 'Fithm instantly creates the best trades for your accounts.'
  }
]

export const concept: IntroCardProps[] = [
  {
    title: 'What is Fithm?',
    description: 'We at Fithm want to empower individual investors. \
                  Our goal is to give you access to more investment choices, \
                  at a lower cost, easily and quickly. The Fithm platform is the result. \
                  It helps you achieve your financial goals in a few steps.',
    extra: 'Two things make this possible.'
  },
  {
    title: 'Strategy Library',
    description: 'We attract professional managers to offer their strategies on the platform. \
                  You shop and choose.'
  },
  {
    title: 'Trade Engine',
    description: 'We\'ve automated the trade creation process. \
                  So you get the best and exact trades for your accounts.'
  }
]

export const tutIntro: VideoHelpProps[] = [
  {
    url: 'https://player.vimeo.com/video/331091116',
    title: 'Fithm Introduction to Tutorials',
    description: 'Introduces using Fithm tutorials and their location in Fithm.'
  },
  {
    url: 'https://player.vimeo.com/video/331088511',
    title: 'Getting Started',
    description: 'Covers an example of getting started in Fithm.'
  }
]

export const tutDepth: VideoHelpProps[] = [
  {
    url: 'https://player.vimeo.com/video/331995365',
    title: 'Fithm Navigation',
    description: 'Covers how to navigate Fithm.'
  },
  {
    url: 'https://player.vimeo.com/video/331998887',
    title: 'Working with accounts in Fithm',
    description: 'Covers how to work with accounts in Fithm.'
  },
  {
    url: 'https://player.vimeo.com/video/332083918',
    title: 'Working with portfolios in Fithm',
    description: 'Covers how to work with portfolios in Fithm.'
  },
  {
    url: 'https://player.vimeo.com/video/331995379',
    title: 'Working with Strategies in Fithm',
    description: 'Covers how to work with strategies in Fithm.'
  },
  {
    url: 'https://player.vimeo.com/video/331995397',
    title: 'Working with Trades in Fithm',
    description: 'Covers how to work with trades in Fithm.'
  },
  {
    url: 'https://player.vimeo.com/video/332092784',
    title: 'Manually Updating Trades in Fithm',
    description: 'Covers how to manually update trades in Fithm.'
  }
]