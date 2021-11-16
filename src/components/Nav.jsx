import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import SearchBox from './SearchBox';

import { flexCenter } from '../common/styles';
import { getUrlInfo } from '../common/util';
import { batch, useDispatch } from 'react-redux';
import {
  getIssueCountAsync,
  getIssueListAsync,
  setError,
  setIsHome,
  setPage,
  setUrlInfo,
} from '../features/pagination/paginationSlice';

const Nav = () => {
  const [url, setUrl] = useState('https://www.github.com/facebook/react');

  const dispatch = useDispatch();

  const handleLogoClick = (e) => {
    e.preventDefault();

    dispatch(setIsHome(true));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, reponame, error } = getUrlInfo(url);

    if (error) {
      dispatch(setError(error));
      return;
    }

    batch(() => {
      setUrl('');
      dispatch(setIsHome(false));
      dispatch(setUrlInfo({ username, reponame }));
      dispatch(setPage(1));
      dispatch(getIssueCountAsync({ username, reponame }));
      dispatch(getIssueListAsync({ username, reponame }));
    });
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <Wrapper>
      <Logo handleLogoClick={handleLogoClick} />
      <SearchBox
        value={url}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        width='60%'
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
