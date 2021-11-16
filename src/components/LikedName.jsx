import React from 'react';
import styled from 'styled-components';
import { flexCenter } from '../common/styles';

const LikedName = ({ item, handleOnClick }) => {
  const { username, reponame } = item;

  return <Wrapper onClick={handleOnClick}>{`${username}/${reponame}`}</Wrapper>;
};

const Wrapper = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

export default LikedName;
