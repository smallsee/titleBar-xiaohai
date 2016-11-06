
(function($){
  "use strict";

  var TitleBarXiaohai = (function(){
    function TitleBarXiaohai(element, options){
      var me = this;

      this.settings = $.extend(true, $.fn.TitleBarXiaohai.defaults, options||{});
      this.element = element;
      this.init();


    }

    TitleBarXiaohai.prototype = {
      //初始化页面
      init : function(){
        var me = this;
        me.mask = me.settings.maskBoxClass;
        me.main = me.settings.mainBoxClass;
        //遮罩层
        me.maskView = $('<div class='+me.mask.className+'>').css({
          width:me.mask.width,
          height:me.mask.height,
          backgroundColor:me.mask.backgroundColor
        });
        //主要内容层
        var marginLeft = '';
        if(me.main.position == 'start'){
          marginLeft = 0
        }else if (me.main.position == 'end'){
          marginLeft = $(window).width() - me.main.width
        }else{
          marginLeft = ($(window).width() - me.main.width)/2
        }
        me.mainView = $('<div class='+me.main.className+'>').css({
          width:me.main.width,
          height:me.main.height-1,
          backgroundColor:me.main.backgroundColor,
          marginLeft:marginLeft,
          paddingTop:1
        });

        me.element.append(me.maskView);
        me.maskView.append(me.mainView);

        //左边Item样式

        me.leftItem = me.settings.leftItem;
        me.leftLiStyle = me.settings.leftItem.liStyle;
        me.leftUlStyle = me.settings.leftItem.ulStyle;

        var marginTop = '';
        if(me.leftUlStyle.position == 'start'){
          marginTop = 0
        }else if (me.leftUlStyle.position == 'end'){
          marginTop = me.main.height - me.leftUlStyle.height
        }else{
          marginTop = (me.main.height - me.leftUlStyle.height)/2
        }

        me.leftUl = $('<ul class='+me.leftItem.ulClass+'>').css({
          width:me.main.width,
          height:me.leftUlStyle.height,
          backgroundColor:me.leftUlStyle.backgroundColor,
          marginTop:marginTop
        });
        me.mainView.append(me.leftUl);


        var marginTop = '';
        if(me.leftLiStyle.position == 'start'){
          marginTop = 0
        }else if (me.leftLiStyle.position == 'end'){
          marginTop = me.leftUlStyle.height - me.leftLiStyle.height
        }else{
          marginTop = (me.leftUlStyle.height - me.leftLiStyle.height)/2
        }

        for(var i=0;i<me.leftItem.data.length;i++){
            var liItem ;
            var marginRight = true;
            var float = 'left';

            if (me.leftItem.data[i].float == 'right'){
              float = 'right';
              marginRight = false;
            }
            liItem = $('<li class='+me.leftItem.liClass+i+'>').css({
            width:me.leftLiStyle.width,
            height:me.leftLiStyle.height,
            backgroundColor:me.leftLiStyle.backgroundColor,
            marginRight:marginRight ? me.leftLiStyle.marginRight : null,
            marginLeft:marginRight ? null : me.leftLiStyle.marginRight,
            float:float,
            marginTop:marginTop,
            textAlign:'center',
            lineHeight:me.leftLiStyle.height + 'px'
          });
          me.leftUl.append(liItem);

          //输入内容现在


          if(me.leftItem.data[i].href.length>0){
            var titleItem = $('<a href='+me.leftItem.data[i].href+' class='+me.leftItem.AClass+[i]+'>')

            liItem.append(titleItem);

            if(me.leftItem.data[i].icon.length>0 || me.leftItem.data[i].hasIcon){
              var titleIcon = $('<span class='+me.leftItem.iconClass+[i]+'>').html(me.leftItem.data[i].icon);

              titleItem.append(titleIcon);
            }

            if (me.leftItem.data[i].title.length>0){
              var titleText = $('<span class='+me.leftItem.PClass+[i]+'>').html(me.leftItem.data[i].icon).html(me.leftItem.data[i].title);

              titleItem.append(titleText);
            }
          }else{
            if(me.leftItem.data[i].icon.length>0 || me.leftItem.data[i].hasIcon){
              var titleIcon = $('<span class='+me.leftItem.iconClass+[i]+'>').html(me.leftItem.data[i].icon);

              liItem.append(titleIcon);
            }

            if (me.leftItem.data[i].title.length>0){
              var titleText = $('<span class='+me.leftItem.PClass+[i]+'>').html(me.leftItem.data[i].icon).html(me.leftItem.data[i].title);

              liItem.append(titleText);
            }
          }

        }



      }
    };
    return TitleBarXiaohai;
  })();


  $.fn.TitleBarXiaohai = function(options){
    return this.each(function(){
      var me = $(this),
        instance = me.data("TitleBarXiaohai");

      if(!instance){
        me.data("TitleBarXiaohai", (instance = new TitleBarXiaohai(me, options)));
      }

      if($.type(options) === "string") return instance[options]();
    });
  };

  $.fn.TitleBarXiaohai.defaults = {
    maskBoxClass : {
      width:'100%',
      height:100,
      className : 'mask-xiaohai',
      backgroundColor:'red'
    },
    mainBoxClass : {
      height:100,
      width:980,
      className : 'main-xiaohai',
      backgroundColor:'blue',
      position:'middle'
    },
    leftItem:{
      ulClass:"leftUl-xiaohai",
      ulStyle:{
        height:80,
        backgroundColor:'yellow',
        position:'middle'
      },
      liStyle:{
        width:100,
        height:50,
        backgroundColor:'green',
        marginRight:10,
        position:'middle'
      },
      liClass:"leftLi-xiaohai",
      iconClass:'leftIcon-xiaohai',
      AClass:'leftA-xiaohai',
      PClass:'leftP-xiaohai',
      data : [
        {
          icon:'',
          title:'2',
          href :'3',
          hasIcon:true
        },
        {
          icon:'22',
          title:'xxx',
          href :''
        },
        {
          icon:'',
          title:'',
          href :'',
          float:'right'
        },
        {
          icon:'',
          title:'',
          href :'',
          float:'right'
        },
        {
          icon:'',
          title:'',
          href :'',
          float:'right'
        }
      ]
    }
    

  };


})(jQuery);