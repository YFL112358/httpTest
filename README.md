# httpTest
## 可运行的os
- Ubuntu 14+ 或者Mac osx.
## 安装坏境
- nodejs: 6.0+
- mysql :5.0+
以上的安装和初始化可参考：https://github.com/genxium/Ubuntu14InitScripts
##安装步骤：
1、git clone https://github.com/shareming7/httpTest.git  
      
2、cd httpTest  
  
3、安装依赖：  
```
npm install
``` 

4、启动项目：
```
node index.js
```
5、更改数据库config
```
sh ./dbConfig.sh
```
6、运行demo  
- 3.1 http://localhost:3000/v3/api_test  

- 3.2 http://localhost:3000/v3/plus?a=2&b=3  
  
- 3.3 http://localhost:3000/index 
 进入此页面输入a和b的值，点 add 跳到http://localhot:3000/v3/plus 的返回结果页面    

- 3.4 http://localhost:3000/v3/turtorial/student/list
- 3.5 http://localhost:3000/login
    - 进入此页的user password中输入任意字符串 .然后点击login 按钮，会跳到 http://localhost:3000/v3/peter/debug/append .并且会在log 文件夹下生成peter.log文件
    - 如果 user＝peter password＝password 返回ret:1000 ,并且log文件打印login sucess，否则返回ret:1001, 并且log文件打印login error.
- 3.6 http://localhost:3000/user/sp100029/wallet/self/detail  返回ret:1001
      http://localhost:3000/user/sp100029/wallet/self/detail?intAuthToken=xxxyyyzz  返回1000 
- 3.7 在 console 台 运行：apidoc  -o apidoc/ -f "app\\.js"  
 
并且在浏览器打开 httpTest/apidoc/index.html 可以看到相应的apidoc
