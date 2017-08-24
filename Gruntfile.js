"use strict";
module.exports = (grunt) => {
  // 任务配置
  grunt.initConfig({
    //读取package.json 文件获取其内信息，方便在后面任务中应用
    pkg: grunt.file.readJSON('package.json'),
    // apidoc名称固定，对应到 package.json 中的 apidoc 插件，表示下面的任务是调用 apidoc 插件的
    apidoc: {
      // 新建 KoaFrameDoc 任务
      KoaFrameDoc: {
        src: 'routes/',       // 目标内容
        dest: 'public/doc/',  // 输出路径
        options: {
          debug: false,
          excludeFilters: ["node_modules/"]
        }
      }
      // 还可以创建其他的任务
    }
  });

  // 插件加载, 对应 package.json 中的 grunt 插件
  grunt.loadNpmTasks('grunt-apidoc');

  // 任务注册
  // 可以自定义任务，通过定义 default 任务可以让 grunt 默认执行一个或多个任务
  // 在控制台切入到项目目录输入 grunt 就会执行 default任务
  // 下面的代码执行会实现 apidoc 中的所有任务
  // 第一个参数为任务的自定义名称，第二个参数为任务配置数组
  // Warning: 任务名称不能与后边的任务配置同名， 也就是说这里的default不能命名成apidoc，否则会报错或者产生意外情况.
  grunt.registerTask('default', ['apidoc']);
  // grunt registerTask('default', ['apidoc:KoaFrameDoc']) 只执行apidoc下的KoaFrameDoc任务

  // 可单独进行任务的注册
  // 执行的时候输入 grunt taskName 就可以执行相应的任务，比如下边输入 grunt doc 就达到上边的效果了
  // grunt.registerTask('doc', ['apidoc']);
}
