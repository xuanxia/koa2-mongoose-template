# 求轻拍
之前用express+mysql+sequelizejs写了一个游记分享的网站，

使用的是ES5的语法，各种回调处理异步，让我一度失去了用node写后台的信心，跑去学了一段时间的java。

后来知道了有一种async+await+promise的写法可以优雅的处理异步带来的深度回调问题。好激动，准备试试。

于是就去模板网站，看看有木有好一点的模板，拿来做前端页面用。发现那个网站预览速度好慢，还弹广告，

不爽，就写了一个爬虫脚本，然后把他所有的模板资源都爬取过来。

经过 爬取信息=>下载资源=>解压=>文件处理=>压缩打包=>上传七牛云=>存数据库 一条龙脚本操作。

在Linux服务器上跑了2天，下载,上传了10多个G（心疼我阿里云，七牛云的流量啊）的资源后尴尬的发现，数据是有了，但是查看预览还是不方便啊。

然后就写了这样一个web服务。 代码上传在[github](https://github.com/xuanxia/koa2-mongoose-template/) 上。写的不完善，求轻拍。
# 技术方案
爬虫采用node request和request-promise

页面解析使用的是 cheerio 用法跟jquery一样一样的

web服务使用的koa2 async await写法处理异步 感觉真棒

数据库使用的是mongodb mongoose驱动 DBM文档对象模型写法

模板引擎使用的是nunjucks python的web模板引擎 用js实现了

日志记录使用log4js  支持等级打印 文件滚动存储等

前端页面使用的bt3.5 + jquery

线上地址 http://120.27.125.78:3000/
## 注意事项

使用了KOA2 ES6语法 node版本需要支持ES6

使用前记得修改config中部分参数

若要使用120.27.125.78线上的数据库 请改数据库名dataBaseName 公用的，不保证数据库名不重 起名字最好随机一点。

有任何疑问可联系我qq 1243228706 共同学习

## 执行
1：npm install

2：npm start

3: 打开浏览器 http://127.0.0.1:3000/admin/ 查看 

![QQ截图20161116111630.png](http://dn-cnode.qbox.me/Fm25D3Y8utqV1buVv4jsf4U5X986)

4：执行第一步 抓取页面地址

![QQ截图20161116113504.png](http://dn-cnode.qbox.me/FuItkOfPZBa1HNEupPKRFK-V1BmO)

5：执行第二步 抓取信息入库 

![QQ截图20161116114024.png](http://dn-cnode.qbox.me/FmyXKN8OY3IBbBTBiRu3Us8uE0UA)

6：打看页面查看抓取的数据

![QQ截图20161116114301.png](http://dn-cnode.qbox.me/FuqJ9E5vYhM-nyPhwVVO9cK7YblS)
![QQ截图20161116114502.png](http://dn-cnode.qbox.me/FprnwRgyZjrYjKBgMp21UyuYAbm8)


