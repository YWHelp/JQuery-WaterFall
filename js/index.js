
//当页面加载成功
$(window).on('load', function () {
    //实现瀑布流
    waterFall();
    //数据
    var dataImg = {"data":[{"src":getRandom(40) + '.' + 'jpg'},{"src":getRandom(40) + '.' + 'jpg'},{"src":getRandom(40) + '.' + 'jpg'},{"src":getRandom(40) + '.' + 'jpg'},{"src":getRandom(40) + '.' + 'jpg'},{"src":getRandom(40) + '.' + 'jpg'},{"src":getRandom(40) + '.' + 'jpg'},{"src":getRandom(40) + '.' + 'jpg'}]};
    //监听滚动,加载更多照片
    $(window).on('scroll', function () {
        if(loadMoreData()){
           $.each(dataImg.data, function (index,value) {
              //创建一个新盒子模型
               console.log($(value).attr('src'));
              //最外层盒子
               var newBoxPicDiv = $('<div>').addClass('box').appendTo($('#main'));
               //中间层盒子
               var newPicDiv = $('<div>').addClass('pic').appendTo($(newBoxPicDiv));
               //里层的img
               $('<img>').attr({src:'resoure/images/'+ $(value).attr('src')}).appendTo($(newPicDiv))
           });
            //重新布局
            waterFall();
        }
    })
});

//瀑布流布局
function waterFall() {
    //拿到所有的子盒子，存放于数组
    var  totalBox = $('#main>div');
    //子盒子的宽度
    var  subBoxWidth = totalBox.eq(0).outerWidth();
    //获取浏览器的宽度
    var  browserWidth = $(window).width();
    //取出最大的列数（向下取整：Math.floor()）
    var column =  Math.floor(browserWidth/subBoxWidth);
    //设置父标签的宽度并居中
    $('#main').css({
        'width':subBoxWidth*column+'px',
        'margin':'0 auto'
    });

    //一列盒子的高度数组
    var  boxHeightArray = [];
    //遍历所有盒子，找到高度最小的盒子，然后让下一列的第一个盒子向下拼接，依次循环
    $.each(totalBox,function (index,value){
        var  boxHeight = totalBox.eq(index).outerHeight();
        if(index < column){ // 第一行
            boxHeightArray[index] = boxHeight;
        }else{//开始拼接到最小高度的盒子的底部
            // 取出最矮的盒子的高度(Math.min.apply(null, a))
            var  subBoxMinHeight = Math.min.apply(null, boxHeightArray);
            //最矮盒子对应的索引（$.inArray(subBoxMinHeight,boxHeightArray)）
            var  subBoxMinIndex = $.inArray(subBoxMinHeight,boxHeightArray);
            var  nextBox = totalBox[index];
            $(nextBox).css({
               'position':'absolute',
               'top': subBoxMinHeight+'px',
               'left': subBoxMinIndex*subBoxWidth+'px'
            });
            //更新数组中最小的高度
            boxHeightArray[subBoxMinIndex] += boxHeight;
        }
    })
}

// $('.box .pic img').on('click',function(){
//     alert($(this).attr('src'));
// });
//监听img点击
$('body').on('click','.box .pic img',function () {
    alert($(this).attr('src'));
})

// 检测是否具备滚动的条件
//上拉加载更多思想：最后一个盒子高度的一半 +  最后一个盒子距离顶部的距离  < （屏幕的高度 + 视图超出屏幕的偏移量）
function  loadMoreData() {
    //获取最后一个盒子
    var  lastBox = $('#main>div').last();
    var  lastBoxOffset = $(lastBox).offset().top + Math.floor($(lastBox).outerHeight()/2);
    //屏幕的高度
    var  screenWidth = $(window).height();
    //视图超出屏幕的偏移量
    var offset = $(window).scrollTop();
    return lastBoxOffset < (screenWidth + offset) ? true : false;
}

//随机数
function getRandom(n){
    return Math.floor(Math.random()*n+1)
}