import ProCard from '@ant-design/pro-card';
import { chunk } from 'lodash';
import { useEffect, useRef } from 'react';
import { Carousel, Radio } from 'antd';
import MoviePost from './MoviePost';
import styles from './index.less';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { getTrendingList } from '@/models/home';
import Icon from '@/components/Icon';

export default ({
  title,
  filter,
  type,
}: {
  title: string;
  filter?: React.ReactNode;
  type: MovieChannelType;
}) => {
  const { entities, status } = useSelector((state: RootState) => state.home);
  const { data } = entities[type];
  const ref = useRef<any>();

  return (
    <ProCard className={styles.panel}>
      <h1 className={styles.h1}>
        <span>{title}</span>
        {filter}
      </h1>
      <div className={styles.next} onClick={ref.current?.next}>
        <Icon type="right" />
      </div>
      <div className={styles.prev} onClick={ref.current?.prev}>
        <Icon type="left" />
      </div>
      <Carousel ref={ref} dots={false}>
        {chunk(data, 5).map((sub, i) => {
          return (
            <div key={i}>
              <div className={styles.group}>
                {sub.map((m) => {
                  //@ts-ignore
                  return <MoviePost key={m.id} data={m} />;
                })}
              </div>
            </div>
          );
        })}
      </Carousel>
    </ProCard>
  );
};
