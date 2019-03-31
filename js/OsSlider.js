/**
 * 阳光Slider
 * By https://oss.so/ [橙色阳光出品]
 * v1.1.20160628 [六月修正]
 * options {Object} [星号必选，其余有缺省配置]
 *    |- container {selector} 容器 *
 *    |- main {selector} 节点承载ul *
 *    |- item {selector} 切换节点 *
 *    |- prev {selector} 上一步按钮 *
 *    |- next {selector} 下一步按钮 *
 *    |- arrowMain {selector} 焦点承载ul
 *    |- isArrow {boolen} 是否启用焦点
 *    |- width {number} 外设宽度
 *    |- height {number} 外设高度
 *    |- time {number} 切换时间 单位:ms || 默认500
 *    |- autoTime {number} 自动播放时间 单位:ms || 默认5000
 *    |- auto {boolen} 是否自动
 *    |- loop {boolen} 是否循环
 *    |- type {string} 'fade'?渐变:左右
 *    |- animate {string} 'not'?左右切换不用动画
 *    |- arrowType {string} 'img'?焦点读取节点中的图片:创建空li
 *    |- mouseStop {boolen} 是否悬停
 *    |- resize {boolen} 是否自适应
 *    |- afterSlideCallback {function} 每次滑动后的回调
 */
var OsSlider = function(options) {
    this.options = options;
    if (!this.options) {
        console.error("options error argument");
        return false;
    }
    this.container = $(this.options.container); // 幻灯容器
    this.main = $(this.options.main); // 承载ul
    this.item = $(this.options.item); // 切换节点
    this.prev = $(this.options.prev); // 上一步按钮
    this.next = $(this.options.next); // 下一步按钮
    this.arrowMain = $(this.options.arrowMain); // 焦点ul
    this.width = this.options.width || $(this.item).width(); // 是否外设宽度
    this.height = this.options.height || $(this.item).height(); // 是否外设高度
    this.sum = this.item.length;
    this.times = this.options.times || 500;
    this.autoTimes = this.options.autoTimes || 5000;
    this.afterSlideCallback = this.options.afterSlideCallback || function() {};

    this.zIndex = this.sum * 2 + 40; // 预览渐变的z-index
    this.now = 0;
    this.status = true;
    this.startX = 0;
    this.moveX = 0;
    this.autoNum = 0;


    this.init();
    this.resize();
};
/**
 * 更新一次各个dom的高宽
 */
OsSlider.prototype.update = function() {
    var that = this;
    this.container.css({
        "width": this.width + 'px',
        "height": this.height + 'px'
    });
    if (this.options.type == 'fade') {
        this.main.css({
            "width": this.width + 'px',
            "height": this.height + 'px'
        });
        this.item.each(function(index,el){
            $(this).css({
                "width": that.width + 'px',
                "height": that.height + 'px',
                "z-index": that.zIndex - (index*2)
            });
        });
    } else {
        this.main.css({
            "width": this.width*this.sum + 'px',
            "height": this.height + 'px'
        });
        this.item.css({
            "width": this.width + 'px',
            "height": this.height + 'px'
        });
    }
};
/**
 * 切换图片
 * @param {String} command 前后指令
 * @param {Number} tid 下一张图ID
 * 两个参数二选一，留空默认下一张
 * options.loop 判断是否循环
 * options.type 判断切换类型
 * options.animate 判断左右切换是否有动画
 */
