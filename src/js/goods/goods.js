/**
 * Created by ydl on 2017/12/22.
 */
var goodsInfo,shopId, time = null,searchContent,historyUrl,sessionId,isRefresh,now;
var goodsInfo ={}
window.onload = function(){
    // shopId = HGD.GetQueryString("shopId");
    shopId = 1;
    firstLoad();
    
}
// 首次加载
function firstLoad(){
    var mySendData = {
        "platform":'h5_unknown',
        "shopId": shopId
    }
    var optsList = {
        'noMsg': true,
        'success': function(data) {
            if(data.success){
               $.each(data.items, function(i,items){
                    $('<div>').addClass('goods_details clearfix').attr("data-id",items.shopId).html(
                        "<div class='sign1 select'></div>" +
                        "<div class='goods_img'>" +
                        "<img src='"+items.picIds+"' alt=''>" +
                        "</div>" +
                        "<div class='goods_right'>" +
                        "<div class='title'>"+items.goodsName+"</div>" +
                        "<p >零售价<i class = 'retail_price'>&nbsp;"+ items.price+"</i></p>"+
                        "<p >库存<i class='stock_num'>&nbsp;"+ items.cnt+"</i>件</p>"+
                        "</div>").appendTo($(".goodsList"))
                    })
            }
            else {
                var txt=  "未找到";
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm); 
            }
        }
    }
    HGD.ajax(HGD.setURL('/api/v4/ShopWareHouse/show'),mySendData,optsList)
}
// 点击选择
$(document).on("click",".goodsList .goods_details .select",function(){
   $(this).toggleClass('sign2 select');
   $(this).toggleClass('sign1 select');
})
// 头部切换类名
function select(btn){
    if($(btn).hasClass("active")){
        $(btn).addClass("screenLi").removeClass('active');
       
        $('.screen .alertClass').css('display','none');
    }else{
        $(btn).addClass("active").removeClass('screenLi')
        $('.screen .alertClass').css('display','block');
    }
}
// 分类
// 获取以及分类列表
$('.screen .cate').on('click',function(){
    shopId = 1;
    select('.cate');
    // $(".alertBg").css("display","block");
    // $('.cate').siblings().removeClass('active')
    getClass();
    categoryGoods()
})
// 查找分类
function getClass(){
    var mySendData = {
        'platform':'h5_unknown',
        'shopId':shopId
    }
    var optsList = {
        'noMsg': true,
        'success': function(data) {
            console.log(data);
            if(data.success){
                $(".alertClass").empty();
                $("<div>").addClass("menuOne").html('<ul class="menuOne_left"></ul><ul class="menuOne_right"></ul>').appendTo($(".alertClass"));
                $.each(data.items,function (i,items1) {
                    $('<li>').attr("data-id",items1.id).text(items1.oneName).addClass('one').appendTo($(".menuOne_left"));
                    // 点击全部
                    if(items1.id == '-1'){
                        $("<li>").addClass('clearfix').html("<p class='haveChild'>全部</p><ul class='childThree clearfix'></ul>").appendTo($(".menuOne_right"));
                        $('.haveChild').click(function(){
                            $("<li>").addClass('classLi').html('<li class="classLi">全部</li>').appendTo($('.childThree'));
                        })
                    }
                    
                    $(".menuOne_left li").click(function(){
                        var data_first = $(this).attr('data-id');
                        $(this).css("background-color","#fff").siblings().css("background-color","#eee");
                        $(".menuOne_right").empty();
                        var data = items1.onTwoLevels;
                        $.each(data,function(m,items){
                            if(items){
                                $("<li>").addClass('clearfix').attr('data-id',items.id).html("<p class='haveChild'>"+items.twoName+"</p><ul class='childThree clearfix'></ul>").addClass('two').appendTo($(".menuOne_right"));
                                var data = items.onThreeLevels
                                $.each(data,function(n,item){
                                    $("<li>").addClass('classLi').attr({"data-first":data_first,"data-second":items.id,"data-three":item.id}).text(item.threeName).addClass('three').appendTo($('.childThree').eq(m));
                                })
                            }else {
                                $("<li>").html("<p data-first='"+data_first+"' data-second='"+items.id+"'>"+items.twoName+"</p>").addClass('three').appendTo($(".menuOne_right"));
                            }

                        })
                        var tag = true;
                        $('.haveChild').click(function(){
                            if(tag){
                                $(this).parent().find('.childThree').css("display","block");
                                tag = false
                            }else {
                                $(this).parent().find('.childThree').css("display","none");
                                tag = true
                            }
                        })

                        // 获取id
                        // console.log(11111111111111)
                        var first =  $(this).attr("data-first")
                        var second =  $(this).attr("data-second")
                        var three =  $(this).attr("data-three")
                        // if(first == "-1"){
                        //     first = ""
                        // }
                        // if(second == "-1"){
                        //     second = ""
                        // }
                        // if(three == "-1"){
                        //     three = ""
                        // }
                        goodsInfo.page = '1'
                        goodsInfo.firstcategoryId = first;
                        goodsInfo.secondCategoryId = second;
                        goodsInfo.thirdCategoryId = three;
                        // console.log(goodsInfo)
                        // 弹出隐藏
                        $(".alertBg").css("display","none")
                        // $(".alertClass").css("display","none");
                        // 渲染商品
                        // render()
                    })
                }) 
            } else {

            }
        }
    }
    HGD.ajax(HGD.setURL('/api/v4/ShopBrand/TypeGrade'),mySendData,optsList)
}
// 分类获取商品 
var mySendData
function categoryGoods(){
    
    $('.alertClass ').on('click','.one',function(){
        var id = $(this).attr('data-id')
        console.log(id)
        mySendData = {
            'platform':'h5_unknown',
            'shopId':shopId,
            'id':id, 
            'level':1
        }
        var optsList = {
        'noMsg': true,
        'success': function(data) {
            console.log(data);
            if(data.success){

                // $(" .classLi").click(function(){
                //     console.log(11111111111111)
                //     var first =  $(this).attr("data-first")
                //     var second =  $(this).attr("data-second")
                //     var three =  $(this).attr("data-three")
                //     if(first == "-1"){
                //         first = ""
                //     }
                //     if(second == "-1"){
                //         second = ""
                //     }
                //     if(three == "-1"){
                //         three = ""
                //     }
                //     goodsInfo.page = '1';
                //     goodsInfo.firstcategoryId = first;
                //     goodsInfo.secondCategoryId = second;
                //     goodsInfo.thirdCategoryId = three;
                //     console.log(goodsInfo)
                //     // 搜索
                //     // if(searchContent.length>0){
                //     //     goodsInfo.keyword = searchContent
                //     // }else {
                //     //     delete goodsInfo.keyword
                //     // }
                //     // $(".searchGoodsList").empty();
                //     // 弹出隐藏
                //     $(".alertBg").css("display","none")
                //     $(".alertClass").css("display","none");
                //     $(".screenLi").removeClass("active");
                //     $('.loader_box').css("display","block")
                    
                //     // 渲染商品
                //     render()
                // })
                
            } else {

            }
        }
    }
        HGD.ajax(HGD.setURL('/api/v4/ShopBrand/showGoodsType'),mySendData,optsList)
    })
    $('.alertClass ').on('click','.two',function(){
        var id = $(this).attr('data-id')
        console.log(id)
        return mySendData = {
            'platform':'h5_unknown',
            'shopId':shopId,
            'id':id,
            'level':2
        }
        HGD.ajax(HGD.setURL('/api/v4/ShopBrand/showGoodsType'),mySendData,optsList)
    })
    $('.alertClass ').on('click','.three',function(){
        var id = $(this).attr('data-three')
        console.log(id)
        return mySendData = {
            'platform':'h5_unknown',
            'shopId':shopId,
            'id':id,
            'level':3
        }
        HGD.ajax(HGD.setURL('/api/v4/ShopBrand/showGoodsType'),mySendData,optsList)
    })
    console.log(mySendData)
    var optsList = {
        'noMsg': true,
        'success': function(data) {
            console.log(data);
            if(data.success){

                // $(" .classLi").click(function(){
                //     console.log(11111111111111)
                //     var first =  $(this).attr("data-first")
                //     var second =  $(this).attr("data-second")
                //     var three =  $(this).attr("data-three")
                //     if(first == "-1"){
                //         first = ""
                //     }
                //     if(second == "-1"){
                //         second = ""
                //     }
                //     if(three == "-1"){
                //         three = ""
                //     }
                //     goodsInfo.page = '1';
                //     goodsInfo.firstcategoryId = first;
                //     goodsInfo.secondCategoryId = second;
                //     goodsInfo.thirdCategoryId = three;
                //     console.log(goodsInfo)
                //     // 搜索
                //     // if(searchContent.length>0){
                //     //     goodsInfo.keyword = searchContent
                //     // }else {
                //     //     delete goodsInfo.keyword
                //     // }
                //     // $(".searchGoodsList").empty();
                //     // 弹出隐藏
                //     $(".alertBg").css("display","none")
                //     $(".alertClass").css("display","none");
                //     $(".screenLi").removeClass("active");
                //     $('.loader_box').css("display","block")
                    
                //     // 渲染商品
                //     render()
                // })
                
            } else {

            }
        }
    }
    
}

