; (function (window) {

  $(function () {
    var item = new Items();
    item.init();
  });

  var Items = function () {
    this.brabdAble1 = false;
    this.brabdAble2 = false;
    this.brabdAble3 = false;
    this.brabdAble4 = false;
  }

  Items.prototype.init = function() {
    $('.bout_photo_bottom_content1 .content1').on('click','a',this.onShowBackImg1.bind(this));
    $('.bout_photo_bottom_content1 .img_back1').on('mouseout',this.onBlurImage1.bind(this));

    $('.bout_photo_bottom_content2 .content2').on('click','a',this.onShowBackImg2.bind(this));
    $('.bout_photo_bottom_content2 .img_back2').on('mouseout',this.onBlurImage2.bind(this));

    $('.bout_photo_bottom_content3 .content3').on('click','a',this.onShowBackImg3.bind(this));
    $('.bout_photo_bottom_content3 .img_back3').on('mouseout',this.onBlurImage3.bind(this));

    $('.bout_photo_bottom_content4 .content4').on('click','a',this.onShowBackImg4.bind(this));
    $('.bout_photo_bottom_content4 .img_back4').on('mouseout',this.onBlurImage4.bind(this));
  }

  Items.prototype.onShowBackImg1 = function() {
    this.brabdAble1 = true;
    this.queryImage1()
  }

  Items.prototype.onShowBackImg2 = function() {
    this.brabdAble2 = true;
    this.queryImage2()
  }

  Items.prototype.onShowBackImg3 = function() {
    this.brabdAble3 = true;
    this.queryImage3()
  }

  Items.prototype.onShowBackImg4 = function() {
    this.brabdAble4 = true;
    this.queryImage4()
  }

  Items.prototype.queryImage1 = function() {
    if(this.brabdAble1){
      $('.bout_photo_bottom_item1').css({
        display:'none'
      })
      $('.bout_photo_bottom_content1 .img_back1').css({
        display:'block',
        position:'relative',
        width:'100%',
        top:'2.2em',
      })
    }
  }

  Items.prototype.queryImage2 = function() {
    if(this.brabdAble2){
      $('.bout_photo_bottom_item2').css({
        display:'none'
      })
      $('.bout_photo_bottom_content2 .img_back2').css({
        display:'block',
        position:'relative',
        width:'100%',
      })
    }
  }

  Items.prototype.queryImage3 = function() {
    if(this.brabdAble3){
      $('.bout_photo_bottom_item3').css({
        display:'none'
      })
      $('.bout_photo_bottom_content3 .img_back3').css({
        display:'block',
        position:'relative',
        width:'100%',
        top:'2.2em'
      })
    }
  }

  Items.prototype.queryImage4 = function() {
    if(this.brabdAble4){
      $('.bout_photo_bottom_item4').css({
        display:'none'
      })
      $('.bout_photo_bottom_content4 .img_back4').css({
        display:'block',
        position:'relative',
        width:'100%',
      })
    }
  }

  Items.prototype.onBlurImage1 = function () {
    this.brabdAble1 = false;
    $('.bout_photo_bottom_item1').css({
      display:'block'
    })
    $('.bout_photo_bottom_content1 .img_back1').css({
      display:'none',
    })
  }

  Items.prototype.onBlurImage2 = function () {
    this.brabdAble2 = false;
    $('.bout_photo_bottom_item2').css({
      display:'block'
    })
    $('.bout_photo_bottom_content2 .img_back2').css({
      display:'none',
    })
  }

  Items.prototype.onBlurImage3 = function () {
    this.brabdAble3 = false;
    $('.bout_photo_bottom_item3').css({
      display:'block'
    })
    $('.bout_photo_bottom_content3 .img_back3').css({
      display:'none',
    })
  }

  Items.prototype.onBlurImage4 = function () {
    this.brabdAble4 = false;
    $('.bout_photo_bottom_item4').css({
      display:'block'
    })
    $('.bout_photo_bottom_content4 .img_back4').css({
      display:'none',
    })
  }


  $(function(){
    var setArraw = setInterval(function(){
			var height = $('.bout_photo_bottom_item1 .img_font1').height();
      $('.bout_photo_bottom_item1 span').css('height',height-1);
      $('.bout_photo_bottom_item2 span').css('height',height-1);
      $('.bout_photo_bottom_item3 span').css('height',height-1);
      $('.bout_photo_bottom_item4 span').css('height',height-1);
			if(height > 0){
				clearInterval(setArraw)
			}
		},100)
  })


  $(function(){
    $('.bout_photo_bottom_item1 span').on({
      mouseover:function(){
        $('.bout_photo_bottom_item1 .img_font1').css({
          display:"none"
        })
        $('.bout_photo_bottom_item1 .img_after1').css({
          display:'block',
        })
     },
     mouseout:function(){
       $('.bout_photo_bottom_item1 .img_after1').css({
         display:'none'
       })
       $('.bout_photo_bottom_item1 .img_font1').css({
         display:"block"
       })
     }
    })

    $('.bout_photo_bottom_item2 span').on({
      mouseover:function(){
        $('.bout_photo_bottom_item2 .img_font2').css({
          display:"none"
        })
        $('.bout_photo_bottom_item2 .img_after2').css({
          display:'block'
        })
     },
     mouseout:function(){
       $('.bout_photo_bottom_item2 .img_after2').css({
         display:'none'
       })
       $('.bout_photo_bottom_item2 .img_font2').css({
         display:"block"
       })
     }
    })

    $('.bout_photo_bottom_item3 span').on({
      mouseover:function(){
        $('.bout_photo_bottom_item3 .img_font3').css({
          display:"none"
        })
        $('.bout_photo_bottom_item3 .img_after3').css({
          display:'block'
        })
     },
     mouseout:function(){
       $('.bout_photo_bottom_item3 .img_after3').css({
         display:'none'
       })
       $('.bout_photo_bottom_item3 .img_font3').css({
         display:"block"
       })
     }
    })

    $('.bout_photo_bottom_item4 span').on({
      mouseover:function(){
        $('.bout_photo_bottom_item4 .img_font4').css({
          display:"none"
        })
        $('.bout_photo_bottom_item4 .img_after4').css({
          display:'block'
        })
     },
     mouseout:function(){
       $('.bout_photo_bottom_item4 .img_after4').css({
         display:'none'
       })
       $('.bout_photo_bottom_item4 .img_font4').css({
         display:"block"
       })
     }
    })
  })

})(window);
