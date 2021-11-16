import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { Provider } from 'react-redux';

import { theme } from './common/styles/theme';
import { store } from './features/store';

const rootElement = document.getElementById('root');
render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  rootElement
);
