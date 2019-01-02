// pages/reserve/reserve.js
import initCalendar from '../component/calendar/calendar/index';
import { setTodoLabels } from '../component/calendar/calendar/index';
import { switchView } from '../component/calendar/calendar/index';
const urlApi = require('../../utils/server.api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    department: {},
    doctors: [],
    current: 'tab1',
    current_scroll: 'tab1',
    show:"show",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("监听页面加载",options.id)
    this.doctorList(Number(options.id))
  },

  switchView: function () {
    console.log("预约方式切换")
    switchView();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const conf = {
      multi: false, // 是否开启多选,
      disablePastDay: true, // 是否禁选过去的日期
      /**
       * 初始化日历时指定默认选中日期，如：'2018-3-6' 或 '2018-03-06'
       * 注意：若想初始化时不默认选中当天，则将该值配置为除 undefined 以外的其他非值即可，如：空字符串, 0 ,false等。
      */
      noDefault: true, // 初始化后是否自动选中当天日期，优先级高于defaultDay配置，两者请勿一起配置
      /**
       * 选择日期后执行的事件
       * @param { object } currentSelect 当前点击的日期
       * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
       */
      afterTapDay: (currentSelect, allSelectedDays) => { },
      /**
       * 当改变月份时触发
       * @param { object } current 当前年月
       * @param { object } next 切换后的年月
       */
      whenChangeMonth: (current, next) => { },
      /**
       * 日期点击事件（此事件会完全接管点击事件）
       * @param { object } currentSelect 当前点击的日期
       * @param { object } event 日期点击事件对象
       */
      onTapDay(currentSelect, event) { },
      /**
       * 日历初次渲染完成后触发事件，如设置事件标记
       * @param { object } ctx 当前页面
       */
      afterCalendarRender(ctx) {
        setTodoLabels({
          pos: 'bottom',
          dotColor: '#40',
          days: [{
            year: 2019,
            month: 1,
            day: 1,
            todoText: '待办'
          }, {
            year: 2019,
            month: 1,
            day: 15,
          }],
        });
      },
    }

    initCalendar(conf); // 使用默认配置初始化日历
    switchView('week');

  },

  //按人亲求医生列表
  doctorList: function (KSID,SJJG){
    var that = this;
    wx.request({
      url: urlApi.queryRelatives(),
      data: {
        KSID: KSID,
        HZDW:"巨浪微信"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (response) {
        that.data.doctors = response.data.doctors.map(doctor => {
          return {
            id: doctor.id,
            name: doctor.name,
            position: doctor.position,
            title: doctor.title,
            resume: doctor.resume,
            field: doctor.field,
            imageurl: doctor.imageurl
          }
        });
        console.log("列表", that.data.doctors)
        that.setData({
          doctors: that.data.doctors,
          show:"hidden"
        });
      }
    })
  },

  //按日期请求医生列表
  doctorListDate: function (date) {
    var that = this;
    wx.request({
      url: urlApi.queryRelatives(),
      data: {
        date: date
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (response) {
        that.data.doctors = response.data.doctors.map(doctor => {
          return {
            id: doctor.id,
            name: doctor.name,
            position: doctor.position,
            title: doctor.title,
            resume: doctor.resume,
            field: doctor.field,
            imageurl: doctor.imageurl,
            type:"有号",
            price:"￥"+doctor.price
          }
        });
        that.setData({
          doctors: that.data.doctors,
          show: "show"
        });
      }
    })
  },

  handleChange({ detail }) {
    var type = detail.key;
    if(type === "1"){
      this.doctorList();
    }else if(type === "0"){
      this.doctorListDate();
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