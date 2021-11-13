import React from 'react';
import PropTypes from 'prop-types';

import Issue from './Issue';
import styled from 'styled-components';

const IssueList = ({ items }) => {
  return (
    <Wrapper>
      {items.map((item, index) => (
        <Issue item={item} index={index} key={index} />
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
  padding-left: 10px;
  width: 100%;
`;

export default IssueList;
