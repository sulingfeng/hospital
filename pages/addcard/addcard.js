// pages/addcard/addcard.js
const { $Message } = require('../../iview/base/index');
const urlApi = require('../../utils/server.api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    card: '',
    phone: '',
    addrs: ''

  },

  //姓名验证发放
  nameVerifyFun: function ({ detail }){
    var name = detail.detail.value
    if (name == undefined || name == "" || name == null){
      $Message({
        content: "名字不能为空"
      });
    }else{
      this.name = name
    }
  },

  //身份证验证发放
  cardVerifyFun: function ({ detail }) {
    var card = detail.detail.value
    if (card == undefined || card == "" || card == null) {
      $Message({
        content: "身份证不能为空"
      });
    } else {
      this.card = card
    }
  },

  //电话验证发放
  phoneVerifyFun: function ({ detail }) {
    var phone = detail.detail.value
    if (phone == undefined || phone == "" || phone == null) {
      $Message({
        content: "电话不能为空"
      });
    } else {
      this.phone = phone
    }
  },

  //地址验证发放
  addrVerifyFun: function ({ detail }) {
    var addrs = detail.detail.value
    var that = this;
    console.log("地址",addrs)
    if (addrs == undefined || addrs == "" || addrs == null) {
      $Message({
        content: "详细地址不能为空"
      });
    } else {
      this.addrs = addrs
    }
  },

  handleClick:function(){
    console.log("查看请求参数",this.name,this.card)
    wx.request({
      url: urlApi.getRegisterUrl(),
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        XM: this.name,
        ZJH: this.card,
        ZJLX:"SFZ",
        SJH: this.phone,
        addr: this.addrs
      },
      success: function (reponse) {
        console.log("绑定卡", reponse)
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