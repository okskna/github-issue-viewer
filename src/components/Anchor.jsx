import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

Anchor.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default Anchor;
