import Icon from '@/components/Icon';
import { Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

export default ({ dataSource }) => {
  const [currentVideo, setCurrentVideo] = useState();
  const ref = useRef();
  if (!dataSource) return null;
  useEffect(() => {
    if (ref.current) ref.current.height = window.innerHeight - 200;
  }, [currentVideo]);
  return (
    <div className={styles.video}>
      <h1>Video {dataSource.length}</h1>

      <div>
        {dataSource.map((o) => {
          return (
            <div className="play" key={o.id}>
              <img src={`https://i.ytimg.com/vi/${o.key}/hqdefault.jpg`} />
              <div
                onClick={() => {
                  setCurrentVideo(o);
                }}
              >
                <Icon type="Youtube" />
              </div>
              <p title={o.name}>{o.name}</p>
            </div>
          );
        })}
      </div>

      <Modal
        visible={currentVideo}
        width="lg"
        footer={false}
        onCancel={() => {
          setCurrentVideo(undefined);
          if (ref.current)
            ref.current.src = `//www.youtube.com/embed/${currentVideo?.key}?autoplay=0`;
        }}
        className={styles.videoModal}
      >
        <iframe
          width="100%"
          ref={ref}
          src={`//www.youtube.com/embed/${currentVideo?.key}?autoplay=1`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </Modal>
    </div>
  );
};
