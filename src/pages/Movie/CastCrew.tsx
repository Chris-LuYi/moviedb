import styles from './index.less';
import { ExpandableSection } from '@/components';
import { Link } from 'umi';
import { getPathName } from '@/utils';

export default ({ title, data }) => {
  return (
    <div className={styles.castcrew}>
      <section>
        <h2>
          {title} {data.length}
        </h2>
        <ExpandableSection maxHeight={540}>
          <div className={styles.casts}>
            {data.map((o) => {
              const { profile_path, name, character, id: pid, job } = o;
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
                  <span>{character || job}</span>
                </div>
              );
            })}
          </div>
        </ExpandableSection>
      </section>
    </div>
  );
};
