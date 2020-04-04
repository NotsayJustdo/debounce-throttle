$(function(){
  
  // 每300ms检查一次现在滚动到的位置
  $(document).on('scroll', _.throttle(function(){
    check_if_needs_more_content();
  }, 300));

  function check_if_needs_more_content() {     
    pixelsFromWindowBottomToBottom = 0 + $(document).height() - $(window).scrollTop() -$(window).height();
    
    if (pixelsFromWindowBottomToBottom < 200){
      // 如果到达了底部模拟加载
      $('body').append($('.item').clone()); 
    }
  }
});
