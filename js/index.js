; (function (window) {

  $(function(){
    if(location.pathname.indexOf('addIndex') == -1){
      var setArraw = setInterval(function(){
        var height = $('.index_photo_gallery_right_first .right_top_item1 img').height();
        var width = $('.index_photo_gallery_right_first .right_top_item1 img').width();
        $('.index_photo_gallery_right_first .right_top_item1').css({
          maxHeight:height + 'px',
        })
        $('.index_photo_gallery_right_first .right_top_item2').css({
          maxHeight:height + 'px',
        })
        if(height > 0){
          clearInterval(setArraw)
        }
      },100)
    }
  })

 //控制首页产品三个类型图的高度
  $(function(){
    if(location.pathname.indexOf('addIndex') == -1){
      var setArraw = setInterval(function(){
        var height = $('.index_three_wrap img').height();
        $('.index_three_image').css({
          height:height
        })
        $('.index_three_container').css({
          minHeight:height + 20
        })
        if(height > 0){
          clearInterval(setArraw)
        }
      },100)
    }
    //IE11下的样式
    if(/*@cc_on!@*/true){

    }
  })

  //设置
  $(function(){
    console.log('hh',$('.index_three_image img').height());
    $('.index_three_image').css({
      height:$('.index_three_image img').height()
    })
  })


  $(function(){
    $('.addindex_first_img a').on({
      mouseover:function(){
        $('.addindex_first_qrcode').css({
          display:'block'
        })
        $('.addindex_first_qrcode .show_qrcode').empty();
        $('.addindex_first_qrcode .show_qrcode').qrcode({
          render:'canvas',
          text: 'https://www.muaskin.com/wx/?fallback=L3NraW5Ib3VzZWtlZXBlci9yZXNlcnZhdGlvbg%3D%3D&invite_code=7db1c97ffcf6ae7028bc8bcc530bafb9',
          width:100,
          height:100
        });
        $('.addindex_first_qrcode .show_qrcode').css({
          marginLeft:'0.5em'
        })
     },
     mouseout:function(){
       $(".addindex_first_qrcode").css("display","none")
     }
    })
  });
})(window);
