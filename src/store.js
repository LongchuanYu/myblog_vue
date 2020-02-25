export default {
    debug: false,
    state: {
      is_new: false,
      update:true,
      notifications:{
        leaveRouteName:'RecivedComments'
      },
      is_authenticated: window.localStorage.getItem('madblog-token') ? true : false,
      user_id:window.localStorage.getItem('madblog-token') ? JSON.parse(atob(window.localStorage.getItem('madblog-token').split('.')[1])).user_id : 0,
      user_name: window.localStorage.getItem('madblog-token') ? JSON.parse(atob(window.localStorage.getItem('madblog-token').split('.')[1])).user_name : '',
      user_avatar: window.localStorage.getItem('madblog-token') ? atob(JSON.parse(atob(window.localStorage.getItem('madblog-token').split('.')[1])).user_avatar) : '' 
    },

    loginAction () {
      if (this.debug) { console.log('loginAction triggered') }

      this.state.is_authenticated = true
      //atob()方法：密文 -> json字符串
      //JSON.parse()方法：json字符串 -> json对象
      const payload = JSON.parse(atob(window.localStorage.getItem('madblog-token').split('.')[1]))
      this.state.user_id = payload.user_id
      this.state.user_name = payload.user_name
      this.state.user_avatar = atob(payload.user_avatar)
    },
    logoutAction () {
      if (this.debug) console.log('logoutAction triggered')
      window.localStorage.removeItem('madblog-token')
      this.state.is_authenticated = false
      this.state.user_id = 0
      this.state.user_name = ''
      this.state.user_avatar = ''
      this.state.notifications.leaveRouteName='RecivedComments'

    }
  }