import ProCard from '@ant-design/pro-card';
import { chunk } from 'lodash';
import { useEffect } from 'react';
import { Carousel, Radio } from 'antd';
import MoviePost from './MoviePost';
import styles from './index.less';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { getTrendingList } from '@/models/home';

export default ({
  title,
  filter,
  type,
}: {
  title: string;
  filter: React.ReactNode;
  type: MovieChannelType;
}) => {
  const dispatch = useDispatch();
  const { entities, status } = useSelector((state: RootState) => state.home);
  const { data } = entities[type];

  return (
    <ProCard>
      <h1 className={styles.h1}>
        <span>{title}</span>
        {filter}
      </h1>
      <Carousel dotPosition="right" dots={status[type] === 'idle'}>
        {chunk(data, 5).map((sub, i) => {
          return (
            <div key={i}>
              <div className={styles.group}>
                {sub.map((m) => {
                  return <MoviePost {...m} />;
                })}
              </div>
            </div>
          );
        })}
      </Carousel>
    </ProCard>
  );
};
