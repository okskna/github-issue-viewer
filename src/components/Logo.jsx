import React from 'react';
import Image from './Image';

import logo from '../assets/logo-white.png';

const Logo = () => {
  return (
    <>
      <Image src={logo} alt='logo' width='64px' height='64px' />
      <strong>Issue Viewer</strong>
    </>
  );
};

export default Logo;
