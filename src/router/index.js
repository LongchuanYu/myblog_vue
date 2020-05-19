import Vue from 'vue'
import Router from 'vue-router'
// 导入 vue-scrollto，跳转到锚点时支持平滑过渡
import VueScrollTo from 'vue-scrollto'



Vue.use(Router)
// （？）锚点滚动的问题，路由改成history模式之后不能自动滚动到锚点，如何解决？ +
// 答：如下用异步滚动的方式来解决，详见vue-route文档。
// （？）如何解决前进到有#xxx的地址后，滚动到错误的位置？ -
// 答：
const scrollBehavior = function(to,from,savePosition){
  if(savePosition){
    if(to.hash){
      setTimeout(() => {
        VueScrollTo.scrollTo(to.hash,200)
      }, 1000);
      return {x:0,y:0}
    }
    return savePosition
  }else{
    if(to.hash){
      //如果去的地址含有#xxx的锚点
      // return new Promise((resolve,reject)=>{

      //   setTimeout(() => {
      //     resolve({selector:to.hash})
      //   }, 1000)
      // })
      setTimeout(() => {
        VueScrollTo.scrollTo(to.hash,200)
      }, 1000);
      return;
    }
    if(to.name == 'UserFollowers' && to.query.timestamp){
      //个人资料 - 粉丝列表，点击关注后会滑倒顶，这里返回空对象来保持位置
      return {}
    }
    return {x:0,y:0}
  }
}

