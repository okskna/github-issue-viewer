import React from 'react';
import styled from 'styled-components';

import Nav from './components/Nav';
import Board from './components/Board';
import Pagination from './components/Pagination';

import { flexCenter } from './common/styles';
import GlobalStyle from './common/styles/globalStyle';

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Nav />
      <Board />
      <Pagination />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default App;
