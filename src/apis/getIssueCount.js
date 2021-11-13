const getIssueCount = async (username, reponame) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://api.github.com/search/issues?q=repo:${username}/${reponame}%20is:issue`,
      requestOptions
    );
    const raw = await response.text();
    const result = JSON.parse(raw);
    const totalCount = result.total_count;

    return totalCount;
  } catch (error) {
    console.log('Fail to fetch issue count', error);
  }
};

export default getIssueCount;
