// pages/songDetail/songDetail.js
import PubSub from 'pubsub-js';
import moment from 'moment';
import request from "../../utils/request.js"
// 获取全局实例
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,//标识音乐是否播放
    song:{},//歌曲详情对象
    musicId:'',//音乐id
    musicLink:'',//音乐链接
    currentTime:'00:00',//当前播放时间
    durationTime:'00:00',//总时长
    currentWitdh:0,//实时进度条宽度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options:用于接收路由跳转的query参数
    // 原生小程序中路由传参，对参数的长度有限制 如果参数长度过长会自动截取
    let musicId = options.musicId;
    this.setData({
      musicId
    })
    this.getMusicInfo(musicId);
    //  如果用户操作系统的控制音乐播放/暂停按钮，页面不知道，导致页面显示是否播放的状态和真实音乐播放状态不一致
    // 通过控制音频实例backgroundAudioManager去监视音乐播放/暂停
    // 判断当前页面是否在播放
    if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId ){
      // 修改当前页面播放状态为true
      this.setData({
        isPlay:true
      })
    }
    //创建控制音乐播放的实例对象
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // 监视音乐播放暂停
    this.backgroundAudioManager.onPlay(()=>{
      // 修改音乐是否播放的状态
      this.changePlayState(true);
      //修改全局音乐播放状态
      appInstance.globalData.musicId = musicId;
    });
    this.backgroundAudioManager.onPause(()=>{
      // 修改音乐是否暂停的状态
      this.changePlayState(false);
    });
    this.backgroundAudioManager.onStop(()=>{
      // 修改音乐是否停止的状态
      this.changePlayState(false);
    });
    //监听音乐播放自然结束
    this.backgroundAudioManager.onEnded(() => {
      //自动切换至下一首音乐，并自动播放，
      PubSub.publish('switchType','next');
      //将实时进度条切换为0
      this.setData({
        currentWitdh:0,
        currentTime:'00:00',
      })
    });
    // 监听音乐实时播放进度
    this.backgroundAudioManager.onTimeUpdate(() => {
      let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
      let currentWitdh = this.backgroundAudioManager.currentTime/this.backgroundAudioManager.durationTime * 450
      this.setData({
        currentTime
      })
    });

  }, 
  // 修改音乐播放状态
  changePlayState(isPlay){
    this.setData({
      isPlay
    })
    //修改全局音乐播放状态
    appInstance.globalData.isMusicPlay = isPlay;
  },
  // 获取音乐详情的函数
  async getMusicInfo(musicId){
    let songData = await request('/song/detail', { ids: musicId});
    let durationTime = moment(songData.songs[0].dt).format('mm:ss');
    this.setData({
      song: songData.songs[0],
      durationTime
    })
    // 动态修改窗口标题
    wx.setNavigationBarTitle({
      title: this.data.song.name
    })
  },
  // 控制音乐播放
  handleMusicPlay(){
    let isPlay = !this.data.isPlay;
    let{musicId, musicLink} = this.data;
    this.musicControl(isPlay, musicId, musicLink);
  },
  //控制音乐暂停和播放功能函数
  async musicControl(isPlay, musicId, musicLink){
    if(isPlay){//播放音乐
      if(!musicLink){
         //获取音乐播放链接
      let musicLinkData = await request('/song/url',{id:musicId});
      musicLink = musicLinkData.data[0].url;
      this.setData({
        musicLink
      })
      }
    this.backgroundAudioManager.src = musicLink;
    this.backgroundAudioManager.title = this.data.song.name;
    }else{//暂停音乐 
    this.backgroundAudioManager.pause();
    }
  },
  //切换歌曲
  handleSwitch(event){
    // 获取切歌类型
    let type = event.currentTarget.id;
    // 关闭当前歌曲
    this.backgroundAudioManager.stop();
    // 订阅来自recommend页面发布的musicId消息
    PubSub.subscribe('musicId',(msg,musicId) => {
      //获取音乐详情
      this.getMusicInfo(musicId);
      // 自动播放当前歌曲
      this.musicControl(true, musicId);
      //取消订阅
      PubSub.unsubscribe('musicId');
    })
    //发布消息数据给recommend页面
    PubSub.publish('switchType',type);
    
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