// pages/deposit/deposit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value2:"",
    show:"show",
    money:""
  },

  sickDataFun:function(){
    if (app.globalData.sickName){
      this.setData({
        show:"show"
      })
    }else{
      this.setData({
        show: "hidden"
      })
    }
  },

  moneyChange: function ({ detail }){
    var money = detail.detail.value
    this.setData({
      money: money
    })
    
  },

  handleClick: function (){
    var info = {
      money: this.data.money,
    }
    wx.navigateTo({
      url: '/pages/MZPay/MZPay?info=' + JSON.stringify(info)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sickDataFun();
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