// function render(){
//     $('.goods_details').empty()
//     $.each(data.items, function(i,items){
//         // 判断库存是否为零
//         if(items.cnt>0){
//             $('<div>').addClass('goods_details clearfix').attr("data-id",items.shopId).html(
//             "<div class='sign1 select'></div>" +
//             "<div class='goods_img'>" +
//             "<img src='"+items.picIds+"' alt=''>" +
//             "</div>" +
//             "<div class='goods_right'>" +
//             "<div class='title'>"+items.goodsName+"</div>" +
//             "<p >零售价<i class = 'retail_price'>&nbsp;"+ items.price+"</i></p>"+
//             "<p >库存<i class='stock_num' data-sku="+items.skuId+" data-fid="+items.fid+" data-goodsId="+items.goodsId+">&nbsp;"+ items.cnt+"</i>件</p>"+
//             "</div>").appendTo($(".goodsList"))
//         }else{
//             console.log('没有商品')
//         }
//     })
// }
// 排序 品牌
function sort(){
    var goodsIdTime = CurentTime();
    var mySendData = {
        "platform":'h5_unknown',
        "shopId": shopId,
        // 'page':goodsInfo.page||1,
        // 'brandId':brandId,
        // 'goodsId':goodsId,
        'goodsIdTime':goodsIdTime
    }
    var optsList = {
        'noMsg': true,
        'success': function(data) {
            if(data.success){
                // 渲染商品
                goodsInfo.page = "1";
                render()
            }
            else {
                var txt=  "未找到";
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm); 
            }
        }
    }
}
// 品牌获取
function brandName(){
    $('.screen .brand').on('click', function(){
        var mySendData = {
            "platform":'h5_unknown',
            "shopId": shopId
        }
        var optsList = {
            'noMsg': true,
            'success': function(data) {
                if(data.success){
                    // goodsInfo.brandId = $(this).attr("data-id");
                    // goodsInfo.page = "1";
                    $(".alertClass").empty();
                    // $(".alertBg").css("display","block");
                    select('.brand');
                    $('.alertClass .menuTwo').css("display","block")
                    $.each(data.items,function (i,items) {
                        console.log(items)
                        if(data.items.length > 0){
                            $('<div>').addClass('menuTwo').attr("data-id",items.id).html("<ul><li data-id="+items.id+">"+items.name+"</li></ul>").appendTo($(".alertClass"))
                            
                            $(".menuTwo>ul>li").click(function(){
                                brandGoods()
                            })
                            console.log(33)
                        }else{
                            var txt=  "未找到";
                            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm); 
                        }
                    })
                }
                else {
                    var txt=  "未找到";
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm); 
                }
                ;
            }
        }
        HGD.ajax(HGD.setURL('/api/v4/ShopBrand/showShopBrandName'),mySendData,optsList)          
    })  
}
brandName()
// 品牌获取商品
function brandGoods(){
        select('.brand')
        var brandId = $(this).attr('data-id');
        var mySendData = {
            "platform":'h5_unknown',
            "shopId": shopId,
            // 'page':goodsInfo.page||1,
            'brandId':brandId,
            // 'goodsId':goodsId,
            // 'goodsIdTime':goodsIdTime
        }
        var optsList = {
            'noMsg': true,
            'success': function(data) {
                if(data.success){
                    // 渲染商品
                    // goodsInfo.page = "1";
                    $('.goodsList').empty()
                    $.each(data.items, function(i,items){
                        // 判断库存是否为零
                        $('.alertClass').css('display','none')
                        console.log(items)
                        
                        if(items.cnt>0){
                            $('<div>').addClass('goods_details clearfix').attr("data-id",items.shopId).html(
                            "<div class='sign1 select'></div>" +
                            "<div class='goods_img'>" +
                            "<img src='"+items.picIds+"' alt=''>" +
                            "</div>" +
                            "<div class='goods_right'>" +
                            "<div class='title'>"+items.goodsName+"</div>" +
                            "<p >零售价<i class = 'retail_price'>&nbsp;"+ items.price+"</i></p>"+
                            "<p >库存<i class='stock_num' data-sku="+items.skuId+" data-fid="+items.fid+" data-goodsId="+items.goodsId+">&nbsp;"+ items.cnt+"</i>件</p>"+
                            "</div>").appendTo($(".goodsList"))
                        }else{
                            console.log('没有商品')
                        }
                    })
                }
                else {
                    var txt=  "未找到";
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm); 
                }
            }
        }
        HGD.ajax(HGD.setURL('/api/v4/ShopBrand/ShowShopBrandList'),mySendData,optsList)
}

