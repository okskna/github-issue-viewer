import { CONSTANTS } from '../common/constants';

const getIssueList = async (username, reponame, page) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${reponame}/issues?per_page=${CONSTANTS.PER_PAGE}&page=${page}`,
      requestOptions
    );
    const raw = await response.text();
    const result = JSON.parse(raw);
    const titleList = result.map((item) => item.title);

    console.log(titleList);
    return titleList;
  } catch (error) {
    console.log('Fail to fetch issue count', error);
  }
};

export default getIssueList;
