##  基本步骤
1-全局安装gulp`npm install gulp -g`  
2-`npm install`  
3-需要rimraf，我们必须先进行全局安装 `npm install rimraf -g` 
##  npm命令  
1. 使用npm start命令将对应执行gulp dev命令； 
2. 使用npm run dev命令将对应执行gulp dev命令； 
3. 使用npm run clean命令将删除所有生成后的文件； 
4. 使用npm run build命令可以先删除生成后的文件，再重新打包生成。

### 目录结构
- project
  |- build
  |- dist // 打包文件夹
  |- src  // 源文件夹
  | |- assets // 放置一些第三方文件，如bootstrap
  | |- css
  | | `- index.css
  | |- images
  | |- js
  | | `- index.js
  | |- sass
  | | `- index.scss
  |- gulpfile.js
  `- package.json

## 自动创建src目录
### 初始目录文件
- project
  |- build
  | |- gulpfile.config.js
  | |- gulpfile.dev.js
  | |- gulpfile.init.js
  | |- gulpfile.prod.js
  |- gulpfile.js
  `- package.json

### 使用mkdirp插件来创建目录，先该插件：
    `cnpm install mkdirp --save-dev`
    `gulp init`

## 参考链接 
`http://blog.csdn.net/qq_15096707/article/details/54293203`
