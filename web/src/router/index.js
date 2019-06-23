import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'
import userRouter from './modules/user'

/**
* hidden: true                   如果' hidden:true '不会在侧边栏显示(默认为false)
* alwaysShow: true               如果设置为true，将始终显示根菜单，无论它的子路径长度是多少
*                                如果不设alwaysShow，只会有不止一条的路线下的孩子
*                                它将变成嵌套模式，否则不会显示根菜单
* redirect: noredirect           如果“重定向:noredirect”将不会在面包屑中重定向
* name:'router-name'             这个名字是由<keep-alive>(必须设置!!!)
* meta : {
    title: 'title'               名称显示在子菜单和面包屑中(推荐设置)
    icon: 'svg-name'             图标显示在侧边栏，
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    redirect: '/monitor/list'
  },

  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/list',
    meta: {
      title: '监控列表',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        name: 'monitorList',
        component: () => import('@/views/monitor/list'),
        meta: { title: '监控列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'addMonitor',
        component: () => import('@/views/monitor/add'),
        meta: { title: '添加监控' },
        hidden: true
      },
      {
        path: 'edit',
        name: 'editMonitor',
        component: () => import('@/views/monitor/edit'),
        meta: { title: '编辑监控' },
        hidden: true
      }
    ]
  },
  {
    path: '/errotInfo',
    component: Layout,
    redirect: '/errotInfo/list',
    meta: { title: '监控列表', icon: 'table' },
    children: [
      {
        path: 'list',
        name: 'errotInfoList',
        component: () => import('@/views/errotInfo/list'),
        meta: { title: '错误信息', icon: 'table' }
      }
    ]
  },
  userRouter,
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
