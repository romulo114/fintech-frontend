import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'containers/router';

import './app.scss';

export const App: React.FC = () => {
  return (
    <main className="app">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </main>
  );
}
