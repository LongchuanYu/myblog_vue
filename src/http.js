import Vue from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'
axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://49.234.18.49:5000/api'
// axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.baseURL = 'http://192.168.31.57:5000/api'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = window.localStorage.getItem('madblog-token')
    
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    // console.log('request ok..')
    return config
  }, function (error) {
    //   console.log('request error...')
    // Do something with request error
    return Promise.reject(error)
  })

axios.interceptors.response.use(function(response){
    // console.log('response ok...')
    return response
},function(error){
    switch (error.response.status){
        case 401:
            store.logoutAction()
            Vue.toasted.error('401:Authorization error')
            if (router.currentRoute.path !=='/login'){
                //（？）Home页面删除或者更新操作，如果没有登录认证，会跳转到登陆界面，这时候模态框蒙版会遮住登录界面
                // 流程是 request - request拦截 - response拦截 - 模态框response Catch Error 。。
                // $('#exampleModal').modal('hide')
                // $("#modalDelete").modal("hide")
                // $("#deleteModal").modal("hide")
                $(".g-teardownModal").modal("hide")
                router.replace({
                    path:'/login',
                    query:{redirect: router.currentRoute.path}
                })
            }
            break;
        case 404:
            Vue.toasted.error('404:NOT FOUND')
            router.back()
            break;
    }
    return Promise.reject(error)
})

export default axios