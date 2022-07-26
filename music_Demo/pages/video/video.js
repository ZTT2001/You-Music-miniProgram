// pages/video/video.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],//导航标签数据
    navId:'',//导航的标识
    videoList:[],//视频列表数据
    videoId:'',//视频id标识
    videoUpdateTime:[],//记录video播放时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData();
    
  },
  //获取导航数据
   async getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list');
    this.setData({
      videoGroupList:videoGroupListData.data.slice(0,14),
      navId:videoGroupListData.data[0].id
    })
     this.getVideoList(this.data.navId);
  },
  // 获取视频列表数据
   async getVideoList(navId){
     if(!navId){
       return;
     }
     let videoListData = await request('/video/group',{id:navId});
    //  关闭正在加载提示框
    wx.hideLoading();
     let index =0;
     let videoList = videoListData.datas.map(item => {
       item.id = index++;
       return item;
     })
     this.setData({
       videoList,
     })
  },

  //点击切换导航回调
  changeNav(event){ 
    let navId = event.currentTarget.id;//通过id向event船餐的时候如果传的是number会自动转换成String
    this.setData({
      navId:navId*1
    })
    //显示正在加载
    wx.showLoading({
      title: '正在加载，请稍等',
    })
    // 动态获取当前导航对应的视频数据
    this.getVideoList(this.data.navId);
  },
  //点击播放/继续播放回调
  handlePlay(event){
    let vid = event.currentTarget.id;
    //关闭播放上一个视频
    this.vid !== vid && this.videoContext && this.videoContext.stop();
    // if(this.vid !== vid){
    //   if(this.videoContext){
    //     this.videoContext.stop();
    //   }
    // }
    this.vid = vid;
    //更新data中的videoId的数据
    this.setData({
      videoId:vid
    })
    //创建空值video标签的实例对象
    this.videoContext = wx.createVideoContext(vid);
    //判断当前视频是否播放过，如果有，跳转至指定的播放位置
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === vid);
    if(videoItem){
      this.videoContext.seek();
    }
    this.videoContext.play();
    // this.videoContext.stop();
  },
  //监听视频播放进度的回调
  handleTimeUpdate(event){
    let videoTimeObj = {vid: event.currentTarget.id,currentTime:event.detail.currentTime}
    let { videoUpdateTime } = this.data;
    // 判断记录播放videoUpdateTime数组中是否有当前视频的播放记录
    // 如果有：在原有的播放记录中修改时间为当前播放时间
    // 如果没有：需要在数组中添加当前视频的播放对象
    let videoItem = videoUpdateTime.find(item=>item.vid === videoTimeObj.vid);
    if (videoItem){//之前有
    videoItem.currentTime = event.detail.currentTime
    }else{//之前没有
      videoUpdateTime.push(videoTimeObj);
    }
    //更新videoUpdate状态
    this.setData({
      videoUpdateTime
    })
  }, 
  //视频播放结束
  handleEnded(event){
    //移除播放时长数组中当前视频的对象
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTime.id), 1)
    this.setData({
      videoUpdateTime
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