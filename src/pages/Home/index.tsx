import ProCard from '@ant-design/pro-card';
import { Radio, Input } from 'antd';
import styles from './index.less';
import { useDispatch } from 'react-redux';
import { getTrendingList } from '@/models/home';
import { PageTitle, Search } from '@/components';
import { history } from 'umi';

import { useEffect } from 'react';

import MoviePanel from './MoviePanel';
const Home = () => {
  const dispatch = useDispatch();
  const searchTrending = (payload: {
    type?: 'day' | 'week';
    category: MovieChannelType;
    platform?: 'tv' | 'movie';
  }) => dispatch(getTrendingList(payload));
  useEffect(() => {
    searchTrending({
      category: 'trending',
      type: 'day',
    });

    searchTrending({
      category: 'popular',
      platform: 'movie',
    });
  }, []);
  return (
    <div>
      <PageTitle title={GLOBAL_CONFIG.site} replace />

      <ProCard gutter={[16, 16]} wrap ghost>
        <section className={styles.banner}>
          <div className="title">
            <h2>Welcome.</h2>
            <h3>
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
          </div>
          <Search />
        </section>
        <MoviePanel
          title="What's Popular"
          type="popular"
          filter={
            <Radio.Group
              defaultValue="movie"
              buttonStyle="outline"
              onChange={(e) =>
                searchTrending({
                  platform: e.target.value,
                  category: 'popular',
                })
              }
            >
              <Radio.Button value="movie">Movie</Radio.Button>
              <Radio.Button value="tv">TV</Radio.Button>
            </Radio.Group>
          }
        />
        <MoviePanel
          title="Trending"
          type="trending"
          filter={
            <Radio.Group
              defaultValue="day"
              buttonStyle="outline"
              onChange={(e) =>
                searchTrending({
                  type: e.target.value,
                  category: 'trending',
                })
              }
            >
              <Radio.Button value="day">Today</Radio.Button>
              <Radio.Button value="week">This Week</Radio.Button>
            </Radio.Group>
          }
        />
      </ProCard>
    </div>
  );
};

export default Home;
