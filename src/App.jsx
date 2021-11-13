import React from 'react';
import styled from 'styled-components';

import Nav from './components/Nav';
import Board from './components/Board';

import { flexCenter } from './common/styles';
import GlobalStyle from './common/styles/globalStyle';

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Nav />
      <Board />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
`;

export default App;
