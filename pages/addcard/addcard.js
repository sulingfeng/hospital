// pages/addcard/addcard.js
const { $Message } = require('../../iview/base/index');
const urlApi = require('../../utils/server.api.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    card: '',
    phone: '',
    addrs: '',
    fruit: [{
      id: 0,
      name: '女生',
    }, {
      id: 1,
      name: '男生'
    }],
    position: 'left',
    animal: '熊猫',
    sex:"",
    checked: false,
    disabled: false,
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
    if (addrs == undefined || addrs == "" || addrs == null) {
      $Message({
        content: "详细地址不能为空"
      });
    } else {
      console.log("地址",addrs);
      this.addrs = addrs;
    }
  },

  //获取性别
  handleFruitChange({ detail = {} }) {
    this.sex = detail.value
  },

  handleDisabled() {
    this.setData({
      disabled: !this.data.disabled
    });
  },

  handleClick:function(){
    var sex = this.sex === "女生"?"0":"1";
    var obj = {
      WID: app.globalData.openid,
      NAME: this.name,
      IDCARD: this.card,
      SEX: sex,
      PHONE: this.phone,
      ADDRESS: this.addrs,
      DEFAULT: 0
    }
    console.log("请求参数", JSON.stringify(obj), "连接", urlApi.getRegisterUrl())
    wx.request({
      url: urlApi.getRegisterUrl(),
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        BODY: JSON.stringify(obj)
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