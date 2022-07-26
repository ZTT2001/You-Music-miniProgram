// pages/zhuye/zhuye.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图数组
    recommendList:[],//推荐歌单数据
    autoplay: true,/*自动切换图片开关*/
    interval: 2000,   /*切换时间属性1000=1秒*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) { 
    let bannerListData = await request('/banner',{type:2});
    this.setData({
      bannerList:bannerListData.banners
    })
    //获取推荐歌单数据
    let recommendListData = await request('/personalized', { limit: 10 });
    this.setData({
      recommendList: recommendListData.result
    })

    // 获取排行榜数据
    /*
    * /toplist 获取所有排行榜单
    * detailList 歌单详情
    * */
    let allTopListData = await request('/toplist')
    let topList = allTopListData.list.slice(0, 4)
    let topListDetail = []
    for (let item of topList) {
      let detailList = await request(`/playlist/detail?id=${item.id}`, { limit: 10 })
      topListDetail.push({ name: detailList.playlist.name, tracks: detailList.playlist.tracks.slice(0, 3) })
      this.setData({
        topList: topListDetail
      })
    }
    // 更新topList,放在此处更新会导致发送请求的过程页面长时间白屏，用户体验差
    // this.setData({
    //   topList: resultArr
    // })
  },
  toReconmmend(){
    wx.navigateTo({
      url: '/pages/recommend/recommend',
    })
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
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