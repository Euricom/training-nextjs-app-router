import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { QueryProvider } from './components/queryProvider';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
