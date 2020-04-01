var $wheel=(function(){  
    var index = 1;
    var timer;
    var isMoving = false;
    function show(){
        var inbox='<div class="slider" id="slider">'
            +'<div class="slide"><img src="img/b5.png" alt=""></div>'
            +'<div class="slide"><img src="img/b1.png" alt=""></div>'
            +'<div class="slide"><img src="img/b2.png" alt=""></div>'
            +'<div class="slide"><img src="img/b3.png" alt=""></div>'
            +'<div class="slide"><img src="img/b4.png" alt=""></div>'
            +'<div class="slide"><img src="img/b5.png" alt=""></div>'
            +'<div class="slide"><img src="img/b1.png" alt=""></div>'
        +'</div>'
        +'<span id="left"><</span>'
        +'<span id="right">></span>'
        +'<ul class="nav" id="navs">'
            +'<li class="active">1</li>'
            +'<li>2</li>'
            +'<li>3</li>'
            +'<li>4</li>'
            +'<li>5</li>'
        +'</ul>'
        var $box=$("#box");
        $box.append(inbox);
        $box.mouseover(function(){
            if(timer){
                clearInterval(timer);
            }
            $('#left').css({opacity: 0.5,animation: "opacity 1s"})
            $('#right').css({opacity: 0.5,animation: "opacity 1s"})
        })
        $box.mouseout(function(){
            timer = setInterval(next,3000);
            $('#left').css({opacity: 0,transition: "opacity 1s"})
            $('#right').css({opacity: 0,transition: "opacity 1s"})
        })//鼠标离开、触碰轮播图
        
        //下一页
        function next(){
            if(isMoving){
                return;
            }
            isMoving = true;
            index++;
            navmove();
            animate($('#slider'),{left:-1200*index},function(){
                if(index==6){
                    $('#slider').css("left","-1200px");
                    index = 1;
                }
                isMoving = false;
            });
        }
        //上一页
        function last(){
            if(isMoving){
                return;
            }
            isMoving = true;
            index--;
            navmove();
            animate($('#slider'),{left:-1200*index},function(){
                if(index==0){
                    $('#slider').css("left","-6000px");
                    index = 5;
                }
                isMoving = false;
            });
        }
        $('#right').click(next);
        $('#left').click(last);
        
        for(var i=0;i<$('li').length;i++ ){
            (function(i){
                $('li')[i].onclick = function(){
                    index = i+1;
                    navmove();
                    animate($('#slider'),{
                        left:-1200*index
                    });
                }
            })(i);
        }
        timer = setInterval(next,3000);
    }
    return{
        show:show
    }
    
    function navmove(){
        for(var i=0;i<$('li').length;i++){
            $('li')[i].className="";
        }
        if(index >5 ){
            $('li')[0].className="active";
        }else if(index<=0){
            $('li')[4].className="active";
        }else {
            $('li')[index-1].className="active";
        }
    }
    
    function animate(obj,json,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var isStop = true;
            for(var attr in json){
                var now = 0;
                if(attr == 'opacity'){
                    now = parseInt(obj.css(attr)*100);
                }else{
                    now = parseInt(obj.css(attr));
                }
                var speed = (json[attr] - now) / 8;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                var cur = now + speed;
                if(attr == 'opacity'){
                    obj.css(attr,cur / 100);
                }else{
                    obj.css(attr,cur + 'px');
                }
                if(json[attr] !== cur){
                    isStop = false;
                }
            }
            if(isStop){
                clearInterval(obj.timer);
                callback&&callback();
            }
        },30)
    }
}());