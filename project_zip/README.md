Project Zip
---

在config.json中进行路径配置，然后执行 gulp 命令

###1、JS压缩合并-参数说明
  
  jsSrc: 指定js文件存放的根目录

  jsDist: 指定js文件输出目录

  jsName: 指定js文件输出名称，会自动添加min suffix

  jsFilter: 指定js文件处理列表，如果不指定，默认压缩合并jsSrc下所有js文件

###2、CSS压缩合并-参数说明
  
  cssSrc: 指定css文件存放的根目录
  
  cssDist: 指定css文件输出目录
  
  cssName: 指定css文件输出名称，会自动添加min suffix
  
  cssFilter: 指定css文件处理列表，如果不指定，默认压缩合并cssSrc下所有css文件

###3、Image优化处理