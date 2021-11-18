import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import SearchBox from './SearchBox';

import { flexCenter } from '../common/styles';
import { getUrlInfo } from '../common/util';
import { batch, useDispatch } from 'react-redux';
import {
  getIssueCountAsync,
  setError,
  setIsHome,
  setPage,
  setSearchMode,
  setUrlInfo,
} from '../features/pagination/paginationSlice';
import { CONSTANTS } from '../common/constants';

const Nav = () => {
  const [url, setUrl] = useState('');

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
      dispatch(setSearchMode(CONSTANTS.NORMAL_SEARCH));
      dispatch(getIssueCountAsync({ username, reponame, page: 1 }));
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
        placeholder='Input your github repository url (ex. https://github.com/facebook/react)'
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
