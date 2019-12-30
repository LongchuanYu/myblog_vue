import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/User/Auth/Register'
import Login from '@/components/User/Auth/Login'
import Ping from '@/components/Ping'
import Profile from '@/components/User/Settings/Profile'
import User from '@/components/User/User'
import EditProfile from '@/components/User/Settings/EditProfile'
import PostDetail from '@/components//PostDetail'

//子路由
import Followers from '@/components/User/Followers'
import Following from '@/components/User/Following'
import Overview from '@/components/User/Overview'
import UserPostsList from '@/components/Post/UserPostsList'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping
    },{
      path:'/user/:id',
      children:[
        {path:'',component:Overview},
        { path: 'overview', name: 'UserOverview', component: Overview },
        {path:'followers',name:'UserFollowers',component:Followers},
        {path:'following',name:'UserFollowing',component:Following},
        {path:'UserPostsList',name:'UserPostsList',component:UserPostsList}
      ],
      component:User,
      meta:{
        requiresAuth:true
      }
    },{
      path:'/post/:id',
      name:'PostDetail',
      component:PostDetail
    },{
      path:'/edit/:id',
      name:'EditProfile',
      component:EditProfile
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.length===0){
    Vue.toasted.error("未匹配路由...")
    router.back()
    return;
  }
  const token = window.localStorage.getItem('madblog-token')
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
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (token && to.name == 'Login') {
    // 用户已登录，但又去访问登录页面时不让他过去
    // next({
    //   path: from.fullPath
    // })
    next(false)
  } else {
    //放行
    next()
  }
})

export default router