// pages/reserve/reserve.js
import initCalendar from '../component/calendar/calendar/index';
import { setTodoLabels } from '../component/calendar/calendar/index';
import { switchView } from '../component/calendar/calendar/index';
const { $Message } = require('../../iview/base/index');
const urlApi = require('../../utils/server.api.js')
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    department: {},
    doctors: [],
    current: 'tab1',
    current_scroll: 'tab1',
    show:"hidden",
    actions: [
      {
        name: '删除',
        color: '#fff',
        fontsize: '20',
        width: 100,
        icon: 'like',
        background: '#ed3f14'
      },
      {
        name: '返回',
        width: 100,
        color: '#80848f',
        fontsize: '20',
        icon: 'undo'
      }
    ]
  },

  handlerCloseButton(e) {
    var type = e.detail.index;
    var id = e.currentTarget.dataset.id;
    console.log("类型", type,"医生ID", id)
    if (type == 0){
      this.deleteDoctor(id);
    }else{
      console.log("返回")
      this.setData({
        toggle2: this.data.toggle2 ? false : true
      });
    }
  },

  //根据id删除收藏额医生
  deleteDoctor: function (id) {
    var that = this;
    var res = util.isInObject(this.data.doctors,id,"YSID");
    var arr = this.data.doctors;
    arr.splice(res.position, 1)
    console.log("删除返回", arr);
    this.setData({
      doctors: arr
    })
    wx.request({
      url: urlApi.getCollectingDeleteUrl(),
      data: {
        WID: app.globalData.openid,
        BRID: app.globalData.BRID,
        ID:id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (response) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.doctorList(Number(options.id))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //按人亲求医生列表
  doctorList: function (){
    var that = this;
    wx.request({
      url: urlApi.getCollectingListUrl(),
      data: {
        WID: app.globalData.openid,
        BRID: app.globalData.BRID,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (response) {
        if(response.data.LIST.length>0){
          for (var i of response.data.LIST){
            if (i.BRID == app.globalData.BRID){
              var arr = i.IDS.split(",");
              for(var j of arr){
                that.getDoctorList(j);
              }
            }
          }
        }
      }
    })
  },

  getDoctorList:function(id){
    if(id == "")return;
    var that = this;
    wx.request({
      url: urlApi.queryRelatives(),
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        YSID: id,
      },
      success: function (response) {
        var doctorArr = new Array();
        var doctorList = response.data.DATAPARAM.GROUP.HBLIST.HB
        var list = doctorList instanceof Array ? doctorList : [doctorList];
        list.map(i => {
          i.imageurl = "../../images/doctor2.jpg";
          i.price = i.PRICE == "" ? 3 : i.PRICE == undefined ? 3 : i.PRICE;
          i.type = 0;
          i.SYHS = i.SYHS == "" ? 0 : i.SYHS;
          i.color = i.SYHS == 0 ? "color2" : "color";
        })
        console.log("医生列表", list)
        that.setData({
          doctors: list,
          show: "hidden",
        });
      }
    })
  },

  handleChange({ detail }) {
    var type = detail.key;
    if(type === "1"){
      this.doctorList();
    }else if(type === "0"){
      this.doctorList();
      //this.doctorListDate();
    }
    
    this.setData({
      current: detail.key
    });
  },

  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
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
  //页面跳转
  toShowDoctorDetails: function (e) {
    console.log("选中的医生",e);
    wx.navigateTo({
      url: '/pages/doctor/doctor?doctor=' + JSON.stringify(e.currentTarget.dataset.doctor)
        + '&departmentName=' + this.data.department.name
    })
  }
})