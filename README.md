# You-Music-miniProgram
柚！音乐小程序

技术栈：JS+HTML+CSS+Node.js+vue(基础)


根据小破站教程所写，音乐微信小程序

主要页面：主页，每日推荐，搜索歌曲，视频（因为用的网易云真实api，视频api现在已经访问不到url了，服务器问题），我的，登录页面

主要实现功能（点击每日推荐，会展示30首每日根据网易云推荐的歌曲，点击音乐进行播放，可以切换上一首下一首，实现了实时进度条（播放音乐等操作需要先登录，登录需要真实的用户账号密码，请使用者注册好，记住不可以访问登录接口太多次，会出错，），实现了搜索歌曲页面功能，目前没有实现搜索点击音乐播放功能，后续功能可能会继续更新）

页面：主页（点击每日推荐，则可进行播放音乐（前提：需要登录）（目前不登录好像也可以进行访问））：

![($ 0(N7U(_R7(E2DNMOSRPJ](https://user-images.githubusercontent.com/74812275/180911064-be06f057-0429-4d10-89b6-ae689be53adf.png)

每日推荐页面：

![KV0FE)GGA3R1SA~MOL5RO Y](https://user-images.githubusercontent.com/74812275/180911321-affd247d-77e6-4fd2-b445-9a858965227a.png)

播放界面：

![SBSDM9YZH0N4S7SYBI@ON0K](https://user-images.githubusercontent.com/74812275/180911467-8676e963-302a-47b7-98b7-b367e57a5100.png)

视频页面（api的url现在是访问不到的,可以用postman访问api查看视频url显示的是null）：

![4B$G3C~IZ0H7WCP27QYN)`J](https://user-images.githubusercontent.com/74812275/180911552-8d82fd53-f16f-4cdb-9032-d7d56746cdbc.png)

我的页面（点击头像可以进行登陆，登录后用户信息会展示在此页面）
![%0P`~4ZTS%F)5CMYXZCFBRQ](https://user-images.githubusercontent.com/74812275/180911586-23baecde-898b-40ff-85b3-baf2206b8d46.png)

登录页面（输入真实账号和密码（因为网络问题或者访问太频繁都会导致登陆失败或者服务器问题也会登陆失败））
![DIM8(WLS~R1PFDWM4_FKJ3B](https://user-images.githubusercontent.com/74812275/180911689-02a4bb8c-6900-4dab-8814-c0b96659f999.png)

搜索歌曲页面（显示实时的热搜榜，可以进行搜索显示结果，会显示搜索记录（不可进行点击））

![image](https://user-images.githubusercontent.com/74812275/180912377-dae1bfc7-917d-4a64-81ba-af9d4d98ec33.png)
![image](https://user-images.githubusercontent.com/74812275/180912429-3362521f-8f3e-4ea8-9eb4-1dd2598aed9a.png)

部署项目（将music_demo导入微信开发者工具）

打开服务器->server->在目录下打开命令行 输入 npm start启动服务器

启动成功页面（这里需要node.js请提前安装，如果启动服务器出错，请按照出错提示进行相应安装）

![image](https://user-images.githubusercontent.com/74812275/180912857-3acf6a21-3176-4b92-928b-a372783693c6.png)
