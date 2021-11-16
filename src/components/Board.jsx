import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import {
  selectIsHome,
  selectIsLoading,
  selectIssueList,
  selectLikedList,
} from '../features/pagination/paginationSlice';

import IssueList from './IssueList';
import NoIssue from './NoIssue';
import { flexCenter } from '../common/styles';
import LikedList from './LikedList';

const Board = () => {
  const issueItems = useSelector(selectIssueList);
  const isLoading = useSelector(selectIsLoading);
  const isHome = useSelector(selectIsHome);
  const likedItems = useSelector(selectLikedList);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader type='Puff' color='#00BFFF' height={100} width={100}></Loader>
      ) : isHome ? (
        <LikedList items={likedItems} />
      ) : issueItems.length ? (
        <IssueList items={issueItems} />
      ) : (
        <NoIssue />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexCenter}

  width: 75%;
  height: 70vh;
  min-height: 300px;

  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.sub};
  border-radius: 3px;
`;

export default Board;
