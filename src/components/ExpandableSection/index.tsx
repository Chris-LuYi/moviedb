import styles from './index.less';
import Icon from '@/components/Icon';
import { useState } from 'react';
import { useToggle } from 'ahooks';

const ExpandableSection = ({
  children,
  maxHeight = 200,
}: {
  children: React.ReactNode;
  maxHeight: any;
}) => {
  const [state, { toggle }] = useToggle(false);
  return (
    <div className={styles.root}>
      <div style={!state ? { maxHeight: maxHeight } : {}} className="content">
        {children}
      </div>
      <div
        className="more"
        onClick={() => {
          toggle();
        }}
      >
        {state ? (
          <>
            Show Less <Icon type="up" />
          </>
        ) : (
          <>
            Show More <Icon type="down" />
          </>
        )}
      </div>
    </div>
  );
};

export default ExpandableSection;
