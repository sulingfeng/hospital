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

  payInfo: function() {
    var that = this;
    wx.request({
      url: urlApi.getPayInfo() + "?OpenId=" + app.globalData.openid, //仅为示例，并非真实的接口地址
      method: "POST",
      data:{
        OpenId:app.globalData.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {},
      success: function(res) {
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
   
    return;
    wx.requestPayment({
      "appId": this.data.appId,
      "timeStamp": this.data.timeStamp,
      "nonceStr": this.data.nonceStr,
      "package": this.data.package,
      "signType": this.data.signType,
      "paySign": this.data.paySign,
      "complete": function(res) {
        console.log("小程序支付成功：",res);
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          complete: function() {
            url = escape(url + "&resultCode=SUCCESS");
            wx.redirectTo({
              url: "/pages/view/view?url=" + url + "&fnName=" + fnName
            })
          }
        })
      },
      'fail': function(res) {
        console.log("小程序支付失败：",res);
        wx.showModal({
          title: '支付失败',
          content: res.errMsg,
          complete: function() {
            url = escape(url + "&resultCode=FAIL");
            wx.redirectTo({
              url: "/pages/view/view?url=" + url + "&fnName=" + fnName
            })
          }
        });
      }
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
    this.payInfo();
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