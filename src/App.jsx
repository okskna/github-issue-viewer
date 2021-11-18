import React from 'react';
import styled from 'styled-components';

import Nav from './components/Nav';
import Board from './components/Board';

import { flexCenter } from './common/styles';
import GlobalStyle from './common/styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, selectError } from './features/pagination/paginationSlice';

const App = () => {
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleErrorClick = (e) => {
    e.preventDefault();

    dispatch(clearError());
  };

  return (
    <Wrapper>
      <GlobalStyle />
      {error && <ErrorBox onClick={handleErrorClick}>{error}</ErrorBox>}
      <Nav />
      <Board />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ErrorBox = styled.div`
  ${flexCenter}
  position: absolute;

  width: 200px;
  height: auto;
  padding: 10px;

  border-radius: 3px;
  z-index: 10;
  color: ${({ theme }) => theme.color.sub};
  background-color: ${({ theme }) => theme.color.lightpink};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default App;
