import React from 'react';
import PropTypes from 'prop-types';
import Anchor from './Anchor';

const Issue = ({ item, index }) => {
  const { title, htmlUrl } = item;

  return (
    <Anchor href={htmlUrl}>
      {index}. {title}
    </Anchor>
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

export default Issue;
