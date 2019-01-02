//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("登录成功",res)
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: "wx676dc7fc17f01892",
            secret:"e4e60e136c6cb255e7c65819b91e30d7",
            js_code: res.code,
            grant_type:'authorization_code'

          },
          method: 'GET',
          success: function (res) {
            console.log("openId获取成", res)


          }
        })

        wx.getUserInfo({
          success: function(res) {
            console.log("系统熊熊",res)
          },
        })

        


      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("微信登录人",res)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  //添加就诊卡
  addVisitCard() {
    wx.navigateTo({
      url: '../addcard/addcard',
    })
  },
  //添加住院人
  addResident() {
    wx.navigateTo({
      url: '../addresident/addresident',
    })
  }
})