// 获取升序
function getSort(){
    $('.screen .sort').on('click',function(){
        select('.sort');
        $(".alertClass").empty();
        $("<div>").addClass("menuThree").html("<ul class='rank'><li data-ranking='sale' class='priceTop'>价格最高</li><li data-ranking='sale' class='priceDown'>价格最低</li><li data-ranking='sale' class='saleTop'>销量最高</li><li data-ranking='sale' class='saleDown'>最新商品</li></ul>").appendTo($(".alertClass")); 
        var goodsIdTime = CurentTime();
        var mySendData = {
            "platform":'h5_unknown',
            "shopId": shopId,
            // 'page':goodsInfo.page||1,
            // 'brandId':brandId,
            // 'goodsId':goodsId,
            'goodsIdTime':goodsIdTime
        }
        console.log(goodsIdTime)
        var optsList = {
            'noMsg': true,
            'success': function(data) {
                if(data.success){
                    // 渲染商品
                    // goodsInfo.page = "1";
                    console.log(111111111111)
                    $.each(data.items, function(i,items){
                    // 判断库存是否为零
                        if(items.cnt>0){
                            $('<div>').addClass('goods_details clearfix').attr("data-id",items.shopId).html(
                            "<div class='sign1 select'></div>" +
                            "<div class='goods_img'>" +
                            "<img src='"+items.picIds+"' alt=''>" +
                            "</div>" +
                            "<div class='goods_right'>" +
                            "<div class='title'>"+items.goodsName+"</div>" +
                            "<p >零售价<i class = 'retail_price'>&nbsp;"+ items.price+"</i></p>"+
                            "<p >库存<i class='stock_num' data-sku="+items.skuId+" data-fid="+items.fid+" data-goodsId="+items.goodsId+">&nbsp;"+ items.cnt+"</i>件</p>"+
                            "</div>").appendTo($(".goodsList"))
                        }else{
                            console.log('没有商品')
                        }
                    })
                }
                else {
                    var txt=  "未找到";
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm); 
                }
            }
        }
        HGD.ajax(HGD.setURL('/api/v4/DescPrice/showPriceAsc'),mySendData,optsList)
    }) 
}
function sortAll(){
    // 价格升序
    $('document').on('click', '.menuThree .priceTop',function(){
        sort()
        HGD.ajax(HGD.setURL('/api/v4/DescPrice/showPriceAsc'),mySendData,optsList)
    })
    // 价格降序
    $('documnet').on('click', '.menuThree .priceDown',function(){
        sort()
        HGD.ajax(HGD.setURL('/api/v4/DescPrice/showPriceDesc'),mySendData,optsList)
    })
    // 销量升序
    $('documnet').on('click', '.menuThree .saleTop',function(){
       sort()
        HGD.ajax(HGD.setURL('/api/v4/DescPrice/showSaleAsc'),mySendData,optsList)
    })
    // 最新商品
    $('documnet').on('click','.menuThree .saleDown', function(){
        sort()
        HGD.ajax(HGD.setURL('/api/v4/DescPrice/showDescSale'),mySendData,optsList)
    })
}
getSort()

