+ function(){
    adaptUILayout()
    function adaptUILayout(){

        var deviceWidth,
            devicePixelRatio,
            targetDensitydpi,
            //meta,
            initialContent,
            head,
            viewport,
            ua;

        ua = navigator.userAgent.toLowerCase();
        //whether it is the iPhone or iPad
        isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;

        //获取设备信息,并矫正参数值
        devicePixelRatio = window.devicePixelRatio;
        devicePixelRatio < 1.5 ? 2  : devicePixelRatio;

        if(window.orientation == 0 || window.orientation == 180){//竖屏状态
            if(window.screen.width < window.screen.height){
                deviceWidth = window.screen.width; 
            }else{
                deviceWidth = window.screen.height; 
            }
        }else{//横屏状态 //window.orientation==90||window.orientation==-90
            if(window.screen.width > window.screen.height){
                deviceWidth = window.screen.width; 
            }else{
                deviceWidth = window.screen.height; 
            }
        }

        if(devicePixelRatio==2 && (deviceWidth==320 || deviceWidth==360 || deviceWidth==592 || deviceWidth==640)){
            deviceWidth*=2;
        }

        if(devicePixelRatio==1.5 && (deviceWidth==320)){
            deviceWidth*=2;
            devicePixelRatio = 2;
        }
        if(devicePixelRatio==1.5 && (deviceWidth==640)){
            devicePixelRatio = 2;
        }
       
        //获取最终dpi
        targetDensitydpi = 640 / deviceWidth * devicePixelRatio * 160;
        initialContent   = isiOS 
            ? 'width=' + 640 + ', user-scalable=no'
            : 'width='+ 640 +', target-densitydpi=' + targetDensitydpi + ', user-scalable=no, minimum-scale=1.0, maximum-scale=1.0';
        
        $("#viewport").remove();
        var head = document.getElementsByTagName('head');
        var viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.id = 'viewport';
        viewport.content = initialContent;

        head.length > 0 && head[head.length - 1].appendChild(viewport);
    }

    $(window).bind( 'orientationchange', function(e){
        adaptUILayout()
    });

}();