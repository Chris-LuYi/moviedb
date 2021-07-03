import { useEffect, useState } from 'react';
import request, { extend } from 'umi-request';

export default () => {
  const [trendingList, setTrendingList] = useState([]);
  useEffect(() => {
    request('/3/trending/all/day').then((r) => {
      setTrendingList(r?.results || []);
      console.log(r);
    });
  }, []);

  return { trendingList };
};