// 添加商品
function addGoods(){
    // $('.btn').on('click',function(){
        var currentTime =  CurentTime();
        var sign = $('.goodsList .goods_details ').hasClass('sign2')
        console.log(sign)
        // if(!sign){

        // }
    // })
}
addGoods();

// 上垃加载
function refreshList(goodsInfo){
    $(window).scroll(function() {
        console.log("***************任务列表上拉刷新***************");
        if ($(document).scrollTop() <= 0) {
            console.log("滚动条已经到达顶部为0");
        }
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            console.log("滚动条已经到达底部为" + $(document).scrollTop());
            if(isRefresh){
                goodsInfo.page = (Number(goodsInfo.page)+1).toString();
                sort()
                getGoodsList(goodsInfo)
            }
        }
    });
}
// 获取当前时间
function CurentTime()  {   
        var now = new Date();  
        var year = now.getFullYear();       //年  
        var month = now.getMonth() + 1;     //月  
        var day = now.getDate();            //日  
        var hh = now.getHours();            //时  
        var mm = now.getMinutes();          //分  
        var ss = now.getSeconds();           //秒  
        var clock = year;  
        if(month < 10) clock += "0";  
        clock += month ;  
          
        if(day < 10)  clock += "0";     
        clock += day ;  
          
        if(hh < 10)  clock += "0";    
        clock += hh ;  

        if (mm < 10) clock += '0';   
        clock += mm ;   
           
        if (ss < 10) clock += '0';   
        clock += ss;   

        return(clock);   
}  
// 点击蒙版分类弹出框隐藏
$(".alertBg").click(function(){
    $(this).css("display","none")
    $(".alertClass").css("display","none");
    $(".screenLi").removeClass("active")
})