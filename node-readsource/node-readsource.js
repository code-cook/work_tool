/**
 * author: tangsj
 */
var fs = require('fs');
var Path = require('path');

var list = [], i = 0;

var basePath = Path.join(__dirname, '/');
/**
 * 生成静态资源列表
 */
function loadDir(path, args){
  !function(path){
    var fun = arguments.callee;
    var paths = fs.readdirSync(path);

    paths.forEach(function(pathName, index){
      var url =  Path.join(path, pathName);
      if(fs.statSync(url).isDirectory()){
        fun.call(this, url);
      }else{
        if(/\.png|\.jpg|\.gif$/.test(pathName)){
          args.push({
            src : url.replace(basePath, ''),
            id: pathName.replace(/\.\w+$/, '')
          });
          i++;
        }
      }
    });
  }(path);
}
loadDir(Path.join(__dirname, 'images'), list);

fs.writeFile('js/manifest.json', JSON.stringify(list, null, 2), function(){
  console.log('manifest.json create success.');
});
