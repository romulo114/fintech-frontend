import React from 'react'
import { DocArticle } from 'components/user'

const docData = [
  { 
    title: 'Introduction',
    descs: 'fithm is an investment platform that allows you to manage your accounts, \
    portfolios, and trades in one location. fithm was designed for flexibile workflows. \
    So you can use it for all your accounts or just one. \
    And you can use fithm\'s automatic data processes or manually add data.'
  },
  {
    title: 'Getting Started',
    descs: [
      {
        title: '1. Add your accounts',
        descs: 'Go to the Accounts page and select Connect Accounts.'
      },
      {
        title: '2. Create portfolio',
        descs: 'Go to the portfolio page and click Create Portfolio.'
      },
      {
        title: '3. Assign Accounts to Portfolio',
        descs: 'Go to the portfolio page, select your portfolio, click update accounts, \
        and click assign for the accounts you want.'
      },
      {
        title: '4. Select a strategy for the portfolio',
        descs: 'Go to the portfolio page, select your portfolio, click Update Model. \
        Select the strategy you want.\
        (optional: Create your own strategy on the Models page.)'
      },
      {
        title: '5. Create trades',
        descs: 'Go to the trades page and create a trade, assign the portfolio to the trade, \
        click get prices, click save trade, click get trades.'
      },
      {
        title: '6. Send trades to your broker',
        descs: 'Up to you.'
      },
    ]
  },
  {
    title: 'General Purpose',
    descs: ''
  }
]
export const Documentation: React.FC = () => {
  return (
    <section className='documentation'>
      <h1>
        Documentation
      </h1>
      {docData.map(item => <DocArticle {...item} key={item.title} />)}
    </section>
  )
}
