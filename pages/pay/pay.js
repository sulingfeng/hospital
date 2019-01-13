// pages/doctor/doctor.js
const urlApi = require('../../utils/server.api.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appId: "",
    nonceStr: "",
    package: "",
    paySign: "",
    signType: "",
    timeStamp: "",
    doctor: "",
    doctorId: "",
    date: "",
    price: "",
    departments: "",
    sickName:"",
    sickCard:""
  },

  payInfo: function(data) {
    var that = this;
    wx.request({
      url: urlApi.getPayInfo(),
      method: "POST",
      data:{
        WID :app.globalData.openid,
        HISID: data.HISID,
        BRID:app.globalData.BRID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("获取支付信息",res.data);
        var data = res.data;
        console.log()
        that.setData({
          appId: data.appId,
          nonceStr: data.nonceStr,
          package: data.package,
          paySign: data.paySign,
          signType: data.signType,
          timeStamp: data.timeStamp
        })
      }
    })
  },
 
  WXPay: function() {
    var that = this;
    wx.requestPayment({
      "appId": this.data.appId,
      "timeStamp": this.data.timeStamp,
      "nonceStr": this.data.nonceStr,
      "package": this.data.package,
      "signType": this.data.signType,
      "paySign": this.data.paySign,
      success: function(res) {
        //  wx.redirectTo({
        //    url: "/pages/home/home"
        //  })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/home/home',
          })
        }, 2000)



        //that.goHome();
        
        // wx.redirectTo({
        //   url: "/pages/home/home"
        // })
        // wx.showToast({
        //   title: '支付成功',
        //   icon: 'success',
        //   complete: function() {
        //     wx.navigateTo({
        //       url: "/pages/home/home"
        //     })
        //   }
        // })
      },
      fail: function(res) {
        console.log("小程序支付失败：",res);
        wx.showModal({
          title: '支付失败',
          content: res.errMsg,
          complete: function() {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }, 2000)
          }
        });
      }
    })
  },

  goHome:function(){
    console.log("支付成功回调")
    wx.navigateTo({
      url: "/pages/home/home"
    })
  },

  payDom: function (options){
    console.log(app.globalData)
    this.setData({
      doctor: options.doctor,
      doctorId: options.doctorId,
      date: options.date,
      price: options.price,
      departments: options.departments,
      sickName: app.globalData.sickName,
      sickCard: app.globalData.sickCard,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.payDom(JSON.parse(options.info));
    this.payInfo(JSON.parse(options.info));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})