OsSlider.prototype.toggle = function(command,tid) {
    var that = this;
    if (this.status) {
        this.status = false;
        if (command == 'prev') {
            tid = this.now - 1;
            if (tid < 0) {
                if (this.options.loop) {
                    tid = this.sum - 1;
                } else {
                    tid = 0;
                }
            }
            this.options.afterSlideCallback(tid,'left')

        } else if (command == 'next') {
            tid = that.now + 1;
            if (tid > this.sum - 1) {
                if (this.options.loop) {
                    tid = 0;
                } else {
                    tid = this.sum -1;
                }
            }
            this.options.afterSlideCallback(tid,'right')
        } else if (!tid && tid!=0) {
            tid = this.now + 1;
            if (tid > this.sum - 1 && this.options.loop) {
                tid = 0;
            } else {
                tid = this.sum -1;
            }
            this.options.afterSlideCallback(tid,'right')
        }

        if (this.options.type == 'fade') {
            this.item.eq(tid).css({
                'z-index' : this.zIndex-1
            });
            this.item.eq(this.now).fadeOut(this.times,function(){
                that.item.eq(that.now).css('z-index',that.now).show();
                that.item.eq(tid).css('z-index',that.zIndex);
                that.now = tid;
                that.status = true;
                that.arrow();
                that.autoNum = 0;
            });

            return this;
        }

        if (this.options.animate == 'not') {
            this.main.css({
                'margin-left' : this.container.width()*tid*-1
            });
            this.now = tid;
            this.status = true;
            this.arrow();
            this.autoNum = 0;
            return this;
        }

        this.main.animate({
            'margin-left' : this.container.width()*tid*-1
        },this.times,function(){
            that.now = tid;
            that.status = true;
            that.arrow();
            that.afterSlideCallback(that.now);
            that.autoNum = 0;
        });
    }

    return this;
};
/**
 * 初始化
 * 绑定事件、创建焦点、判断是否悬停、判断是否自动
 */
OsSlider.prototype.init = function() {
    var that = this;
    that.update();

    this.prev.on('click',function(){
        that.toggle('prev');
    });
    this.next.on('click',function(){
        that.toggle('next');
    });

    if (this.options.isArrow) {
        if (this.options.arrowType == 'img') {
            for (var i = 0; i < this.sum; i++) {
                var _str = '<li><img src="'+this.item.eq(i).find('img').attr('src')+'"></li>'
                $(_str).appendTo(this.arrowMain);
            }
            this.arrowMain.css({
                width: this.arrowMain.find('li').outerWidth() * this.sum
            });
        } else {
            for (var i = 0; i < this.sum; i++) {
                $('<li>'+(i+1)+'</li>').appendTo(this.arrowMain);
            }
        }
    }
    this.arrow();

    this.arrowMain.find('li').each(function(index,el) {
        $(this).on('click',function(){
            that.toggle(null,index);
        });
    });

    if (this.options.mouseStop) {
        this.item.on('mouseenter',function() {
            that.status = false;
            that.autoNum = 0;
        }).on('mouseleave',function() {
            that.status = true;
        });
    }

    if (!this.options.auto) {
        return this;
    }
    setTimeout(function(){
        if (that.status) {
            that.autoNum++;
            if (that.autoNum >= that.autoTimes/1000) {
                that.toggle('next');
            }
        }
        setTimeout(arguments.callee,1000);
    },1000);

    return this;
};
/**
 * 焦点切换
 */
OsSlider.prototype.arrow = function() {
    this.autoNum = 0;
    if (this.options.isArrow) {
        this.arrowMain.find('li').removeClass('active');
        this.arrowMain.find('li').eq(this.now).addClass('active');
    }
    return this;
};
/**
 * 监听resize，通过options.resize控制
 */
OsSlider.prototype.resize = function() {
    if (this.options.resize) {
        var that = this;
        $(window).resize(function() {
            that.width = $(document).width();
            that.container.css({
                "width": that.width + 'px',
                "height": that.height + 'px'
            });
            if (that.options.type == 'fade') {
                that.main.css({
                    "width": that.width + 'px',
                    "height": that.height + 'px'
                });
                that.item.each(function(index,el){
                    $(this).css({
                        "width": that.width + 'px',
                        "height": that.height + 'px'
                    });
                });
            } else {
                that.main.css({
                    "width": that.width*that.sum + 'px',
                    "height": that.height + 'px'
                });
                that.item.css({
                    "width": that.width + 'px',
                    "height": that.height + 'px'
                });
            }
        });
    }
    return this;
}
