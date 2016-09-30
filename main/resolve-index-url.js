const resolveIndexUrl = () => {
  if(__DEV__) {
    return process.env.INDEX_URL;
  } else {
    return `file://${__dirname}/index.html`;
  }
};

export default resolveIndexUrl;
