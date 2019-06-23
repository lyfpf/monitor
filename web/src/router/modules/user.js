import Layout from '../../views/layout/Layout'

const asyncRouterMap = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    // 用户列表
    {
      path: 'list',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: { title: '用户列表', icon: 'user', permission: '/user/list' }
    },
    {
      path: 'addUser',
      name: 'addUser',
      component: () => import('@/views/user/addUser'),
      meta: { title: '添加用户', permission: '/user/addUser' },
      hidden: true
    },
    {
      path: 'editUser',
      name: 'editUser',
      component: () => import('@/views/user/editUser'),
      meta: { title: '用户信息', permission: '/user/editUser' },
      hidden: true
    }
  ]
}

export default asyncRouterMap
