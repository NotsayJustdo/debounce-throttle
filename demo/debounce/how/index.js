/**
 * 演示如何使用debounce
 *
 * @description: 
 * @param {Function} func 需要进行防抖处理的函数 
 * @param {Number} [wait=0] 延迟执行的时间
 * @param {Object} [options={leading: false, trailing: true}] 这个对象其实包含三个属性，在默认值里面里面只有两个属性
 *                 options.leading=false(boolean) 用于指明是否在设置完的定时器之后立即调用函数
 *                 options.maxWait (number) 函数调用最大的延迟时间
 *                 options.trailing=true (boolean) 用于指明是否在设置的定时器回调执行时调用函数
 * @return {Function} 返回一个新的防抖函数
 * 
 *_.debounce(func, [wait=0], [options={}]) // 调用方式
 * 
 */
$(document).ready(function(){

  // 演示动画类
  class Animation {
   /**
   * @description: 构造函数
   * @param {Object} $rawDiv 未进行防抖处理的演示区域 
   * @param {Object} $debounceDiv 进行防抖处理的演示区域
   * @param {Object} $triggerArea 事件触发区域
   * @param {Object} $reset 重置按钮
   * @return:
   */
    constructor($rawDiv, $debounceDiv, $triggerArea, $reset, options) {
      this.$rawDiv = $rawDiv;
      this.$debounceDiv = $debounceDiv;
      this.$triggerArea = $triggerArea;
      this.$reset = $reset;
      this.initialized = options.initialized;
      this.frequency = options.frequency;
      this.leading = options.leading;
      this.trailing = options.trailing;
      this.barLength = options.barLength;
      this.globalColor = options.globalColor;
      this.interval_id = null;
      this.rawColor = options.rawColor;
      this.debounceColor = options.debounceColor;
      this.maxBarLength = options.maxBarLength;
    }

    init() {
      this.bindEvent();
      // 得到防抖函数
      this.changeDebouncedColor = _.debounce(() => {
          // 改变颜色可以更容易的看出触发的事件组
          this.globalColor++;
          if (this.globalColor > 9){
            this.globalColor = 2;
          }
        }, this.frequency*4, { leading:false, trailing:true }) 
      
      this.drawDebouncedEvent = _.debounce(() => {
          this.debounceColor = this.globalColor;
        }, this.frequency*4, { leading: this.leading, trailing: this.trailing });
    }
    /**
    * @description: 绘制防抖事件
    * @return {Function} 防抖函数
    */
    drawDebouncedEvent() {
      return _.debounce(() => {
        this.debounceColor = this.globalColor;
      }, this.frequency*4, { leading:false, trailing:true });
    }
    
    /**
    * @description: 每隔x毫秒绘制一个竖条
    * @return
    */
    draw_tick_marks(){
      // 设置定时器
      this.interval_id = setInterval(() => {
        this.barLength++;   
        this.$rawDiv.append('<span class="color' + this.rawColor + '" >');
        this.$debounceDiv.append('<span class="color' + this.debounceColor + '" >');
        this.rawColor = 0; // 再次设置为透明
        this.debounceColor = 0; // 再次设置为透明
            
        if (this.barLength > this.maxBarLength){
          clearInterval(this.interval_id);
        }
      }, this.frequency);
    }
    /**
     * 绑定事件
     */
    bindEvent() {
      // 鼠标移动或者是点击触发事件
      this.$triggerArea.on('click mousemove', () => {  
        if (!this.initialized) {
          this.initialized = true;
          this.draw_tick_marks();
          $(this.$triggerArea).addClass('active');
        } 
        this.rawColor = this.globalColor;
        this.drawDebouncedEvent();
        this.changeDebouncedColor();
      });

      // 重置演示区域
      this.$reset.on('click', () => {
        this.initialized = false;
        this.$triggerArea.removeClass('active');
        this.$rawDiv.empty();
        this.$debounceDiv.empty();
        this.barLength = 0;
        clearInterval(this.interval_id);
      });
    }
  }

  // 第一个动画的创建
  var $rawDiv = $('#animation1 .raw-events'),
      $debounceDiv = $('#animation1 .debounced-events'),
      $triggerArea = $('#animation1 .trigger-area'),
      $reset = $('#animation1 .reset');
      options = {
        initialized: false,
        frequency: 100,
        leading: false,
        trailing: true,
        barLength: 0,
        globalColor: 2,
        rawColor: 0,
        debounceColor: 0,
        maxBarLength: 87
      }
  const animation1 = new Animation($rawDiv, $debounceDiv, $triggerArea, $reset, options);
  animation1.init();

  // 第二个动画的创建
  var $rawDiv2 = $('#animation2 .raw-events'),
  $debounceDiv2 = $('#animation2 .debounced-events'),
  $triggerArea2 = $('#animation2 .trigger-area'),
  $reset2 = $('#animation2 .reset');
  options2 = {
    initialized: false,
    frequency: 100,
    leading: false,
    trailing: true,
    barLength: 0,
    globalColor: 2,
    rawColor: 0,
    debounceColor: 0,
    maxBarLength: 87
  }
const animation2 = new Animation($rawDiv2, $debounceDiv2, $triggerArea2, $reset2, options2);
animation2.init();

});
