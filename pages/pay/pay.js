// pages/doctor/doctor.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    introduce: "hidden",
    registration: "show"
  },

  WXPay:function(){
    console.log("调用了支付接口")
    console.log("调用了支付接口", app.globalData.userInfo)
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      complete: function () {
        // url = escape(url + "&resultCode=SUCCESS");
        // wx.redirectTo({
        //   url: "/pages/view/view?url=" + url + "&fnName=" + fnName
        // })
      }
    })
    return;


    var url = "/MinProgram/PayConfirm?orderID=" + options.orderID;
    var fnName = "/MinProgram/PayConfirm";
    wx.requestPayment({
      "appId": options.appId,
      "timeStamp": options.timeStamp,
      "nonceStr": options.nonceStr,
      "package": 'prepay_id=' + options.prepayId,
      "signType": options.signType,
      "paySign": options.paySign,
      "complete": function (res) {
        // console.log("小程序支付成功：");
        // console.log(res);
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          complete: function () {
            url = escape(url + "&resultCode=SUCCESS");
            wx.redirectTo({
              url: "/pages/view/view?url=" + url + "&fnName=" + fnName
            })
          }
        })
      },
      'fail': function (res) {
        // console.log("小程序支付失败：");
        // console.log(res);
        wx.showModal({
          title: '支付失败',
          content: res.errMsg,
          complete: function () {
            url = escape(url + "&resultCode=FAIL");
            wx.redirectTo({
              url: "/pages/view/view?url=" + url + "&fnName=" + fnName
            })
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
