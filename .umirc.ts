import { defineConfig } from 'umi';
import { join } from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // mfsu: {},
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          img: 'home',
          name: 'Home',
          component: '@/pages/Home',
        },
        {
          path: '/movies',
          img: 'Youtube',
          name: 'Movies',
          component: './UnderDevelopment',
        },
        {
          path: '/tv',
          img: 'Youtube-fill',
          name: 'TV',
          component: './UnderDevelopment',
        },
        { path: '/movie/:id/:name', component: '@/pages/Detail' },
        { path: '/person/:id/:name', component: '@/pages/Person' },
        {
          component: './404',
        },
      ],
    },
  ],
  fastRefresh: {},
  theme: {
    'font-family': 'Roboto',
    'text-color': '#fff',
  },
  define: {
    GLOBAL_CONFIG: {
      imgServer: 'https://www.themoviedb.org',
      site: '— A TMDb Learning Site',
    },
  },
});
