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
        path: 'header-menu',
        children: [{ path: '', component: () => import('pages/header-menu/index.vue') }],
      },
      {
        path: 'footer-menu',
        children: [{ path: '', component: () => import('pages/footer-menu/index.vue') }],
      },
      {
        path: 'homepage-settings',
        children: [{ path: '', component: () => import('pages/homepage-settings/index.vue') }],
      },
      {
        path: 'gallery',
        children: [{ path: '', component: () => import('pages/gallery/index.vue') }],
      },
      {
        path: 'pdf',
        children: [{ path: '', component: () => import('pages/pdf/index.vue') }],
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
      {
        path: 'step-page',
        children: [{ path: '', component: () => import('pages/step-page/index.vue') }],
      },
      {
        path: 'news',
        children: [{ path: '', component: () => import('pages/news/index.vue') }],
      },
      {
        path: 'physician',
        children: [{ path: '', component: () => import('pages/physician/index.vue') }],
      },
      {
        path: 'vlog',
        children: [{ path: '', component: () => import('pages/vlog/index.vue') }],
      },
      {
        path: 'unit',
        children: [{ path: '', component: () => import('pages/unit/index.vue') }],
      },
      {
        path: 'doctor',
        children: [{ path: '', component: () => import('pages/doctor/index.vue') }],
      },
      {
        path: 'service',
        children: [{ path: '', component: () => import('pages/service/index.vue') }],
      },
      {
        path: 'page',
        children: [{ path: '', component: () => import('pages/page/index.vue') }],
      },
      {
        path: 'user',
        children: [{ path: '', component: () => import('pages/user/index.vue') }],
      },
      {
        path: 'redirect',
        children: [{ path: '', component: () => import('pages/redirect/index.vue') }],
      },
      {
        path: 'reference',
        children: [{ path: '', component: () => import('pages/reference/index.vue') }],
      },
      {
        path: 'cooperation',
        children: [{ path: '', component: () => import('pages/cooperation/index.vue') }],
      },
      {
        path: 'online-forms',
        children: [{ path: '', component: () => import('pages/online-forms/index.vue') }],
      },
      {
        path: 'observer-physician-forms',
        children: [
          { path: '', component: () => import('pages/observer-physician-forms/index.vue') },
        ],
      },
      {
        path: 'settings',
        children: [{ path: '', component: () => import('pages/settings/index.vue') }],
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
