import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import SearchBox from './SearchBox';

import getIssueCount from '../apis/getIssueCount';
import getIssueList from '../apis/getIssueList';
import { flexCenter } from '../common/styles';
import { getUrlInfo } from '../common/util';

const Nav = () => {
  const [url, setUrl] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [issueList, setIssueList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('🔥: ', totalCount, issueList, page);
  }, [totalCount, issueList, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('submit!', url);

    const { username, reponame, error } = getUrlInfo(url);

    if (error) {
      console.log(error);
      return;
    }

    setTotalCount(await getIssueCount(username, reponame));
    setIssueList(await getIssueList(username, reponame, page));
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <Wrapper>
      <Logo />
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
