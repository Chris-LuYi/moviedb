import styles from './index.less';
import { Result } from 'antd';
import Icon from '@/components/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'umi';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { searchMulti } from '@/models/search';
import { getPathName } from '@/utils';
import _ from 'lodash';
import { PageLoading, PageTitle, Search } from '@/components';
import MovieTVList from './MovieTVList';
import notFoundPerson from '../../../public/img/no-photo-male.svg';

export default function IndexPage({
  match: {
    params: { query },
  },
}) {
  const dispatch = useDispatch();
  const { entities } = useSelector((state: RootState) => state.search);
  useEffect(() => {
    dispatch(searchMulti({ query }));
  }, [query]);
  const current = entities[query]?.data;
  if (!current) return <PageLoading />;

  const { results } = current;

  const groupResult = _.groupBy(results, (o) => o.media_type);
  return (
    <div className={styles.root}>
      <PageTitle title={query} />
      <section className="search">
        <Search defaultValue={query} />
      </section>
      <section className={styles.category}>
        <ul>
          <li>All</li>
          <li>People</li>
          <li>Movie</li>
          <li>TV Shows</li>
        </ul>
      </section>
      <div className={styles.list}>
        {results.length > 0 ? (
          <>
            {groupResult['person'] && (
              <section>
                <h1>People</h1>
                {groupResult['person'].map((o) => {
                  return (
                    <div className="person" key={o.id}>
                      <Link to={`/person/${o.id}/${getPathName(o.name)}`}>
                        <img
                          src={
                            o.profile_path
                              ? `${GLOBAL_CONFIG.imgServer}/t/p/w90_and_h90_face${o.profile_path}`
                              : notFoundPerson
                          }
                        />
                      </Link>
                      <section>
                        <Link to={`/person/${o.id}/${getPathName(o.name)}`}>
                          <h3>{o.name}</h3>
                        </Link>

                        <p>
                          {o.known_for_department} •{' '}
                          {o.known_for.map((k, i) => (
                            <span key={k.id}>
                              <Link
                                to={
                                  k.media_type === 'tv'
                                    ? `/tv/${k.id}/${getPathName(k.name)}`
                                    : `/movie/${k.id}/${getPathName(k.title)}`
                                }
                              >
                                {k.name || k.title}
                              </Link>
                              {i !== o.known_for.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </p>
                      </section>
                    </div>
                  );
                })}
              </section>
            )}
            {groupResult['movie'] && (
              <section>
                <h1>Movies</h1>
                <MovieTVList list={groupResult['movie']} type="movie" />
              </section>
            )}
            {groupResult['tv'] && (
              <section>
                <h1>TV Shows</h1>
                <MovieTVList list={groupResult['tv']} type="tv" />
              </section>
            )}
          </>
        ) : (
          <Result
            icon={<Icon type="frown" />}
            title="Sorry, I didn't found anything."
            // extra={<Button type="primary">Next</Button>}
          />
        )}
      </div>
    </div>
  );
}
