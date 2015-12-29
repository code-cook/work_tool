var Utils = {
  /**
   * 为数字添加千分位逗号
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
  },
  /**
   * 倒计时
   */
  countdown: function(options){
    var options = $.extend({
      start : new Date().getTime(),
      end : new Date().getTime(),
      callback : function(){}
    }, options || []);

    options.start = new Date(options.start).getTime();
    options.end = new Date(options.end).getTime();

    var intDiff = options.end - options.start;
    var day = 0, hour = 0, minute = 0, second = 0;
    var timer = setInterval(function(){

      if(intDiff >= 0){
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60));
      }

      options.callback({
        day : day,
        hour : hour,
        minute : minute,
        second : second
      });

      if(day == 0 && hour == 0 && minute == 0 && second == 0){
        clearInterval(timer);
      }
      intDiff--;
    }, 1000);
  },
  /**
   * 随机数组
   * @param  {[type]} source [description]
   * @param  {[type]} 随机长度      [description]
   * @return {[type]}        [description]
   */
  randomArr: function(source, l){
    var arr = [], len = l || 1;
    while(arr.length < len){
      var index = source[Math.floor(Math.random(source.length) * source.length)];

      if(arr.indexOf(index) == -1){
        arr.push(index);
      }
    }
    return arr;
  },
  /**
   * 浏览器 判断
   * @return {[type]} [description]
   */
  browser: function(){
    var u = navigator.userAgent,
        app = navigator.appVersion;

    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == ' qq' //是否QQ
    }
  }
}

