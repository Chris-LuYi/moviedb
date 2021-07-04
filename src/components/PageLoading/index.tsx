import { PageLoading } from '@ant-design/pro-layout';
import { Skeleton } from 'antd';

export default () => {
  return (
    <div style={{ marginTop: 150 }}>
      <Skeleton active />
      <br />
      <Skeleton active />
      <br />
      <br />
      <Skeleton active />
    </div>
  );
};
