import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';

import { theme } from './common/styles/theme';

const rootElement = document.getElementById('root');
render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
);
