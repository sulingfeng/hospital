// pages/doctor/doctor.js
const urlApi = require('../../utils/server.api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalObj:[],
    title:"挂号记录",
    totalPrice:0,
    notPayData:[],
  },

  //获取待付款列表
  getRegisterLog:function(type){
    const that = this;
    var url = type == 0?urlApi.getRegisterLogUrl():
              type == 1?urlApi.getPayLogUrl():
              type == 2?urlApi.getMZPayLogUrl():
              type == 3?urlApi.getinHPayLogUrl():
              type == 4?urlApi.getDepositLogUrl() : urlApi.getPayLogUrl();              
    var title = type == 0?"挂号记录":
                type == 1?"缴费记录":
                type == 2?"门诊缴费记录":
                type == 3?"住院缴费记录":
                type == 4?"押金补交记录" : "缴费记录"
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
      title: title
    })
    wx.request({
      url: url,
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {},
      success: function (reponse) {
        if (reponse.data.code === 0){
          that.setData({
            notPayData: reponse.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    this.getRegisterLog(Number(type));
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

  },
})
