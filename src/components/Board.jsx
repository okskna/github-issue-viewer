import React from 'react';
import { batch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  getIssueCountAsync,
  getLikedIssueListAsync,
  selectIsHome,
  selectIsLoading,
  selectIssueList,
  selectLikedList,
  selectSearchMode,
  selectUrlInfo,
  setPage,
} from '../features/pagination/paginationSlice';

import IssueList from './IssueList';
import NoIssue from './NoIssue';
import LikedList from './LikedList';
import Pagination from './Pagination';
import LoadSpinner from './LoadSpinner';

import { flexCenter } from '../common/styles';
import { CONSTANTS } from '../common/constants';
import { useDispatch } from 'react-redux';

const Board = () => {
  const issueItems = useSelector(selectIssueList);
  const isLoading = useSelector(selectIsLoading);
  const isHome = useSelector(selectIsHome);
  const likedItems = useSelector(selectLikedList);
  const mode = useSelector(selectSearchMode);
  const { username, reponame } = useSelector(selectUrlInfo);

  const dispatch = useDispatch();

  const handleSubmit = (e, page) => {
    e.preventDefault();

    if (mode === CONSTANTS.LIKED_SEARCH) {
      batch(() => {
        dispatch(setPage(page));
        dispatch(getLikedIssueListAsync({ username, reponame, page }));
      });
      return;
    }

    if (mode === CONSTANTS.NORMAL_SEARCH) {
      batch(() => {
        dispatch(setPage(page));
        dispatch(getIssueCountAsync({ username, reponame, page }));
      });
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <LoadSpinner />
      ) : isHome ? (
        <LikedList items={likedItems} />
      ) : issueItems.length ? (
        <IssueList items={issueItems} />
      ) : (
        <NoIssue />
      )}
      {!isHome && <Pagination handleSubmit={handleSubmit} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;

  width: 75%;
  height: 70vh;
  min-height: 500px;

  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.sub};
  border-radius: 3px;
`;

export default Board;
