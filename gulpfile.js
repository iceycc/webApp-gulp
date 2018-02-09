/**
 * Created by 
 */
//引入gulpfile.dev.js和gulpfile.prod.js文件，并调用dev和prod方法，这样对应环境下的各个任务即被创建出来了。
var init = require('./build/gulpfile.init.js');
var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');
init();
prod();
dev();