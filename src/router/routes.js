const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard/index.vue') },
      {
        path: 'slider',
        children: [
          { path: '', component: () => import('pages/slider/index.vue') },
          { path: 'add', component: () => import('pages/slider/add/index.vue') },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/not-found/index.vue'),
  },
]

export default routes
