import styles from './index.less';
import { Rate } from 'antd';
import _ from 'lodash';
import PageTitle from '@/components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'umi';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { getMovie } from '@/models/movie';
import moment from 'moment';
import { getPathName } from '@/utils';
import notReady from '../../../public/img/not-ready.svg';
import { PageLoading } from '@/components';

const crewSortRank: any = {
  Director: 1,
  Screenplay: 2,
};

export default function IndexPage({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { entities, status } = useSelector((state: RootState) => state.movie);
  useEffect(() => {
    dispatch(getMovie({ id }));
  }, []);
  const data = entities[id];
  if (!data) return <PageLoading />;
  const {
    backdrop_path,
    poster_path,
    title,
    genres,
    release_date,
    release_dates = { results: [] },
    runtime,
    tagline,
    vote_average,
    vote_count,
    overview,
    name,
    credits: { cast, crew },
  } = data;

  const releaseInfo = release_dates.results.find((o) => o.iso_3166_1 === 'US');
  const { certification } =
    releaseInfo?.release_dates?.find((o) => o.certification) ||
    releaseInfo?.release_dates?.[0] ||
    {};

  return (
    <div>
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
            {title} {release_date && `(${moment(release_date).format('YYYY')})`}
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
                <span className="section">{runtime} minutes</span>
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
              crew.filter((o) => ['Director', 'Screenplay'].includes(o.job)),
              (o) => crewSortRank[o.job],
            ).map((o, i) => {
              return (
                <div key={i}>
                  <span>{o.name}</span>
                  <span>{o.job}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.castcrew}>
        <section>
          <h1>Cast {cast.length}</h1>
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
    </div>
  );
}