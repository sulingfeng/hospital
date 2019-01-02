// pages/doctor/doctor.js
const urlApi = require('../../utils/server.api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalObj:[],
    totalPrice:0,
    notPayData:[],
  },

  //获取待付款列表
  getNotPayList:function(){
    const that = this;
    wx.request({
      url: urlApi.getNotPayListUrl(),
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

  //选择事件
  handleClick:function(e){
    var itemId = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    
    if (this.data.totalObj.indexOf(itemId) > -1) {//则包含该元素
      var arr = new Array();
      this.data.totalObj.map(function(i){
        if (i !== itemId){
          arr.push(i)
        }
      })
      this.data.totalObj = arr;
      this.countPrice(-price)
    }else{
      this.data.totalObj.push(itemId)
      this.countPrice(price)
    }
    
  },

  //计算总价
  countPrice:function(price){
    this.setData({
      totalPrice: this.data.totalPrice + price
    })
  }, 



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotPayList();
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

  toPay: function (e) {
    console.log("选中的医生", e);
    wx.navigateTo({
      // url: '/pages/doctor/doctor?doctor=' + JSON.stringify(e.currentTarget.dataset.doctor)
      //   + '&departmentName=' + this.data.department.name
      url: '/pages/pay/pay'
    })
  }
})
