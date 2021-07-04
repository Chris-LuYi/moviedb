export const getPathName = (url: string = '') => {
  return url.replace(/\W+(?!$)/g, '-').toLowerCase();
};
const globalTimeout = global.setTimeout;
export const sleep = async (timeout = 0) => {
  await new Promise((resolve) => globalTimeout(resolve, timeout));
};
