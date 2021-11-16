import { CONSTANTS } from '../../common/constants';

export const getIssueCount = async (username, reponame) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://api.github.com/search/issues?q=repo:${username}/${reponame}%20is:issue`,
      requestOptions
    );

    if (response.status >= 400) {
      throw new Error('Server error: ' + response.status);
    }

    const raw = await response.text();
    const result = JSON.parse(raw);
    const totalCount = result.total_count;

    return totalCount;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getIssueList = async (username, reponame, page) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${reponame}/issues?per_page=${CONSTANTS.PER_PAGE}&page=${page}`,
      requestOptions
    );

    if (response.status >= 400) {
      throw new Error('Server error: ' + response.status);
    }

    const raw = await response.text();
    const result = JSON.parse(raw);
    const titleList = result.map((item) => ({
      title: item.title,
      htmlUrl: item.html_url,
    }));

    return titleList;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLikedIssueList = async (repos, page) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://api.github.com/search/issues?q=${repos}%20is:issue&per_page=${CONSTANTS.PER_PAGE}&page=${page}`,
      requestOptions
    );

    if (response.status >= 400) {
      throw new Error('Server error: ' + response.status);
    }

    const raw = await response.text();
    const result = JSON.parse(raw);
    console.log('result: ', result.items);
    const titleList = result.items.map((item) => ({
      title: item.title,
      htmlUrl: item.html_url,
    }));

    return { titleList, totalCount: result.total_count };
  } catch (error) {
    throw new Error(error.message);
  }
};
