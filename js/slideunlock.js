;(function ($,window,document,undefined) {
    function SliderUnlock(elm, options, success){
        var me = this;
        var $elm = me.checkElm(elm) ? $(elm) : $;
        success = me.checkFn(success) ? success : function(){};

        var opts = {
            successLabelTip:  "Successfully Verified",
            duration:  200,
            swipestart:  false,
            min:  0,
            max:  $elm.width(),
            index:  0,
            isOk:  false,
            lableIndex:  0,
            timecount: 0
        };
        opts = $.extend(opts, options||{});
        me.elm = $elm;
        me.opts = opts;
        me.swipestart = opts.swipestart;
        me.min = opts.min;
        me.max = opts.max;
        me.index = opts.index;
        me.isOk = opts.isOk;
        me.labelWidth = me.elm.find('#label').width();
        me.sliderBg = me.elm.find('#slider_bg');
        me.lableIndex = opts.lableIndex;
        me.timecount = opts.timecount;
        me.success = success;  
    }

    SliderUnlock.prototype.timescount = function () {
        var me = this;

        
        setTimeout(function(){
            me.timecount= me.timecount+1;
            me.timescount();
        },30)

    };

    

    SliderUnlock.prototype.init = function () {
        var me = this;
        

        me.updateView();
        me.elm.find("#label").on("mousedown", function (event) {
            var e = event || window.event;
            me.lableIndex = e.clientX - this.offsetLeft;

            me.handerIn();
        }).on("mousemove", function (event) {
            me.handerMove(event);
        }).on("mouseup", function (event) {
            me.handerOut();
        }).on("mouseout", function (event) {
            me.handerOut();
        }).on("touchstart", function (event) {
            var e = event || window.event;
            me.timescount();
            me.lableIndex = e.originalEvent.touches[0].pageX - this.offsetLeft;
          
            me.handerIn();
        }).on("touchmove", function (event) {
            me.handerMove(event, "mobile");
        }).on("touchend", function (event) {
            me.handerOut();
        });
    };


    SliderUnlock.prototype.handerIn = function () {
        var me = this;
        me.swipestart = true;
        me.min = 0;
        me.max = me.elm.width();
    };
    SliderUnlock.prototype.handerOut = function () {
        var me = this;
        //停止
        me.swipestart = false;
        //me.move();
        if (me.index < me.max) {
            me.reset();
        }
    };
    SliderUnlock.prototype.handerMove = function (event, type) {
        var me = this;
        if (me.swipestart) {
            event.preventDefault();
            event = event || window.event;
            if (type == "mobile") {
                me.index = event.originalEvent.touches[0].pageX - me.lableIndex;
             
            } else {
                me.index = event.clientX - me.lableIndex;
            }
            me.move();
        }
    };
    SliderUnlock.prototype.move = function () {
        var me = this;
        if ((me.index + me.labelWidth) >= me.max) {
            me.index = me.max - me.labelWidth -2;
            //停止
            me.swipestart = false;
            //解锁
            me.isOk = true;
        }
        if (me.index < 0) {
            me.index = me.min;
            //未解锁
            me.isOk = false;
        }
        if (me.index+me.labelWidth+2 == me.max && me.max > 0 && me.isOk) {
            //解锁默认操作
            $('#label').unbind().next('#labelTip').
            text(me.opts.successLabelTip).css({'color': '#fff'});

            me.success();
        }
        me.updateView();
    };
    SliderUnlock.prototype.updateView = function () {
        var me = this;

        me.sliderBg.css('width', me.index);
        me.elm.find("#label").css("left", me.index + "px")

        if(me.index+2 == (me.max - $("#label")[0].clientWidth)){
            $(".verify-lockable")[0].value = 1;
        }else{
            $(".verify-lockable")[0].value = 0;
        }
        
    };
    SliderUnlock.prototype.reset = function () {

        document.querySelector('#label>img').src ='/assets/weixin/ActivityNew/img/slider.png';
         document.querySelector('#labelTip').innerHTML ='向右滑动完成投票';
         document.querySelector('#labelTip').setAttribute('class','shadow');
          document.querySelector('#label>img').setAttribute('class','aaa');
        var me = this;

        me.index = 0;
        me.sliderBg .animate({'width':0},me.opts.duration);
        me.elm.find("#label").animate({left: me.index}, me.opts.duration)
            .next("#lableTip").animate({opacity: 1}, me.opts.duration);
        me.updateView();
    };
    SliderUnlock.prototype.checkElm = function (elm) {
        if($(elm).length > 0){
            return true;
        }else{
            throw "this element does not exist.";
        }
    };
  
    SliderUnlock.prototype.checkFn = function (fn) {
        if(typeof fn === "function"){
            return true;
        }else{
            throw "the param is not a function.";
        }
    };
    window['SliderUnlock'] = SliderUnlock;
})(jQuery, window, document);

var xr = new xrev({canvas: true});
var xrevn = xr.get();
var xrevwh = xr.getScreenResolution();
