export const getPathName = (url: string) => {
  return url.replace(/\W+(?!$)/g, '-').toLowerCase();
};
