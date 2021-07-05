<template>
  <div class="noFound"></div>
</template>

<script>
import apisObj from '@/api'
const { USER } = apisObj
export default {
  name: 'NoFound',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
    this.getNoFound()
  },
  methods: {
    getUserInfo () {
      const userInfoStr = sessionStorage.getItem('userInfo')
      if (userInfoStr) {
        this.userInfo = JSON.parse(userInfoStr)
      }
    },
    getNoFound () {
      this.$get(USER.getUrl, {
        urlCode: 'nofound'
      }).then(res => {
        if (res) {
          const newUrl = this.$util.getGoToUrl(
            this.userInfo,
            res.url,
            res.params
          )
          if (newUrl) {
            window.location.replace(newUrl)
          }
        }
      })
    }
  }
}
</script>
