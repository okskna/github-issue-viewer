const isValidUrl = (url) => {
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

  return {
    username,
    reponame,
    error: null,
  };
};
