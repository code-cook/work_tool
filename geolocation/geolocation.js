/**
 * 获取当前手机的地理位置信息
 * author tangsj
 */
!function(w) {

  function Geolocation(){
    // 信息获取标识
    this.pullFlag = false;
    this.pullTimer = '';
    this.error = '';
    this.position = {};
    this._init();
  }

  Geolocation.prototype._init = function(){
    var _this = this;

    if(!navigator.geolocation){
      this.error = "当前浏览器不支持获取地理位置.";
      this.pullFlag = true;
      return false;
    }

    navigator.geolocation.getCurrentPosition(function(position){
      _this._showPosition(position);
    }, function(error){
      _this._showError(error);
    });
  }

  Geolocation.prototype._showPosition = function(position){
    this.position = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy 
    }
    this.pullFlag = true;
  }

  Geolocation.prototype._showError = function(error){
    switch(error.code){
      case error.PERMISSION_DENIED:
        this.error = '共享位置权限被关闭.';
        break;
      case error.POSITION_UNAVAILABLE:
        this.error = '无法检测当前位置.';
        break;
      case error.TIMEOUT:
        this.error = '位置检测超时.';
        break;
      default:
        this.error = '未知错误.';
        break;
    }
    this.pullFlag = true;
  }

  Geolocation.prototype.pull = function(callback){
    var _this = this;
    // 信息获取监听定时器
    this.pullTimer = setInterval(function(){
      if(_this.pullFlag){
        clearInterval(_this.pullTimer);

        if(_this.error){
          callback(_this.error);
          return false;
        }  

        callback(_this.position);
      }
    }, 100);
  }

  w.Geolocation = new Geolocation();
}(window);