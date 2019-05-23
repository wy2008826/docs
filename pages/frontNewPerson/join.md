### 前端新人入职准备工作

*  钉钉账号注册，注册号之后联系HR拉入公司组织架构

*  安装nodeJS版本 8.11.1  

    node安装包版本列表地址：  [https://npm.taobao.org/mirrors/node/](https://npm.taobao.org/mirrors/node/)

* git安装


* gitlab账号注册  （注册好之后告知相关负责人，拉入项目成员列表）
    
    注册地址 ： [http://gitlab.gumingnc.com/](http://gitlab.gumingnc.com/)

* UI设计稿线上地址 蓝湖账号注册 （通过下方地址注册即可看到项目）

    注册地址 ： [https://lanhuapp.com/url/bLyli](https://lanhuapp.com/url/bLyli)
    
* 注册 iconfont账号 （注册号之后，将用户名发给王宇，拉入项目图标管理）

    注册地址 ： [https://www.iconfont.cn/](https://www.iconfont.cn/)

* 石墨文档账号注册 （迭代进度管理、部分文档、资料分享等  注册号之后把账号告知张帅，拉入小组后即可看到内容）
   
    注册地址 ： [https://shimo.im/](https://shimo.im/)

* 禅道地址 （告知崔超楠，建立禅道账号）
    
    禅道地址  [http://zbox.gumingnc.com/zentao/index.php](http://zbox.gumingnc.com/zentao/index.php)

* 接口联调API地址  

  地址格式 : http://host:port/swagger-ui.html 
  
  如 ： http://192.168.1.96:9092/swagger-ui.html
  
  | param     | 含义  |
  | --------- | -----:|
  | host      | 后端对接人局域网IP |
  | port      | 后端对接人项目端口号 |
  


----

### 项目地址

* 门店宝B端： 

    测试环境地址 [http://test-b.gumingnc.com](http://test-b.gumingnc.com)  账号：system     密码：admin888
    
    正式环境地址 [http://back.gumingnc.com](http://back.gumingnc.com)  
    
* 门店宝C端:    

    测试环境地址 [http://test-m.gumingnc.com](http://test-m.gumingnc.com)  （账号请联系相关负责人将用户添加至店铺下即可查看）
    
    正式环境地址 [https://mobile.gumingnc.com](https://mobile.gumingnc.com) 
    
    
*  巡店B端：

    测试环境地址 [http://test-patrol-b.gumingnc.com](http://test-patrol-b.gumingnc.com)  账号：system   密码：GMadmins1318#
    
    正式环境地址 [http://patrol-b.gumingnc.com](http://patrol-b.gumingnc.com)
     
*  巡店C端：

    测试环境地址 [http://test-patrol-m.gumingnc.com](http://test-patrol-m.gumingnc.com) （账号请联系相关负责人将添加用户）
    
    正式环境地址 [https://patrol-m.gumingnc.com](https://patrol-m.gumingnc.com)


----
### notes

* 针对c端的项目，安装好依赖之后，需要在build => webpack.config.js中添加自己的IP地址，添加完成之后，方可启动项目

``` js{}
devServer: {
        // host: 'localhost',
        host:'192.168.1.85',//修改为自己的ip地址
        
```
