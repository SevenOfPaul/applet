export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/stream/index',
    'pages/user/index',
    'pages/news/index',
    'pages/live/index'
  ],
  tabBar:{
    list:[{
      text:"主页",
      pagePath:"pages/home/index",
      iconPath:"assets/images/首页.png",
      selectedIconPath:"assets/images/首页-copy.png"
    },{
      text:"新闻",
      pagePath:"pages/news/index",
      iconPath:"assets/images/news.png",
      selectedIconPath:"assets/images/news-copy.png"
    },{
      text:"直播",
      pagePath:"pages/stream/index",
      iconPath:"assets/images/直播.png",
      selectedIconPath:"assets/images/直播-copy.png"
    },{
      text:"我的",
      pagePath:"pages/user/index",
      iconPath:"assets/images/用户.png",
      selectedIconPath:"assets/images/用户.png"
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
