<template>
  <div class="container">
    <alert 
      v-for="(alert, index) in alerts" :key="index"
      v-bind:variant="alert.variant"
      v-bind:message="alert.message">
    </alert>

    <h5 class="h5 g-color-gray-dark-v1 mb-0">
      <span class="g-color-red">再发一封确认邮件? </span>
      <a v-on:click="onResendConfirm()"  class="" href="javascript:void(0)"> ---> 点我</a>
    </h5>
  </div>
</template>

<script>
import store from '../../store'
import Alert from '../Base/Alert'

export default {
  name: 'Confirm',
  components: {
    alert: Alert
  },
  data() {
    return {
      sharedState: store.state,
      user: '',
      alerts: ''
    }
  },
  methods: {
    getUser (id) {
      const path = `/users/${id}`
      this.$axios.get(path)
        .then((response) => {
          // handle success
          this.user = response.data
          this.alerts = [
            {
              variant: 'info',
              message: `您好啊, ${this.user.name || this.user.username}`
            },
            {
              variant: 'danger',
              message: '您还没有验证邮箱啊！'
            },
            {
              variant: 'success',
              message: '请检查您的邮箱，确认邮件可能在您的垃圾箱里哦'
            }
          ]
        })
        .catch((error) => {
          // handle error
          console.error(error)
        })
    },
    onResendConfirm () {
      const path = '/resend-confirm'
      const payload = {
        confirm_email_base_url: window.location.href.split('/', 3).join('/') + '/unconfirmed/?token='
        
      }
      // console.log(window.location.href.split('/', 3).join('/'))

      this.$axios.post(path, payload)
        .then((response) => {
          // handle success
          this.$toasted.success(response.data.message, { icon: 'fingerprint' })
        })
        .catch((error) => {
          // handle error
          console.log(error.response.data)
          this.$toasted.error(error.response.data.message, { icon: 'fingerprint' })
        })
    },
    onConfirm (token) {
      this.$axios.get(`/confirm/${token}`)
        .then((response) => {
          // handle success
          this.$toasted.success(response.data.message, { icon: 'fingerprint' })
          // 更新 JWT
          console.log(response.data.token)
          window.localStorage.setItem('madblog-token', response.data.token)
          store.loginAction()
          // 路由跳转
          this.$router.push('/')
        })
        .catch((error) => {
          // handle error
          console.log(error.response.data)
          this.$toasted.error(error.response.data.message, { icon: 'fingerprint' })
        })
    }
  },
  created () {
    // 点击邮件中的链接后，确认账户
    if (this.$route.query.token) {
      this.onConfirm(this.$route.query.token)
    }

    // 未确认的用户，显示提示信息
    const user_id = this.sharedState.user_id
    this.getUser(user_id)
  }
}
</script>
