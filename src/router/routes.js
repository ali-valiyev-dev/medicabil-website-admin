const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard/index.vue') },
      {
        path: 'slider',
        children: [{ path: '', component: () => import('pages/slider/index.vue') }],
      },
      {
        path: 'faq',
        children: [{ path: '', component: () => import('pages/faq/index.vue') }],
      },
      {
        path: 'center-of-excellence',
        children: [{ path: '', component: () => import('pages/center-of-excellence/index.vue') }],
      },
      {
        path: 'blog',
        children: [{ path: '', component: () => import('pages/blog/index.vue') }],
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
