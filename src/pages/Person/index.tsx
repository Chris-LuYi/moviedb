import styles from './index.less';
import { Timeline } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'umi';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { getSingle } from '@/models/person';
import moment from 'moment';
import { getPathName } from '@/utils';
import _ from 'lodash';
import { PageTitle, PageLoading } from '@/components';
import notFoundPerson from '../../../public/img/no-photo-male.svg';

export default function IndexPage({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { entities, status } = useSelector((state: RootState) => state.person);
  useEffect(() => {
    dispatch(getSingle({ id }));
  }, []);
  const data = entities[id];
  if (!data) return <PageLoading />;
  const {
    profile_path,
    known_for_department,
    gender,
    deathday,
    birthday,
    place_of_birth,
    also_known_as,
    name,
    biography,
    movie_credits: { cast, crew },
    tv_credits: { cast: tvcast, crew: tvcrew },
  } = data;

  const totalCast = cast.concat(tvcast).map((o) => {
    const m = moment(o.release_date || o.first_air_date);
    return {
      ...o,
      commonName: o.title || o.name,
      year: m.isValid() ? m.format('YYYY') : 'Coming',
    };
  });

  const groupYears = _.groupBy(totalCast, 'year');
  return (
    <div className={styles.root}>
      <PageTitle title={name} />

      <div className={styles.personInfo}>
        <div>
          <img
            src={
              profile_path
                ? `${GLOBAL_CONFIG.imgServer}/t/p/w300_and_h450_bestv2${profile_path}`
                : notFoundPerson
            }
          />
        </div>
        <div>
          <h1>Person Info</h1>
          <section className="description">
            <p>
              <strong>
                <bdi>Known For</bdi>
              </strong>
              {known_for_department || '-'}
            </p>
            <p>
              <strong>
                <bdi>Gender</bdi>
              </strong>
              {gender === 1 ? 'Female' : gender === 2 ? 'Male' : '-'}
            </p>
            <p>
              <strong>
                <bdi>Birthday</bdi>
              </strong>
              {birthday
                ? `${moment(birthday).format('LL')} (${moment(
                    deathday || new Date(),
                  ).diff(birthday, 'years', false)} years old)`
                : '-'}
            </p>
            <p>
              <strong>
                <bdi>Place of Birth</bdi>
              </strong>
              {place_of_birth || '-'}
            </p>
            <p>
              <strong>
                <bdi>Also Known As</bdi>
              </strong>
              {also_known_as.length > 0 ? (
                <ul>
                  {also_known_as.map((o) => {
                    return <li key={o}>{o}</li>;
                  })}
                </ul>
              ) : (
                '-'
              )}
            </p>
          </section>
        </div>
      </div>
      <div className={styles.info}>
        <h1>{name}</h1>
        <h4>Biography</h4>
        <div style={{ marginBottom: 20 }}>
          {biography
            ? biography.split(/\n/g).map((o, i) => <p key={i}>{o}</p>)
            : `We don't have a biography for ${name}.`}
        </div>
        {totalCast.length > 0 && (
          <>
            <h4>Known For</h4>
            <div className="know-for">
              <ul>
                {_.sortBy(
                  totalCast.filter((o) => o.poster_path),
                  (o) => o.popularity,
                )
                  .reverse()
                  .slice(0, 10)
                  .map(({ poster_path, title, commonName, id }) => {
                    return (
                      <li key={`${id}${commonName}`}>
                        <div>
                          <Link
                            to={`/${title ? 'movie' : 'tv'}/${id}/${getPathName(
                              commonName,
                            )}`}
                          >
                            <img
                              src={`${GLOBAL_CONFIG.imgServer}/t/p/w150_and_h225_bestv2${poster_path}`}
                            />
                          </Link>

                          <p>{commonName}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </>
        )}
        {Object.entries(groupYears).length > 0 && (
          <>
            <h4>Acting</h4>
            <div className="timeline">
              <Timeline>
                {_.sortBy(Object.keys(groupYears))
                  .reverse()
                  .map((o, i) => {
                    const works = groupYears[o];
                    return (
                      <Timeline.Item dot={o || '-'} key={o}>
                        {works.map((w) => {
                          const {
                            id,
                            title,
                            commonName,
                            character,
                            episode_count,
                          } = w;

                          return (
                            <p key={`${id}${commonName}`}>
                              <Link
                                to={`/${
                                  title ? 'movie' : 'tv'
                                }/${id}/${getPathName(commonName)}`}
                              >
                                {commonName}
                              </Link>
                              {episode_count && (
                                <span>
                                  ({episode_count} episode
                                  {episode_count > 1 ? 's' : ''})
                                </span>
                              )}
                              {character && <span>as </span>}
                              {character}
                            </p>
                          );
                        })}
                      </Timeline.Item>
                    );
                  })}
              </Timeline>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
