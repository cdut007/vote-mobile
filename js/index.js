
$(function(){
    //首页

$('.zhezhao2').height($(window).height());
$(window).resize(function() {
    $('.zhezhao2').height($(window).height());
});
$('.my_know').click(function() {
    $('.lfy_6bangtou_alert').hide();
    $('.zhezhao2').hide();
});
function changeImghide(){


  $('.item-img').each(function(i,j){
  
if($(j).attr('src') == 'https://www.qmwtp.com/'){

      $(j).hide();
	    $(j).parent().addClass('top_top');
      $(j).siblings('.lfy_name_xuanshou').addClass('left_1');
      $(j).siblings('.lfy_piaoshu').addClass('right_1');
  }


})

}
if (list_hp==2) {
   $(function(){
            var pid = $('#pid').val();
            /*瀑布流初始化设置*/
            var $grid = $('.grid').masonry({
                itemSelector : '.grid-item',
                gutter:10
            });
            // layout Masonry after each image loads
            $grid.imagesLoaded().done( function() {
                //console.log('uuuu===');
                $grid.masonry('layout');
            });
            var dataFall = [];
            //var totalItem = 5;
            var totalPage = lo_ad;
            var  pageIndex = 0;
            var  flagLoad = true;  //只有当页面请求加载成功之后，才可以再次请求，避免重复请求后台数据
            var nameOrTelOrNum = $("#nameOrTelOrNum").val();
            $(window).scroll(function(){
                //console.log(flagLoad);
                $grid.masonry('layout');
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
            if(pageIndex < totalPage && flagLoad){
                if(scrollTop + windowHeight > scrollHeight-20){
                    flagLoad = false;
                    pageIndex++;
                    $('.more-a').html('加载中...');
                    $.ajax({
                        dataType:"json",
                        type:'get',
                        data:{page:pageIndex},
                        url:lo_ad_url,
                        success:function(result){

                            dataFall = result.art;
                            flagLoad = false;
                            //alert(result.art);

                               appendFall();
                                 $('.item-img').each(function(i,j){
  
                                      if($(j).attr('src') == 'https://www.qmwtp.com/'){

                                            $(j).hide();
                                      	    $(j).parent().addClass('top_top');
                                            $(j).siblings('.lfy_name_xuanshou').addClass('left_1');
                                            $(j).siblings('.lfy_piaoshu').addClass('right_1');
                                        }


                                      })

                        },
                        error:function(e){
                            flagLoad = true;
                        }
                    })

                }
            }else{
                setTimeout(function(){
                    $('.more-a').show();
                    $(".more-a").html('没有更多了');
                },2000);
            }
    });



            function appendFall(){
                $.each(dataFall, function(index ,value) {

                    var dataLength = dataFall.length;
                    $grid.imagesLoaded().done(function() {
                        $grid.masonry('layout');
                    });
                    var $str = $('<a href="' + value.encrypt_param + '"><div class="grid-item item"><img class="item-img"  src="'+value.player_slpic+'"><div class="lfy_name_xuanshou font12">' + value.player_name + '</div><div class="lfy_piaoshu font12">' + value.get_votes + '票</div><div class="lfy_toupiao_btn"><p class="lfy_toupian font14">投票</p></div><p class="lfy_number font14">' + value.player_num + '号</p></div></a>');

                    var $items = $str;
                    if(index == dataFall.length -1){
                        setTimeout(function(){
                          flagLoad = true;
                        },500)
                        
                    }
;
                    //$items.imagesLoaded().done(function(){
                        $grid.masonry('layout');

                        $grid.append( $items ).masonry('appended', $items);
                    //})
                });
            }
        })
}

        $('#nameOrTelOrNum').val('');
        $('#search').click(function(){
            var nameOrTelOrNum = $('#nameOrTelOrNum').val();
            /*if(nameOrTelOrNum=='' || nameOrTelOrNum==null || nameOrTelOrNum=='undefined')
             {
             alert("搜索内容不能为空！");
             return false;
             }*/
	    if(group_1=="" && nameOrTelOrNum.length>0)
	    {

	    	window.location.href=""+link_2+"/"+encodeURI(nameOrTelOrNum)+"";
	    }else if(group_1.length>0 && nameOrTelOrNum.length>0){
	    	window.location.href=""+link_2+"/"+encodeURI(nameOrTelOrNum)+"/"+group_1;
	    }else if(group_1 == "" && nameOrTelOrNum == "")
	    {
	    	window.location.href=link_3;
	    }

        })

    //<!--搜索-->


  	//判断是否有图


changeImghide()
//判断iphoneX
function isIphoneX() {
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
}
if (isIphoneX()) {
    $('.lfy_foot_btn').css('height', '80px');
} else {
    $('.lfy_foot_btn').css('height', '51px');
}


//清除漂浮
    if ($('.float-box').find('img').attr("src") == '') {
        $('.float-box').remove();
    }


    //排行榜

//判断iphoneX
  function isIphoneX(){
      return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
  }
  if(isIphoneX()){
    $('.lfy_4foot_btn').css('height', '80px');
  }else{
    $('.lfy_4foot_btn').css('height', '50px');
  }

  $('.piao_numer').click(function(){
        $('.piao_numer').removeClass('renqi_tab');
        $('.piao_numer').find('.ph_line').hide();
        $(this).addClass('renqi_tab');
        $(this).find('.ph_line').show();
        $('.lfy_4mingci_box').hide();
        $('.lfy_4mingci_box').eq($(this).index()).show();
    })


    //详情页面js
        //-------------------------------------------

                    // 遮罩跟弹窗
                    $('.lfy_6zhezhao').height($(window).height());
                    $('.lfy_6cha').click(function(){
                        $('.lfy_6zhezhao').hide();
                        $('.lfy_6chenggong_alert').hide();
                    })

                    $('.lfy_6bangtou_txt').click(function(){
                        $('.lfy_6zhezhao').show();
                        $('.fenxiang_img').show();
                        $('.zhidao').show();
                    })
                    $('.zhidao').click(function(){
                        $('.lfy_6zhezhao').hide();
                        $('.fenxiang_img').hide();
                        $('.zhidao').hide();
                    })
                    $('.guanbi_img').click(function(){
                        $('.lfy_6bangtou_alert').hide();
                        $('.lfy_6zhezhao').hide();
                    })


                function isIphoneX(){
                      return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
                  }
                  if(isIphoneX()){
                    $('.lfy_6foot_btn').css('cssText', 'height:80px !important');
                  }else{
                    $('.lfy_6foot_btn').css('height', '46px');
                  }


             $('.zhezhao2').height($(window).height());
            $('.zhidao_btn').click(function(){
                $('.zhidao_btn').hide();
                $('.zhezhao2').hide();
            })

            //改动后的js
            // 只能投一次我知道点击
            $('.my_know').click(function(){
                $('.lfy_6zhezhao').hide();
                $('.lfy_6bangtou_alert').hide();
                $('.zhezhao2').hide();

            })

            // 为他加人气点击

            //人气弹窗×
            $('.renqi_cha').click(function(){
                $('.lfy_6zhezhao').hide();
                $('.renqi_alert').hide();
            })

            // 点击分享提示
            $('.lfy_6yellow').click(function(){
                $('.lfy_6chenggong_alert').hide();
                $('.lfy_6zhezhao').hide();
                setTimeout(function(){
                    $(".tishi_chuang").stop(true).fadeIn(500).delay(500).fadeOut(500);
                },200)

            })


            //懒加载

            var lazyLoad = (function(){
                var clock;

                function init(){
                    $(window).on("scroll", function(){
                        if (clock) {
                            clearTimeout(clock);
                        }
                        clock = setTimeout(function(){
                            checkShow();
                        }, 400);
                    })
                    checkShow();
                }

                function checkShow(){
                    $(".load img").each(function(){
                        var $cur =$(this);
                        if($cur.attr('isLoaded')){
                            return;
                        }
                        if(shouldShow($cur)){
                            showImg($cur);
                        }
                    })
                }
                function shouldShow($node){
                    var scrollH = $(window).scrollTop(),
                        winH = $(window).height(),
                        top = $node.offset().top;
                    if(top < winH + scrollH){
                        return true;
                    }else{
                        return false;
                    }
                }
                function showImg($node){
                    $node.attr('src', $node.attr('data-img'));
                    $node.attr('isLoaded', true);
                }
                return {
                    init: init
                }
            })()
            lazyLoad.init();

})

    //详情js


    // 遮罩跟弹窗
        $('.lfy_6zhezhao').height($(window).height());
        $('.lfy_6cha').click(function(){
            $('.lfy_6zhezhao').hide();
            $('.lfy_6chenggong_alert').hide();
        })

        //漂浮物

