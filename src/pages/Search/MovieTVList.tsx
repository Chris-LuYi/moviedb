import { getPathName } from '@/utils';
import { Link } from 'umi';
import notFound from '../../../public/img/not-ready.svg';
import moment from 'moment';

export default ({ list, type }: { list: any[]; type: 'movie' | 'tv' }) => {
  return (
    <>
      {list.map((o) => {
        const date = o.release_date || o.first_air_date;
        return (
          <div className="movietv" key={o.id}>
            <Link to={`/${type}/${o.id}/${getPathName(o.title)}`}>
              <img
                src={
                  o.poster_path
                    ? `${GLOBAL_CONFIG.imgServer}/t/p/w94_and_h141_bestv2${o.poster_path}`
                    : notFound
                }
              />
            </Link>
            <section>
              <Link to={`/${type}/${o.id}/${getPathName(o.title)}`}>
                <h3>{o.title || o.name}</h3>
              </Link>
              {date && (
                <span className="date">{moment(date).format('LL')}</span>
              )}
              <div className="overview">
                <p>{o.overview}</p>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
};
