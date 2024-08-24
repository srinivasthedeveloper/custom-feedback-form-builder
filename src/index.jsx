import '@mantine/core/styles.css';
import * as React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
);
