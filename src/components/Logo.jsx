import React from 'react';
import Image from './Image';

import logo from '../assets/logo-white.png';
import styled from 'styled-components';
import { flexCenter } from '../common/styles';

const Logo = ({ handleLogoClick }) => {
  return (
    <Wrapper onClick={handleLogoClick}>
      <Image src={logo} alt='logo' width='64px' height='64px' />
      <strong>Issue Viewer</strong>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexCenter}
  cursor: pointer;
`;

export default Logo;
