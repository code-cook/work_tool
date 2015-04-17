$(function(){
  var $body = $('body');
  var $activeSection; // 当前选中的section
  var $section = $('.section');
  var timer;
  var $arrow = $('.arrow');

  /*阻止滑动默认事件*/
  $section.on('touchmove', function(e){
      e.preventDefault();
      return false;
  })

  $(window).load(function(){
    $section.off();
    $('#main').removeClass('nodis');
    $(window).trigger('resize');
  })

  // 重置元素状态
  function resetStatus(){
    $('.top, .bottom, .content', $('.spring-page-1')).removeClass('touch');
    $('.step-desc, .min-img').removeClass('animated slide touch');
    $('.page9-c, .buy-btn').removeClass('show');
  }

  $('#main').fullpage({
    verticalCentered: true,
    resize: true,
    css3: true,
    touchSensitivity: 15,
    //anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9'],
    afterLoad: function(anchor, index){
      disabledScroll();
      $body.off('touchend.page');
      resetStatus();

      $activeSection = $('.spring-page-' + index);
      var $stepDesc = $('.step-desc', $activeSection);
      var $minImg = $('.min-img', $activeSection);

      switch(index){
        case 2:
        case 8:
            $body.on('touchend.page', function(){
              $stepDesc.addClass('animated slide');
              enableScroll(1000);
            });
          break;
        case 7:
            $body.on('touchend.page', function(){
              $stepDesc.addClass('animated slide');
              $minImg.addClass('animated touch');
              enableScroll(1000);
            });
          break;
        case 9:
            $('.page9-c, .buy-btn', $activeSection).addClass('show');
            enableScroll(1000);
          break;
      }

      if($stepDesc.length > 0 && $stepDesc.hasClass('auto')){
        $stepDesc.addClass('animated slide');
        enableScroll(1000);
      }
      if($minImg.length > 0 && $minImg.hasClass('auto')){
        $minImg.addClass('animated touch');
        enableScroll(1000);
      }

      if(index == 9){ $arrow.hide(); }else{ $arrow.show(); }
    },
    afterRender: function(){
    }
  });
  // 上滑
  function disabledScrollUp(){
    $.fn.fullpage.setAllowScrolling(false, 'up');
  }

  function enableScrollUp(){
    $.fn.fullpage.setAllowScrolling(true, 'up');
  }

  // 下滑
  function disabledScrollDown(){
    $.fn.fullpage.setAllowScrolling(false, 'down');
  }

  function enableScrollDown(){
    $.fn.fullpage.setAllowScrolling(true, 'down');
  }

  // 禁止滑动
  function disabledScroll(){
    clearTimeout(timer);
    disabledScrollUp();
    disabledScrollDown();
  }

  // 允许滑动
  function enableScroll(time){
    if(!time || time==0){
      enableScrollUp();
      enableScrollDown();
    }else{
      if(!!timer){
        clearTimeout(timer);
      }
      timer = setTimeout(function(){
        enableScrollUp();
        enableScrollDown();
      }, time);
    }
  }
});

