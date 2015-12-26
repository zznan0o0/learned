var url = window.location.href;
var goodsId = url.split('/goods/')[1];
var start;
var end;
var duration = 0;
start = new Date();
$(window).bind('beforeunload', function(e) {
    end = new Date();//用户退出时间
    duration = end.getTime() - start.getTime();
    duration = duration/1000;//取的是秒
    $.ajax({
        url:'/test2',
        type:'get',
        data:{time:duration,goodsId:goodsId},
        dataType:'json',
        success:'success'
    });
});