const router = new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    // 主页、登录、注册等等
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/components/Home'],resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/Auth/Login'],resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/components/Auth/Register'],resolve)
    },{
      path:'/unconfirmed',
      name:'Unconfirmed',
      component:resolve=>require(['@/components/Auth/Unconfirmed'],resolve),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/reset-password-request',
      name: 'ResetPasswordRequest',
      component: resolve=>require(['@/components/Auth/ResetPasswordRequest'],resolve)
    },
    {
      path: '/ping',
      name: 'Ping',
      component: resolve => require(['@/components/Ping'],resolve)
    },
    // 用户个人资料
    {
      path:'/user/:id',
      children:[
        {path:'',component:resolve => require(['@/components/Profile/Overview'],resolve)},
        {path: 'overview', name: 'UserOverview', component: resolve => require(['@/components/Profile/Overview'],resolve) },
        {path:'followers',name:'UserFollowers',component:resolve => require(['@/components/Profile/Followers'],resolve)},
        {path:'following',name:'UserFollowing',component:resolve => require(['@/components/Profile/Following'],resolve)},
        {path:'posts',name:'Posts',component:resolve => require(['@/components/Profile/Posts'],resolve)}
      ],
      component:resolve => require(['@/components/Profile/User'],resolve),
      meta:{
        requiresAuth:true
      }
    },
    // 文章
    {
      path:'/post/:id',
      name:'PostDetail',
      component:resolve => require(['@/components//PostDetail'],resolve)
    },
    // 设置
    {
      path:'/settings',
      component:resolve => require(['@/components/Settings/Settings'],resolve),
      children:[
        {path:'',component:resolve => require(['@/components/Settings/Profile'],resolve)},
        {path:'profile',name:'SettingProfile',component:resolve => require(['@/components/Settings/Profile'],resolve)},
        {path:'account',name:'SettingAccount',component:resolve => require(['@/components/Settings/Account'],resolve)},
        {path:'email',name:'SettingEmail',component:resolve => require(['@/components/Settings/Email'],resolve)},
        {path:'notiffication',name:'SettingNotiffication',component:resolve => require(['@/components/Settings/Notiffication'],resolve)}
      ]
    },
    // 通知类
    {
      path:'/notifications',
      component:resolve => require(['@/components/Notifications/Notifications'],resolve),
      children:[
        {path:'',component:resolve => require(['@/components/Notifications/RecivedComments'],resolve)},
        {path:'comments',name:'RecivedComments',component:resolve => require(['@/components/Notifications/RecivedComments'],resolve)},
        {
          path:'messages',name:'RecivedMessages',component:resolve => require(['@/components/Notifications/RecivedMessages'],resolve),
          children:[{
            path:':id',
            name:'MessagesHistory',
            component:resolve => require(['@/components/Notifications/Message/history'],resolve)
          }]
        },
        {path:'follows',name:'Follows',component:resolve => require(['@/components/Profile/Followers'],resolve)},
        { path: 'commentslikes', name: 'CommentsLikes', component: resolve => require(['@/components/Notifications/CommentsLikes'],resolve) },
        { path: 'following-posts', name: 'FollowingPosts', component: resolve => require(['@/components/Notifications/FollowingPosts'],resolve) }
      ],
      meta:{
        requiresAuth:true
      }
    },
    // 后台管理类
    {
      // 管理后台
      path: '/admin',
      component: resolve => require(['@/components/Admin/Admin.vue'],resolve),
      children: [
        { path: '', component: resolve => require(['@/components/Admin/Roles.vue'],resolve) },
        { path: 'roles', name: 'AdminRoles', component: resolve => require(['@/components/Admin/Roles.vue'],resolve)  },
        { path: 'users', name: 'AdminUsers', component: resolve => require(['@/components/Admin/Users.vue'],resolve) },
        { path: 'posts', name: 'AdminPosts', component: resolve => require(['@/components/Admin/Posts.vue'],resolve)  },
        { path: 'comments', name: 'AdminComments', component: resolve => require(['@/components/Admin/Comments.vue'],resolve)  },
        { path: 'add-role', name: 'AdminAddRole', component: resolve => require(['@/components/Admin/Addroles.vue'],resolve)   },
        { path: 'edit-role/:id', name: 'AdminEditRole', component: resolve => require(['@/components/Admin/EditRole.vue'],resolve)    },
      ],
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.length===0){
    Vue.toasted.error("未匹配路由...")
    router.back()
    return;
  }
  const token = window.localStorage.getItem('madblog-token')


  if (token){
    var payload = JSON.parse(
      atob(token.split('.')[1])
    )
    var user_perms = payload.permissions.split(",")
  }
  //（？）some如何理解？
  //  es6的some方法，有一个true则返回true。相应的every方法，全部true才返回true
  //  这里的record表示matched数组的项
  //  用法详见路由守卫 -> 路由元信息
  //（？）if条件怎么理解？
  //  meta信息定义在路由中：path:'/'
  // 
  //（？）为什么要跳转到一个带查询参数的url？
  //  初步理解是记录登录前的url，登陆之后根据这个url跳转到登录前的界面
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    Vue.toasted.info('请输入账号密码登录...')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })

  }else if (token && !payload.confirmed && to.name != 'Unconfirmed') {
    // 2. 用户刚注册，但是还没确认邮箱地址时，全部跳转到 认证提示 页面
    Vue.toasted.show('请验证您的邮箱，先~', { icon: 'fingerprint' })
    next({
      path: '/unconfirmed',
      query: { redirect: to.fullPath }
    })
  } else if (token && payload.confirmed && to.name == 'Unconfirmed') {
    // 3. 用户账户已确认，但又去访问 认证提示 页面时不让他过去
    next({
      path: '/'
    })
  }else if (token && to.name == 'Login') {
    // 用户已登录，但又去访问登录页面时不让他过去
    // next({
    //   path: from.fullPath
    // })
    next(false)
  }  else if (to.matched.some(record => record.meta.requiresAdmin) && token && !user_perms.includes('admin')) {
    // 5. 普通用户想在浏览器地址中直接访问 /admin ，提示他没有权限，并跳转到首页
    Vue.toasted.error('403: Forbidden', { icon: 'fingerprint' })
    next({
      path: '/'
    })
  } else {
    //放行
    next()
  }

})

export default router