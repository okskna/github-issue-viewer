import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PageList from './PageList';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

import { flexCenter } from '../common/styles';
import {
  selectMaxPage,
  selectPage,
} from '../features/pagination/paginationSlice';
import { CONSTANTS } from '../common/constants';

const Pagination = ({ handleSubmit }) => {
  const page = useSelector(selectPage);
  const maxPage = useSelector(selectMaxPage);

  const handleClickPage = (e) => {
    e.preventDefault();

    const newPage = Number(e.target.innerText);

    handleSubmit(e, newPage);
  };

  const handleClickLeftArrow = (e) => {
    e.preventDefault();

    const newPage = 1;

    handleSubmit(e, newPage);
  };

  const handleClickRightArrow = (e) => {
    e.preventDefault();

    let newPage;

    if (page + CONSTANTS.PAGINATION_MAX_LENGTH > maxPage) {
      newPage = maxPage;
    } else {
      newPage = page + CONSTANTS.PAGINATION_MAX_LENGTH;
    }

    handleSubmit(e, newPage);
  };

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
