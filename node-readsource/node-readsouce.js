var fs = require('fs');

var list = [], i = 0;

var basePath = __dirname + '/../';
/**
 * 生成静态资源列表
 */
function loadDir(path, args){
  !function(path){
    var fun = arguments.callee;
    var paths = fs.readdirSync(path);

    paths.forEach(function(pathName, index){
      var url =  path + '\/' + pathName;
      if(fs.statSync(url).isDirectory()){
        fun.call(this, url);
      }else{
        if(/.png|.jpg|.gif$/.test(pathName)){
          args.push({
            src : url.replace(basePath, '')
          });
          i++;
        }
      }
    });
  }(path);
}
loadDir(basePath + 'images', list);

console.log(list);