import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Issue from './Issue';
import Button from './Button';

import { CONSTANTS } from '../common/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLikedLink,
  deleteLikedLink,
  selectLikedList,
  selectPage,
  selectUrlInfo,
} from '../features/pagination/paginationSlice';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const IssueList = ({ items }) => {
  const page = useSelector(selectPage);
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
      <Button onClick={handleButtonClick} width='2rem'>
        {isLiked() ? <AiFillStar /> : <AiOutlineStar />}
      </Button>
      {items.map((item, index) => (
        <Issue
          item={item}
          index={index + CONSTANTS.PER_PAGE * (page - 1) + 1}
          key={index}
        />
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
