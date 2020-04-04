// 滚动页面的时候每秒很容易触发30次事件，在移动端上面慢慢的滚动的话每秒可以触发100次事件
var i = 0;
var $counter = $('#counter');
$(document).ready(function(){
  $(document).on('scroll', function(){
    $counter.html(i);
    i++; 
  });
});

$('.reset').on('click', function(){
  $counter.html('0');
  i = 0;
})
