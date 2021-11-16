import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { flexCenter } from '../common/styles';
import { getPageRangeList } from '../common/util';
import {
  selectMaxPage,
  selectPage,
  selectTotalCount,
} from '../features/pagination/paginationSlice';

const PageList = ({ handleClickPage }) => {
  const totalCount = useSelector(selectTotalCount);
  const page = useSelector(selectPage);
  const maxPage = useSelector(selectMaxPage);

  const pages = useMemo(() => {
    const pages = getPageRangeList(page, maxPage);

    return pages;
  }, [page, totalCount]);

  return (
    <Wrapper>
      {pages.map((index) => (
        <Page onClick={handleClickPage} key={index} value={index} page={page}>
          {index}
        </Page>
      ))}
    </Wrapper>
  );
};

PageList.defaultProps = { handleClickPage: () => {} };
PageList.propTypes = {
  handleClickPage: PropTypes.func,
};

const Wrapper = styled.div`
  ${flexCenter}
  font-size: 1.5rem;
`;

const Page = styled.div`
  margin: 0px 5px;
  color: ${({ theme, value, page }) =>
    value === page ? theme.color.lightpink : theme.color.sub};
`;

export default PageList;
