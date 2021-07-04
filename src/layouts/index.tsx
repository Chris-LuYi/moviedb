import React, { useState } from 'react';
import { Provider } from 'react-redux';

import ProLayout, { PageLoading } from '@ant-design/pro-layout';
import { Input } from 'antd';
import { history, Link } from 'umi';
import Icon from '@/components/Icon';
import styles from './index.less';
import request from 'umi-request';
import store from '../store';
import PageTitle from '@/components/PageTitle';
const myLink = 'https://github.com/Chris-LuYi/moviedb';
request.use(async (ctx, next) => {
  if (!ctx.req.url.startsWith('http'))
    ctx.req.url = 'https://api.themoviedb.org' + ctx.req.url;
  // @ts-ignore
  ctx.req.options.headers.authorization =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTExOWVmMjM5ZGE1ZGJjZWVhNTc5NjJiMmY2NmVkNiIsInN1YiI6IjYwZGY0MDk2MzQ0YThlMDA3NTNjNzg1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.97HA_X5bIIQ_vjrXCYkltOj2tdhKecHIzox3az00-p8';
  // @ts-ignore
  if (!ctx.req.options.headers['Content-Type']) {
    // @ts-ignore
    ctx.req.options.headers['Content-Type'] = 'application/json;charset=utf-8';
  }
  await next();
});

export default ({ children, ...restProps }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PageTitle title={restProps.route?.name} />
      <div className={styles.root}>
        <ProLayout
          // logo={
          //   <Link to="/">
          //     <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" />
          //   </Link>
          // }
          title=""
          disableContentMargin
          {...restProps}
          // iconfontUrl="//at.alicdn.com/t/font_2525112_yoduxgmnuqp.js"
          // rightContentRender={({ collapsed }) => (
          //   <div className="header-top-right">
          //     <Input.Search
          //       onSearch={(val) => {
          //         if (val) history.push('/search/' + val);
          //       }}
          //     />
          //   </div>
          // )}
          layout="top"
          headerRender={() => {
            return (
              <section className={styles.header}>
                <Link to="/">
                  <img
                    className="logo"
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
                  />
                </Link>
                <div className="header-top-right">
                  <a target="_blank" href={myLink}>
                    <Icon type="github-fill" />
                  </a>
                  <Input.Search
                    onSearch={(val) => {
                      if (val) history.push('/search/' + val);
                    }}
                  />
                </div>
              </section>
            );
          }}
          // menuItemRender={(menuItemProps, defaultDom) => {
          //   if (
          //     menuItemProps.isUrl ||
          //     !menuItemProps.path ||
          //     location.pathname === menuItemProps.path
          //   ) {
          //     return (
          //       <>
          //         <Icon type={menuItemProps.img} />
          //         {defaultDom}
          //       </>
          //     );
          //   }
          //   return (
          //     <Link to={menuItemProps.path}>
          //       <Icon type={menuItemProps.img} />
          //       {defaultDom}
          //     </Link>
          //   );
          // }}
          footerRender={() => {
            return (
              <footer className={styles.footer}>
                © 2021 by{' '}
                <a target="_blank" href={myLink}>
                  Chris Lu Yi
                </a>
              </footer>
            );
          }}
          fixedHeader
        >
          {children}
        </ProLayout>
      </div>
    </Provider>
  );
};
