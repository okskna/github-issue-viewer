import React from 'react';
import styled from 'styled-components';
import { useDispatch, batch } from 'react-redux';

import Button from './Button';
import LikedName from './LikedName';

import { AiFillStar } from 'react-icons/ai';
import {
  deleteLikedLink,
  getIssueCountAsync,
  getLikedIssueListAsync,
  setError,
  setIsHome,
  setPage,
  setSearchMode,
  setUrlInfo,
} from '../features/pagination/paginationSlice';
import { flexCenter } from '../common/styles';
import { CONSTANTS } from '../common/constants';

const LikedList = ({ items }) => {
  const dispatch = useDispatch();

  const handleLikedNameClick = (e) => {
    e.preventDefault();

    const [username, reponame] = e.target.innerText.split('/');

    batch(() => {
      dispatch(setIsHome(false));
      dispatch(setUrlInfo({ username, reponame }));
      dispatch(setPage(1));
      dispatch(getIssueCountAsync({ username, reponame, page: 1 }));
    });
  };

  const handleLikedClick = (e) => {
    e.preventDefault();

    if (!e.currentTarget || !e.currentTarget.name) {
      return;
    }

    const [username, reponame] = e.currentTarget.name.split('/');

    dispatch(deleteLikedLink({ username, reponame }));
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (!items.length) {
      dispatch(setError('Liked list is empty.'));

      return;
    }

    batch(() => {
      dispatch(getLikedIssueListAsync());
      dispatch(setSearchMode(CONSTANTS.LIKED_SEARCH));
      dispatch(setPage(1));
    });
  };

  return (
    <Wrapper>
      <h1>Liked</h1>
      {items.map((item, index) => (
        <Liked key={index}>
          <LikedName item={item} handleOnClick={handleLikedNameClick} />
          <Button
            onClick={handleLikedClick}
            name={`${item.username}/${item.reponame}`}
          >
            <div>
              <AiFillStar />
            </div>
          </Button>
        </Liked>
      ))}
      {items && <Button onClick={handleButtonClick}>Show all</Button>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Liked = styled.div`
  ${flexCenter}
  justify-content: flex-start;
  margin: 10px;
`;

export default LikedList;
