// 判断滑动方向
$('elem').on('touchstart touchend', function(e) {
  //e.preventDefault();
  if(e.type == 'touchstart'){
    startX = e.originalEvent.changedTouches[0].pageX,
    startY = e.originalEvent.changedTouches[0].pageY;
  }else{
    moveEndX = e.originalEvent.changedTouches[0].pageX,
    moveEndY = e.originalEvent.changedTouches[0].pageY;
    var X = moveEndX - startX,
    Y = moveEndY - startY;
    if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
      //console.log("left 2 right");
    }
    else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
      //console.log("right 2 left");
    }
    else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
      //console.log("top 2 bottom");
    }
    else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
      //console.log("bottom 2 top");
    }
    else{
      //console.log("just touch");
    }
  }
});