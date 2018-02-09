// 保存项目的目录配置，如源文件存放的路径，打包后文件存放的路径等，可以进行灵活配置。同时将Config对应暴露出来供其他文件引用。 

var SRC_DIR = './src/';     // 源文件目录  
var DIST_DIR = './dist/';   // 文件处理后存放的目录  
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件  

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    html: {  
        dir: SRC_DIR,
        src: SRC_DIR + '*.html',  
        dist: DIST_DIR  
    },  
    assets: {  
        dir: SRC_DIR + 'assets',
        src: SRC_DIR + 'assets/**/*',            // assets目录：./src/assets  
        dist: DIST_DIR + 'assets'                // assets文件build后存放的目录：./dist/assets  
    },  
    css: {  
        dir: SRC_DIR + 'css',
        src: SRC_DIR + 'css/**/*.css',           // CSS目录：./src/css/  
        dist: DIST_DIR + 'css'                   // CSS文件build后存放的目录：./dist/css  
    },  
    sass: {  
        dir: SRC_DIR + 'sass',
        src: SRC_DIR + 'sass/**/*.scss',         // SASS目录：./src/sass/  
        dist: DIST_DIR + 'css'                   // SASS文件生成CSS后存放的目录：./dist/css  
    },  
    js: {  
        dir: SRC_DIR + 'js',
        src: SRC_DIR + 'js/**/*.js',             // JS目录：./src/js/  
        dist: DIST_DIR + 'js',                   // JS文件build后存放的目录：./dist/js  
        build_name: 'build.js'                   // 合并后的js的文件名  
    },  
    img: {  
        dir: SRC_DIR + 'images',
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/  
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images  
    }  
};

module.exports = Config;