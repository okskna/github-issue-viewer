import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

import PageList from './PageList';

import { flexCenter } from '../common/styles';
import {
  getIssueCountAsync,
  getIssueListAsync,
  selectPage,
  selectUrlInfo,
  setPage,
  setPageNext,
} from '../features/pagination/paginationSlice';

const Pagination = () => {
  const page = useSelector(selectPage);
  const { username, reponame } = useSelector(selectUrlInfo);

  const dispatch = useDispatch();

  const handleClickPage = (e) => {
    e.preventDefault();

    dispatch(setPage(Number(e.target.innerText)));
  };

  const handleClickLeftArrow = (e) => {
    e.preventDefault();
    dispatch(setPage(1));
  };

  const handleClickRightArrow = (e) => {
    e.preventDefault();
    dispatch(setPageNext());
  };

  useEffect(() => {
    if (username && reponame) {
      dispatch(getIssueCountAsync({ username, reponame }));
      dispatch(getIssueListAsync({ username, reponame }));
    }
  }, [page]);

  return (
    <Wrapper>
      <MdArrowLeft onClick={handleClickLeftArrow} />
      <PageList handleClickPage={handleClickPage} />
      <MdArrowRight onClick={handleClickRightArrow} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexCenter}
  font-size: 2rem;
  margin-top: 20px;
  cursor: pointer;
`;

export default Pagination;
