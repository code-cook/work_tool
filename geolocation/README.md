获取设备地理位置信息
---

Demo:

```javascript
  <script>
    window.onload = function(){
      var $body = $('body');
      $body.html('地址位置信息获取中...');

      window.Geolocation.pull(function(obj){
        if( typeof obj == 'string' ){
          $body.html(obj);
          return false;
        }

        console.log(obj);
      });
    }
  </script>
```