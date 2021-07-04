import { PageLoading } from '@ant-design/pro-layout';
import { Skeleton } from 'antd';
import styles from './index.less';
export default () => {
  return (
    <div className={styles.root}>
      <Skeleton active />
      <br />
      <Skeleton active />
      <br />
      <br />
      <Skeleton active />
    </div>
  );
};