function playFloatBox(content, type) {
    var bom = type === 1 ? '<span><i class="fa fa-' + content + '"></i></span>' : '<img class="not-js-style" src="' + content + '">';
    for (var i = 0; i < 20; i++) {
        $('.float-box').append('<div>' + bom + '</div>')
    }
    var param = {
        delay: [400, 10000],
        left: [0, 90],
        duration: [1000, 20000],
        width: [3, 5]
    };
    $('.float-box div').each(function(index) {
        var i = index + 1;
        var delay = Math.floor(param.delay[0] + Math.random() * (param.delay[1] - param.delay[0])) + Math.floor(200 + Math.random() * (200 - 50));
        var left = Math.floor(param.left[0] + Math.random() * (param.left[1] - param.left[0]));
        var duration = Math.floor(param.duration[0] + Math.random() * (param.duration[1] - param.duration[0])) + Math.floor(1000 + Math.random() * (1000 - 200));
        var width = Math.floor(param.width[0] + Math.random() * (param.width[1] - param.width[0]));
        $('.float-box div:nth-child(' + i + ')').css({
            left: left + '%',
            animationDelay: delay + "ms",
            animationDuration: duration + "ms",
            width: width / 8 + 'rem',
            fontSize: width / 8 + 'rem'
        });
    });
}



 //分组

function group(group_id)
{
    var nameOrTelOrNum = $('#nameOrTelOrNum').val();
    if(nameOrTelOrNum.lengte>0)
    {
    	nameOrTelOrNum = encodeURI(nameOrTelOrNum);
    	window.location.href=""+link_2+"/"+nameOrTelOrNum+"/"+group_id;
    }else{
    	nameOrTelOrNum = "ThisIsANullParam";
    	window.location.href=""+link_2+"/"+nameOrTelOrNum+"/"+group_id;
    }

}