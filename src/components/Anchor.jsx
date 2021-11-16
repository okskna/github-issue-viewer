import React from 'react';
import styled from 'styled-components';

const Anchor = ({ children, href }) => {
  return <Wrapper href={href}>{children}</Wrapper>;
};

const Wrapper = styled.a`
  width: 100%;
  padding: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Anchor;
