import styles from './index.less';
import { Modal, Rate } from 'antd';
import _ from 'lodash';
import PageTitle from '@/components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'umi';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { getMovie } from '@/models/movie';
import moment from 'moment';
import { getPathName } from '@/utils';
import notReady from '../../../public/img/not-ready.svg';
import { PageLoading } from '@/components';
import Icon from '@/components/Icon';
import Video from './Video';
const crewSortRank: any = {
  Creator: 0,
  Director: 1,
  Screenplay: 2,
};

export default function IndexPage(props) {
  const {
    match: {
      path,
      params: { id },
    },
  } = props;

  const dispatch = useDispatch();
  const { entities, status } = useSelector((state: RootState) => state.movie);
  const type = path.substring(1, path.indexOf('/', 1));
  useEffect(() => {
    dispatch(getMovie({ id, type }));
  }, []);
  const data = entities[id];
  if (!data) return <PageLoading />;
  const {
    backdrop_path,
    poster_path,
    title,
    genres,
    first_air_date,
    release_date,
    release_dates = { results: [] },
    content_ratings,
    runtime,
    tagline,
    vote_average,
    vote_count,
    overview,
    name,
    credits: { cast, crew },
    created_by,
    episode_run_time,
    videos,
  } = data;
  const releaseInfo = release_dates.results.find((o) => o.iso_3166_1 === 'US');
  let { certification } =
    releaseInfo?.release_dates?.find((o) => o.certification) ||
    releaseInfo?.release_dates?.[0] ||
    {};
  if (type === 'tv') {
    certification = content_ratings.results.find((o) => o.iso_3166_1 === 'US')
      ?.rating;
  }

  return (
    <div className={styles.root}>
      <PageTitle title={name || title} />
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${GLOBAL_CONFIG.imgServer}/t/p/w1920_and_h800_multi_faces${backdrop_path})`,
        }}
      >
        <div></div>
      </div>
      <div className={styles.overview}>
        <img
          src={
            poster_path
              ? `${GLOBAL_CONFIG.imgServer}/t/p/w300_and_h450_bestv2${poster_path}`
              : notReady
          }
        />
        <div className={styles.overviewContent}>
          <h1>
            {title || name}{' '}
            {release_date && `(${moment(release_date).format('YYYY')})`}
            {first_air_date && `(${moment(first_air_date).format('YYYY')})`}
          </h1>

          {certification && (
            <>
              <h3>
                <span className="certification">{certification}</span>{' '}
                <span className="section">
                  {moment(release_date).format('L')}(US)
                </span>
                <span className="section">
                  {genres.map((o, i) => (
                    <span key={o.id}>
                      <Link to={`/genre/${o.id}-${o.name.toLowerCase()}/movie`}>
                        {o.name}
                      </Link>
                      {i !== genres.length - 1 && ', '}
                    </span>
                  ))}
                </span>
                <span className="section">
                  {runtime || episode_run_time[0]} minutes
                </span>
              </h3>
            </>
          )}
          <section>
            <Rate
              count={5}
              disabled
              allowHalf
              tooltips={['2', '4', '6', '8', '10']}
              value={Math.round(vote_average * 2) / 4}
            />
            {vote_count > 0 && (
              <span className="rate">
                {vote_average} by {vote_count} users
              </span>
            )}
          </section>
          {tagline && <p className="tagline">{tagline}</p>}

          <h2 style={{ marginTop: 10, marginBottom: 0 }}>Overview</h2>
          <div className="description">{overview}</div>

          <div className="crew">
            {_.sortBy(
              crew.filter((o) =>
                ['Creator', 'Director', 'Screenplay'].includes(o.job),
              ),
              (o) => crewSortRank[o.job],
            ).map((o, i) => {
              return (
                <div key={i}>
                  <span>{o.name}</span>
                  <span>{o.job}</span>
                </div>
              );
            })}
            {created_by &&
              created_by.map((o, i) => {
                return (
                  <div key={i}>
                    <span>{o.name}</span>
                    <span>Creator</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Video dataSource={videos?.results} />
      {cast.length > 0 && (
        <div className={styles.castcrew}>
          <section>
            <h2>Cast {cast.length}</h2>
            <div className={styles.casts}>
              {cast.map((o) => {
                const { profile_path, name, character, id: pid } = o;
                return (
                  <div key={pid}>
                    <Link
                      className="avatar"
                      to={`/person/${pid}/${getPathName(name)}`}
                    >
                      {profile_path ? (
                        <img
                          src={`${GLOBAL_CONFIG.imgServer}/t/p/w138_and_h175_face${profile_path}`}
                        />
                      ) : (
                        <span className="no-photo" />
                      )}
                    </Link>
                    <Link to={`/person/${pid}/${getPathName(name)}`}>
                      <span className="bold">{name}</span>
                    </Link>
                    <span>{character}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
