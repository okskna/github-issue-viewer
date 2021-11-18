import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Issue from './Issue';
import Button from './Button';

import {
  addLikedLink,
  deleteLikedLink,
  selectLikedList,
  selectUrlInfo,
} from '../features/pagination/paginationSlice';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const IssueList = ({ items }) => {
  const urlInfo = useSelector(selectUrlInfo);
  const likedList = useSelector(selectLikedList);

  const dispatch = useDispatch();

  const isLiked = () =>
    likedList.some(
      (liked) =>
        liked.username === urlInfo.username &&
        liked.reponame === urlInfo.reponame
    );

  const handleButtonClick = () => {
    if (isLiked()) {
      dispatch(deleteLikedLink(urlInfo));

      return;
    }
    dispatch(addLikedLink(urlInfo));
  };

  return (
    <Wrapper>
      {urlInfo.username ? (
        <Button onClick={handleButtonClick} width='2rem'>
          {isLiked() ? <AiFillStar /> : <AiOutlineStar />}
        </Button>
      ) : (
        <></>
      )}
      {items.map((item, index) => (
        <Issue item={item} reponame={urlInfo?.reponame} key={index} />
      ))}
    </Wrapper>
  );
};

IssueList.defaultProps = { items: [] };
IssueList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      htmlUrl: PropTypes.string.isRequired,
    })
  ),
};

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;

  padding: 10px;
  width: 100%;
`;

export default IssueList;
