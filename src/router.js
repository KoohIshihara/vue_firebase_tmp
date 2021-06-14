import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/sign-in'
    },
    {
      path: '/tmp',
      name: 'tmp',
      component: () =>
        import('@/views/TmpWithModal')
    },
    {
      path: '/tmp/:id1',
      name: 'tmp_detail',
      props: true,
      component: () =>
        import('@/views/TmpWithModal')
    },
    {
      path: '/tmp/:id1/:id2',
      name: 'tmp_detail2',
      props: true,
      component: () =>
        import('@/views/TmpWithModal')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      props: true,
      component: () =>
        import('@/views/SignIn')
    },
    {
      path: '/sign-in/:redirectPath',
      name: 'sign-in',
      props: true,
      component: () =>
        import('@/views/SignIn')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      props: true,
      component: () =>
        import('@/views/SignIn')
    },
    {
      path: '/sign-up/:redirectPath',
      name: 'sign-up',
      props: true,
      component: () =>
        import('@/views/SignIn')
    }
  ]
})
