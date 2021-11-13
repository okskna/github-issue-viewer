import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { flexCenter } from './common/styles';
import GlobalStyle from './common/styles/globalStyle';

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <div>Hello world.</div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
`;

export default App;
