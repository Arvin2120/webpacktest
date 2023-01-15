# main分支是源码解析部分
# master2开始是webpack 学习部分



## 一步步的配置
master2->master3->master4->master5
个人笔记：https://note.youdao.com/s/AJBGRcuw



# html文件 运行查看/dist/main.js 打包效果
```
使用的库：
const fs = require("path");
const fs = require("fs");
const ejs = require("ejs");
```
## 1、 package bin 需要 link
## 2、 package 终端使用 axwp 即可打包
## ☆  3、 bin/axwp.js 代码都写了备注（打包原理）
## 4、 附：安装webpack 方法
```
1、npm init -y 
2、npm install --save-dev webpack  本地安装 (--save-dev或者 -D 属于开发依赖)
//webpack-cli是webpack的一个命令行工具，是我们可以在命令行中调用 webpack
3、npm install --save-dev webpack-cli 
```
## webpack命令
### node 从8.2开始 可以使用命令npx webpack进行打包
```
npx webpack
npx webpack --mode development //设置模式（ejs 生成模板来源）
```
