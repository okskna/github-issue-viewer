import React from 'react';
import styled from 'styled-components';
import { flexCenter } from '../common/styles';

const NoIssue = () => {
  return <Wrapper>No result.</Wrapper>;
};

const Wrapper = styled.div`
  ${flexCenter}
`;

export default NoIssue;
