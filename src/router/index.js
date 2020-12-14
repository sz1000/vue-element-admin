import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
* alwaysShow: true               当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                 若你想不管路由下面的 children 声明的个数都显示你的根路由
                                 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
* redirect: noredirect           当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    roles: ['admin', 'editor']   设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    meta: { title: '首页', icon: 'example' },
    // hidden: ,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/homePage',
    component: Layout,
    redirect: '/homePage',
    name: 'home',
    meta: { title: '小程序配置', icon: 'example' },
    // hidden: ,
    children: [
      {
        path: 'edit',
        // hidden: true,
        component: () => import('@/views/homePageEdit/edit')
      },
      {
        path: 'list',
        hidden: true,
        component: () => import('@/views/homePageEdit/index')
      }]
  },
  {
    path: '/hospitalIntro',
    component: Layout,
    name: 'hospitalIntro',
    meta: { title: '医院简介', icon: 'example' },
    // hidden: ,
    children: [{
      path: 'edit',
      component: () => import('@/views/hospitalIntro/index')
    }]
  },
  // 订单管理
  {
    path: '/orderForm',
    component: Layout,
    redirect: '/orderForm',
    name: 'orderForm',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        name: 'list',
        meta: { title: '全部订单', icon: 'example' },
        path: 'list',
        component: () => import('@/views/orderForm/index')
      },
      {
        name: 'cancel',
        meta: { title: '已取消', icon: 'example' },
        path: '/cancel',
        hidden: true,
        component: () => import('@/views/orderForm/cancel')
      },
      {
        name: 'consumed',
        meta: { title: '已核销', icon: 'example' },
        path: '/consumed',
        hidden: true,
        component: () => import('@/views/orderForm/consumed')
      },
      {
        name: 'paid',
        meta: { title: '已支付', icon: 'example' },
        path: '/paid',
        hidden: true,
        component: () => import('@/views/orderForm/paid')
      },
      {
        name: 'unpaid',
        meta: { title: '待支付', icon: 'example' },
        path: '/unpaid',
        hidden: true,
        component: () => import('@/views/orderForm/unpaid')
      },
      {
        name: 'reimburse',
        meta: { title: '已退款', icon: 'example' },
        path: '/reimburse',
        hidden: true,
        component: () => import('@/views/orderForm/reimburse')
      },
      // 订单管理的发货管理
      {
        name: 'goods',
        meta: { title: '发货管理', icon: 'example' },
        path: '/index',
        // hidden: true,
        component: () => import('@/views/goods/index')
      },
      // 发货管理页面子页面
      {
        name: 'unshipped',
        meta: { title: '待发货', icon: 'example' },
        path: '/unshipped',
        hidden: true,
        component: () => import('@/views/goods/unshipped')
      },

      {
        name: 'shipped',
        meta: { title: '已发货', icon: 'example' },
        path: '/shipped',
        hidden: true,
        component: () => import('@/views/goods/shipped')
      },
      {
        name: 'completed',
        meta: { title: '已完成', icon: 'example' },
        path: '/completed',
        hidden: true,
        component: () => import('@/views/goods/completed')
      },
      {
        name: 'refunded',
        meta: { title: '已退货', icon: 'example' },
        path: '/refunded',
        hidden: true,
        component: () => import('@/views/goods/refunded')
      }
    ]
  },
  // 商品页面
  {
    path: '/prodect',
    component: Layout,
    redirect: '/prodect',
    name: 'prodect',
    meta: { title: '商品列表', icon: 'example' },
    // hidden: ,
    children: [{
      path: 'list',
      component: () => import('@/views/product/index')
    },
    {
      path: 'add',
      hidden: true,
      component: () => import('@/views/product/add')
    },
    {
      path: 'edit/:id',
      hidden: true,
      component: () => import('@/views/product/add')
    }
    ]
  },
  // 文章管理
  {
    path: '/articels',
    component: Layout,
    redirect: 'articels',
    name: 'articels',
    meta: { title: '案例管理', icon: 'example' },
    // hidden: ,
    children: [{
      path: 'list',
      component: () => import('@/views/articles/index')
    },
    {
      name: 'article-add',
      hidden: true,
      path: 'add',
      component: () => import('@/views/articles/add')
    },
    {
      hidden: true,
      name: 'article-edit',
      path: 'edit/:type/:id',
      component: () => import('@/views/articles/add')
    }
    ]
  },
  // 类目管理
  {
    path: '/categories',
    component: Layout,
    redirect: 'categories',
    name: 'categories',
    meta: { title: '类目管理', icon: 'example' },
    // hidden: ,
    children: [{
      path: 'list',
      component: () => import('@/views/categories/index')
    },
    {
      hidden: true,
      path: 'add',
      component: () => import('@/views/categories/add')
    }
    ]
  },
  // 医生管理
  {
    path: '/doctor',
    component: Layout,
    redirect: 'doctor',
    name: 'doctor',
    meta: { title: '医生管理', icon: 'example' },
    // hidden: ,
    children: [{
      name: 'doctorList',
      path: 'list',
      component: () => import('@/views/doctor/index')
    },
    {
      name: 'addDoctor',
      hidden: true,
      path: 'add',
      component: () => import('@/views/doctor/add')
    },
    {
      name: 'editDoctor',
      hidden: true,
      path: 'edit/:id',
      component: () => import('@/views/doctor/add')
    }
    ]
  },
  // 销售管理
  // {
  //   path: '/sales',
  //   component: Layout,
  //   redirect: '/salesman',
  //   name: 'sales',
  //   meta: { title: '销售管理', icon: 'example' },
  //   children: [
  //     {
  //       name: 'salesman',
  //       meta: { title: '销售人员管理', icon: 'example' },
  //       path: '/salesman',
  //       component: () => import('@/views/sales/salesman')
  //     },
  //     {
  //       name: 'salesEarning',
  //       meta: { title: '会员分销设置', icon: 'example' },
  //       path: '/earning',
  //       component: () => import('@/views/sales/salesEarning')
  //     }]
  // },
  // 问诊管理
  {
    path: '/inquiry',
    component: Layout,
    redirect: '/inquiry/list',
    name: 'inquiry',
    meta: { title: '问诊管理', icon: 'example' },
    children: [
      {
        name: 'inquiryList',
        meta: { title: '问诊列表', icon: 'example' },
        path: '/inquiry/list',
        component: () => import('@/views/inquiry/index')
      },
      {
        name: 'inquirySetForm',
        meta: { title: '问诊设置', icon: 'example' },
        path: '/inquiry/setform',
        component: () => import('@/views/inquiry/setForm')
      },
      {
        name: 'inquiryAdd',
        hidden: true,
        path: '/inquiry/add',
        component: () => import('@/views/inquiry/addInquiry')
      }]
  },
  // 拼团
  {
    path: '/groupbuying',
    component: Layout,
    redirect: '/goupbuying/list',
    name: 'goupbuying',
    meta: { title: '拼团管理', icon: 'example' },
    children: [
      {
        name: 'goupbuyingList',
        meta: { title: '拼团管理', icon: 'example' },
        path: '/goupbuying/list',
        component: () => import('@/views/groupBuying/index')
      },
      {
        name: 'goupbuyingAdd',
        meta: { title: '新建拼团', icon: 'example' },
        path: '/goupbuying/add/:id',
        props: true,
        hidden: true,
        component: () => import('@/views/groupBuying/add')
      }
    ]
  },
  // 预约管理
  {
    path: '/appointment',
    component: Layout,
    redirect: '/appointment/list',
    name: 'appointment',
    meta: { title: '预约管理', icon: 'example' },
    children: [
      {
        name: 'appointmentList',
        meta: { title: '预约管理', icon: 'example' },
        path: '/appointment/list',
        component: () => import('@/views/appointment/index')
      },
      {
        name: 'appointmentAdd',
        meta: { title: '新增预约', icon: 'example' },
        hidden: true,
        path: '/appointment/add',
        component: () => import('@/views/appointment/add')
      }
    ]
  },
  // 客户管理
  {
    path: '/client',
    component: Layout,
    redirect: '/client/list',
    name: 'client',
    meta: { title: '客户管理', icon: 'example' },
    children: [
      {
        name: 'clientList',
        meta: { title: '客户管理', icon: 'example' },
        path: '/client/list',
        component: () => import('@/views/client/index')
      },
      {
        name: 'clientAdd',
        hidden: true,
        meta: { title: '新增客户', icon: 'example' },
        path: '/client/add',
        component: () => import('@/views/client/add')
      },
      {
        name: 'clientDetail',
        meta: { title: '客户详情', icon: 'example' },
        hidden: true,
        path: '/client/detail',
        component: () => import('@/views/client/detail')
      },
      {
        name: 'addConsume',
        meta: { title: '新增消费记录', icon: 'example' },
        hidden: true,
        path: '/client/addConsume',
        component: () => import('@/views/client/addConsume')
      },
      {
        name: 'addVisit',
        meta: { title: '新增跟进', icon: 'example' },
        hidden: true,
        path: '/client/addVisit',
        component: () => import('@/views/client/addVisit')
      }
    ]
  }, // 分销中心吉优
  {
    path: '/distribution',
    component: Layout,
    redirect: '/distribution',
    name: 'distribution',
    meta: { title: '分销中心', icon: 'example' },
    children: [
      {
        name: 'salesmans',
        meta: { title: '销售管理', icon: 'example' },
        path: '/salesmans',
        component: () => import('@/views/distribution/salesmans')
      },
      {
        name: 'distributiondetail',
        meta: { title: '销售详情', icon: 'example' },
        path: '/distributiondetail',
        hidden: true,
        component: () => import('@/views/distribution/distributiondetail')
      },

      {
        name: 'addoffline',
        meta: { title: '新增消费记录', icon: 'example' },
        path: '/addoffline',
        hidden: true,
        component: () => import('@/views/distribution/addoffline')
      },
      {
        name: 'distributionset',
        meta: { title: '分销设置', icon: 'example' },
        path: '/distributionset',
        component: () => import('@/views/distribution/distributionset')
      }
    ]
  }, // 财务管理
  {
    path: '/financial',
    component: Layout,
    redirect: '/financial',
    name: 'financial',
    meta: { title: '财务管理', icon: 'example' },
    children: [
      {
        name: 'list',
        meta: { title: '提现记录', icon: 'example' },
        path: 'list',
        component: () => import('@/views/financial/index')
      },
      {
        name: 'audit',
        meta: { title: '审核中', icon: 'example' },
        path: '/audit',
        hidden: true,
        component: () => import('@/views/financial/audit')
      },
      {
        name: 'toplay',
        meta: { title: '待打款', icon: 'example' },
        path: '/toplay',
        hidden: true,
        component: () => import('@/views/financial/toplay')
      },
      {
        name: 'havemoney',
        meta: { title: '已打款', icon: 'example' },
        path: '/havemoney',
        hidden: true,
        component: () => import('@/views/financial/havemoney')
      },
      {
        name: 'rejected',
        meta: { title: '已驳回', icon: 'example' },
        path: '/rejected',
        hidden: true,
        component: () => import('@/views/financial/rejected')
      },
      // 财务管理的收益明细
      {
        name: 'redetail',
        meta: { title: '收益明细', icon: 'example' },
        path: '/redetail',
        // hidden: true,
        component: () => import('@/views/financial/redetail')
      },
      {
        name: 'statistics',
        meta: { title: '提现统计', icon: 'example' },
        path: '/statistics',
        hidden: true,
        component: () => import('@/views/financial/statistics')
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
