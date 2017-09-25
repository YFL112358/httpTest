# httpTest
1、git clone https://github.com/shareming7/httpTest.git  
  
2、安装依赖：  
```
npm install
``` 

3、启动项目：
```
node index.js
```
4、运行demo  
- 3.1: http://localhot:3000/v3/test  

- 3.2 http://localhot:3000/v3/plus?a=2&b=3  
  
- 3.3 http://localhost:3000/index 
 进入此页面输入a和b的值，点 add 跳到http://localhot:3000/v3/plus 的返回结果页面    

- 3.4 http://localhost:3000/v3/turtorial/student/list
- 3.5 http://localhost:3000/login
    - 进入此页的user password中输入任意字符串 .然后点击login 按钮，会跳到 http://localhost:3000/v3/peter/debug/append .并且会在log 文件夹下生成peter.log文件
    - 如果 user＝peter password＝password 返回ret:1000 ,并且log文件打印login sucess，否则返回ret:1001, 并且log文件打印login error.
