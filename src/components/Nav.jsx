import React, { useState } from 'react';
import styled from 'styled-components';
import { flexCenter } from '../common/styles';

import Logo from './Logo';
import SearchBox from './SearchBox';

const Nav = () => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('submit!', value);

    // TODO: await getRepository();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <Logo />
      <SearchBox
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        width='60%'
        inputWidth='80%'
        buttonWidth='2rem'
        placeholder='Input your github repository url'
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 20vh;
`;

export default Nav;
