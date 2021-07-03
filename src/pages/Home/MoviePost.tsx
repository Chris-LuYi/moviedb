import { Rate, Skeleton } from 'antd';
import ProCard from '@ant-design/pro-card';
import { useSelector, useDispatch } from 'react-redux';

import styles from './index.less';
import { Link } from 'umi';
import moment from 'moment';

import { getPathName } from '@/utils';

export default (movieInfo: MoviePostInfo) => {
  const {
    id,
    title,
    name,
    poster_path,
    vote_average,
    release_date,
  } = movieInfo;
  return (
    <ProCard
      key={id}
      layout="center"
      ghost
      title={
        poster_path ? (
          <div className="poster-info">
            <div>
              <Rate
                count={5}
                disabled
                allowHalf
                tooltips={['2', '4', '6', '8', '10']}
                value={Math.round(vote_average * 2) / 4}
              />
              <span className="rate">{vote_average}</span>
            </div>
            <div className="poster-title">
              <Link to={`/movie/${id}/${getPathName(title || name)}`}>
                <span>{title || name}</span>
              </Link>
              <span className="poster-date">
                {moment(release_date).format('LL')}
              </span>
            </div>
          </div>
        ) : (
          <Skeleton active paragraph={{ rows: 1 }} />
        )
      }
      className={styles.poster}
    >
      <div className={styles.wrap}>
        {poster_path ? (
          <Link to={`/movie/${id}/${getPathName(title || name)}`}>
            <img
              src={
                'https://www.themoviedb.org/t/p/w220_and_h330_face/' +
                poster_path
              }
            />
          </Link>
        ) : (
          <>
            <Skeleton.Image style={{ width: '100%' }} />
          </>
        )}
      </div>
    </ProCard>
  );
};
