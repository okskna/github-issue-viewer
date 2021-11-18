import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Anchor from './Anchor';

import { selectSearchMode } from '../features/pagination/paginationSlice';
import { CONSTANTS } from '../common/constants';

const Issue = ({ item }) => {
  const { title, htmlUrl } = item;

  const mode = useSelector(selectSearchMode);

  const reponame = htmlUrl?.split('github.com/')[1].split('/')[1];
  const isLikedMode = mode === CONSTANTS.LIKED_SEARCH;

  return (
    <Anchor href={htmlUrl}>
      {isLikedMode ? `${reponame}:  ${title}` : `${title}`}
    </Anchor>
  );
};

Issue.defaultProps = {
  reponame: '',
};
Issue.propTypes = {
  items: PropTypes.shape({
    title: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
  }),
  reponame: PropTypes.string,
};

export default Issue;
