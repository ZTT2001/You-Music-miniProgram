// pages/search/search.js
import request from "../../utils/request.js"
let isSend = false;//函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent:'',//placeholder的内容
    hotList:[],//热搜榜数据
    searchContent:'',//用户输入搜索框数据
    searchList:[],//关键字匹配数据
    historyList:[],//搜索历史数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取初始化数据
    this.getInitData();
    // 获取历史记录
    this.getSearchHistory();
  },
  //获取初始化数据
  async getInitData(){
    let placeholderData = await request('/search/default');
    let hotListData = await request('/search/hot/detail');
    this.setData({
      placeholderContent: placeholderData.data.showKeyword
    })
    this.setData({
      hotList : hotListData.data
    })
  },
  // 读取本地历史记录
  getSearchHistory(){
    let historyList =  wx.getStorageSync('searchHistory')
    if(historyList){
      this.setData({
        historyList
      })
    }
  },
  // 表单项内容发生改变的回调
  handleInputChange(event){
    this.setData({
      searchContent: event.detail.value.trim()
    })
    if(isSend){
      return
    }
    isSend = true;
    this.getSearchList();
    // 函数节流
    setTimeout(() => {
      isSend = false;
    },300)
  },
async getSearchList(){
  if(!this.data.searchContent){
    this.setData({
      searchList:[]
    })
    return;
  }
    let {searchContent, historyList} = this.data;
     // 发请求获取关键字模糊匹配数据
     let searchListData = await request('/search',{keywords: searchContent,limit: 10});
     this.setData({
       searchList: searchListData.result.songs
     })
    //  将搜索的关键字添加到历史记录中
   if( historyList.indexOf(searchContent) !== -1){
    historyList.splice(historyList.indexOf(searchContent), 1)
   }
   historyList.unshift(searchContent);
    wx.setStorageSync('searchHistory', historyList)
  },
  clearSearchContent(){
    this.setData({
      searchContent:'',
      searchList:[],
    })
  },
  // 删除搜索历史记录
  deleteSearchHistory(){
    wx.showModal({
      content:'是否确认删除历史记录',
      success:(res) => {
        if(res.confirm){
          // 清空data中的historyList
          this.setData({
            historyList:[],
          })
          // 移除本地的历史记录缓存
          wx.removeStorageSync('searchHistory')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})