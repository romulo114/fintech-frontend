import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './app'

test('renders learn react link', () => {
  render(<App />)
  const anchor = screen.getByText(/Try fithm now/i)
  expect(anchor).toBeInTheDocument()
})
