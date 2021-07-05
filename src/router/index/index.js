const INDEX = [
  {
    path: '/',
    meta: {
      title: ''
    },
    redirect: '/index',
    component: () => import(/* webpackChunkName: "Index" */ '@/views/index/Index.vue'),
    children: [
      {
        path: 'index',
        meta: {
          title: ' '
        },
        component: () => import(/* webpackChunkName: "IndexIndex" */ '@/views/index/pages/Index.vue')
      }
    ]
  }
]

export default INDEX
