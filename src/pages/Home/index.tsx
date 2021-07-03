import ProCard from '@ant-design/pro-card';
import { Carousel, Radio, Input } from 'antd';
import { chunk } from 'lodash';
import useHome from './hook';
import styles from './index.less';
import MoviePost from './MoviePost';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { getTrendingList } from '@/models/home';
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
      <ProCard gutter={[16, 16]} wrap ghost>
        <section className={styles.banner}>
          <div className="title">
            <h2>Welcome.</h2>
            <h3>
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
          </div>
          <Input.Search
            placeholder="Search for a movie, tv show, person......"
            enterButton="Search"
            size="large"
            className="search"
            onSearch={() => {}}
          />
        </section>

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

        <MoviePanel
          title="What's Popular"
          type="popular"
          filter={
            <Radio.Group
              defaultValue="day"
              buttonStyle="outline"
              onChange={(e) =>
                searchTrending({
                  platform: e.target.value,
                  category: 'popular',
                })
              }
            >
              <Radio.Button value="movie">Streaming</Radio.Button>
              <Radio.Button value="tv">On TV</Radio.Button>
              <Radio.Button value="week">For Rent</Radio.Button>
              <Radio.Button value="week">In Theaters</Radio.Button>
            </Radio.Group>
          }
        />
      </ProCard>
    </div>
  );
};

export default Home;
