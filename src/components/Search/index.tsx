import { Input } from 'antd';
import { history } from 'umi';
import styles from './index.less';
export default (props) => {
  return (
    <Input.Search
      placeholder="Search for a movie, tv show, person......"
      enterButton="Search"
      size="large"
      className={styles.search}
      onSearch={(val) => {
        if (val) history.push('/search/' + val);
      }}
      {...props}
    />
  );
};
