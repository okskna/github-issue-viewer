import { CONSTANTS } from '../constants';

export const isValidUrl = (url) => {
  if (typeof url !== 'string') {
    return false;
  }

  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);

  if (!url.match(regex)) {
    return false;
  }
  return true;
};

export const getUrlInfo = (url) => {
  if (!isValidUrl(url)) {
    return {
      username: null,
      reponame: null,
      error: 'URL is not valid.',
    };
  }

  const parsedUrl = new URL(url);

  if (!parsedUrl.pathname) {
    return {
      username: null,
      reponame: null,
      error: 'URL is not valid.',
    };
  }

  const [, username, reponame] = parsedUrl.pathname.split('/');

  if (!username || !reponame) {
    return {
      username: null,
      reponame: null,
      error: 'URL is not valid.',
    };
  }

  return {
    username,
    reponame,
    error: null,
  };
};

export const getPageRangeList = (page, maxPage) => {
  let minShownPage = page - Math.floor(CONSTANTS.PAGINATION_MAX_LENGTH / 2);

  if (minShownPage < 1) {
    minShownPage = 1;
  }

  let maxShownPage = minShownPage + CONSTANTS.PAGINATION_MAX_LENGTH - 1;

  if (maxShownPage > maxPage) {
    maxShownPage = maxPage;
  }

  if (
    maxPage > CONSTANTS.PAGINATION_MAX_LENGTH &&
    maxShownPage === maxPage &&
    maxShownPage - minShownPage < CONSTANTS.PAGINATION_MAX_LENGTH
  ) {
    minShownPage = maxShownPage - CONSTANTS.PAGINATION_MAX_LENGTH + 1;
  }

  const pageRangeList = [];

  for (let i = minShownPage; i <= maxShownPage; i++) {
    pageRangeList.push(i);
  }

  return pageRangeList;
};

export const makeReposQueryString = (likedList) => {
  const likedStringList = likedList.map(
    ({ username, reponame }) => `repo:${username}/${reponame}`
  );

  return likedStringList.join('+');
};
