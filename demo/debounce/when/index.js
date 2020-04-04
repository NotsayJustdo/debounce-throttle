$(function(){
  
  (function() {
    var $left_panel = $('.left-panel'),
      $right_panel = $('.right-panel');
  
    function display_info($div, targetInfo) {
      $div.append(targetInfo.width + ' x ' + targetInfo.height +  '<br>');
    }

    var el = document.querySelector('.resizeDemo .container');

    const resizeObserver = new ResizeObserver((entries) => {
      display_info($left_panel, entries[0].contentRect)
    })

    const resizeObserver2 = new ResizeObserver(_.debounce((entries) => {
      display_info($right_panel, entries[0].contentRect)
    }, 400, {leading: false, trailing: true}))
    resizeObserver.observe(el);
    resizeObserver2.observe(el)
  })();


  (function() {

    var $statusKey = $('.status-key');
    var $statusAjax = $('.status-ajax');
    var intervalId;
      
    // 模拟发起请求
    function make_ajax_request(e){
      var that = this;
      $statusAjax.html('等待的时间已到，现在发起ajax请求');
      
      intervalId = setTimeout(function(){
          $statusKey.html('输入字符，当停止输入时会检测到');
          $statusAjax.html('');
          $(that).val(''); // empty field
      },2000);
    }
      
    // 等用户输入时触发
    $('.autocomplete').on('keydown', function (){  
      $statusKey.html('等待输入更多的字符！');
      clearInterval(intervalId);             
    })
    // 用户输入停止时发起ajax请求
    // 这里测试时等待的时间写的长一些，真正在项目中使用时用50mn到200ms最好
    $('.autocomplete').on('keydown', _.debounce(make_ajax_request, 1300));
  })();
});
