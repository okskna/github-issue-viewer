import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Issue = ({ item, index }) => {
  const { title, htmlUrl } = item;

  return (
    <Wrapper href={htmlUrl}>
      {index}. {title}
    </Wrapper>
  );
};

Issue.defaultProps = { index: 1 };
Issue.propTypes = {
  items: PropTypes.shape({
    title: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
  }),
  index: PropTypes.number,
};

const Wrapper = styled.a`
  width: 100%;
  padding: 5px 0;
`;

export default Issue;
