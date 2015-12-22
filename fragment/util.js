var Utils = {
  /**
   * 为数字添加千分位逗号
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  comdify: function(num){
    var num = num + '';
    var re = /\d{1,3}(?=(\d{3})+$)/g;
    return num.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2){
      return s1.replace(re,"$&,") + s2;
    });
  },
  /**
   * 解析URL参数
   */
  getParam : function() {
    var url = location.search; //获取url中"?"符后的字串
     var param = {};
     if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
           param[strs[i].split("=")[0]]= decodeURIComponent(strs[i].split("=")[1]);
        }
     }
     return param;
  }
}

