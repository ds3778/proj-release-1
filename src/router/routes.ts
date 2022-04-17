import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AppPages/Home.vue') },
      { path: '/login', component: () => import('pages/AppPages/Login.vue') },
      { path: '/myinfo', component: () => import('pages/AppPages/MyInfo.vue') },
      {
        path: '/myrepos',
        component: () => import('pages/AppPages/MyRepos.vue'),
      },
      {
        path: '/repodetails',
        component: () => import('pages/AppPages/RepoDetails.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
