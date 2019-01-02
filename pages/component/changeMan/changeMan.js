Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    visible1: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 搜索结果类别
     */
    gotoSearchList: function () {
      wx.navigateTo({
        url: '../searchlist/searchlist'
      })
    },

    handleOpen2:function() {
      this.setData({
        visible2: true
      });
    },

    handleCancel2 () {
        this.setData({
            visible2: false
        });
    },

    handleClickItem2() {
      const action = [...this.data.actions2];
      action[0].loading = true;

      this.setData({
        actions2: action
      });

      setTimeout(() => {
        action[0].loading = false;
        this.setData({
          visible2: false,
          actions2: action
        });
        $Message({
          content: '删除成功！',
          type: 'success'
        });
      }, 2000);
    }
  }
})