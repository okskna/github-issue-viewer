import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Nav from './components/Nav';

import { flexCenter } from './common/styles';
import GlobalStyle from './common/styles/globalStyle';

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Nav />
      <div>This is board</div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
`;

export default App;
