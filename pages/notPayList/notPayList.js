// pages/doctor/doctor.js
const urlApi = require('../../utils/server.api.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalObj:[],
    totalPrice:0,
    notPayData:[],
    sickName:"",
    sickCard:"",
    allCheck:false
  },

  //获取待付款列表
  getNotPayList:function(){
    const that = this;
    wx.request({
      url: urlApi.getNotPayListUrl2(),//getNotPayListUrl2
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        BRID:app.globalData.BRID,
        CXTS:"10",
        JSKLB: "巨浪微信"
      },
      success: function (reponse) {
        if (reponse.data.DATAPARAM.GHLIST.GH){
          var obj = reponse.data.DATAPARAM.GHLIST.GH;
          var arr = reponse.data.DATAPARAM.GHLIST.GH.YZLIST.YZ;
          var DJHset = new Set();
          for(var i of arr){
            i.name = obj.KDKS;
            i.price = i.FMLIST.FM.JE;
            i.checked = false;
            DJHset.add(i.DJLIST.DJ.DJH)
          }
          var DJHarr = new Array();
          for (var j of DJHset){
            DJHarr.push(j)
          }
          app.globalData.DJH = DJHarr.toString();
          that.setData({
            notPayData: arr
          })
        }
      }
    })
  },

  //选择事件
  handleClick:function(e){
    var itemId = e.currentTarget.dataset.id;
    var price  = e.currentTarget.dataset.price;
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

  allChoose:function(e){
    this.setData({
      allCheck: !this.data.allCheck
    })
    if (this.data.allCheck){
      console.log("选中")
      var total = 0;
      for (var i of this.data.notPayData) {
        total = total + i.price;
      }
      var arr = this.data.notPayData;
      var totalObj = new Array();
      for (var i of arr) {
        i.checked = true;
        totalObj.push(i.id);
      }
      this.setData({
        totalPrice: total,
        notPayData: arr,
        totalObj: totalObj
      })
    }else{
      var arr = this.data.notPayData;
      for (var i of arr) {
        i.checked = false;
      }
      this.setData({
        totalPrice: 0,
        notPayData: arr,
        totalObj:[]
      })
    }

    
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sickName: app.globalData.sickName,
      sickCard: app.globalData.sickCard
    })
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
    var info = {
      money: this.data.totalPrice
    }
    app.globalData.JE = this.data.totalPrice
    wx.navigateTo({
      url: '/pages/MZPay/MZPay?info=' + JSON.stringify(info)
    })
  }
})
