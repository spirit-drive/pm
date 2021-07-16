import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Head } from './Head';
import { Navigation } from './navigation/Navigation';

export const App: React.FC = () => (
  <BrowserRouter>
    <div>
      <Head />
      <Navigation />
    </div>
  </BrowserRouter>
);
