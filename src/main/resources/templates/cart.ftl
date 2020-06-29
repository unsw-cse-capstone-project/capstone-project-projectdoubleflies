<#assign base=springMacroRequestContext.getContextUrl("")>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <!-- 设置浏览器的兼容模式版本(让IE使用edge的渲染引擎工作) -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 声明当前网页在移动端浏览器中展示的相关设置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签必须放在最前面，任何其他内容都必须跟随其后！-->

    <title>精选好食材</title>

    <link rel="stylesheet" type="text/css" href="${base}/css/main.css">

    <!-- 引入Bootstrap核心样式表 -->
    <link href="${base}/lib/bootstrap/css/bootstrap.css" rel="stylesheet">

    <link rel="stylesheet" href="${base}/lib/font-awesome/css/font-awesome.min.css">

    <!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
    <script src="${base}/lib/jquery/jquery-3.3.1.min.js"></script>

    <!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
    <script src="${base}/lib/bootstrap/js/bootstrap.js"></script>


    <link href="${base}/css/reset.css" rel="stylesheet">

    <link rel="stylesheet" href="${base}/css/index.css">


    <link rel="stylesheet" href="${base}/lib/layui/css/layui.css">

    <script src="${base}/lib/layui/layui.js"></script>


</head>
<body style="background-color: white">

<!-- 顶部导航 -->
<header>
    <div class="layui-container">
        <div class="layui-row">
            <div class="layui-col-xs12 layui-col-sm12 layui-col-md3 text-center logo-area">
                <a href="/">
                    <img src="${base}/images/logo.png" class="logo"/>
                    <span style="color: #1E9FFF">Select Ingredients</span>
                </a>
            </div>

            <div class="layui-col-xs12 layui-col-sm12 layui-col-md4 text-center top_nav">

                <a href="/#footer" class="top_nav_link">client-side</a>
                <a href="/#footer" class="top_nav_link">about us</a>
                <a href="/#footer" class="top_nav_link">contact us</a>
            </div>

            <div class="layui-col-xs12 layui-col-sm12 layui-col-md5 text-center">
                <div class="search_area">
                    <input type="text" placeholder=""/>
                    <a href="#">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </a>
                </div>

            <#if Session.user??>
                <a href="/logout">
                    <img src="${base}/images/user2.png" class="user-img">
                </a>
            <#else>
                <a href="/login">
                    <img src="${base}/images/user.png" class="user-img">
                </a>
            </#if>

            </div>
        </div>
    </div>

</header>
<!-- /顶部导航 -->

<!-- 菜单栏 -->
<nav class="nav">
    <div class="layui-container text-center">
    </div>
</nav>
<!-- /菜单栏 -->


<div class="content content-nav-base shopcart-content layui-container">
    <div class="cart w1200">
        <div class="cart-table-th">
            <div class="th th-chk">
                <div class="select-all">
                    <div class="cart-checkbox">
                        <input class="check-all check" id="allCheckked" type="checkbox" value="true">
                    </div>
                    <label>Select All</label>
                </div>
            </div>
            <div class="th th-item">
                <div class="th-inner">
                    ingredient
                </div>
            </div>
            <div class="th th-amount">
                <div class="th-inner">
                    count
                </div>
            </div>
            <li class="th th-op">
                <span class="dele-btn">delete</span>
            </li>

        </div>


        <div class="OrderList">
            <div class="order-content" id="list-cont">

                <#list cart.cartItems as item>
                    <ul class="item-content layui-clear">


                        <li class="th th-chk">
                            <div class="select-all">
                                <div class="cart-checkbox">
                                    <input class="CheckBoxShop check" id="" type="checkbox" num="all" name="select-all"
                                           value="true">
                                </div>
                            </div>
                        </li>

                        <li class="th th-item">
                            <div class="item-cont">
                                <a href="javascript:;"><img src="/images/${item.ingredient.image}" alt=""></a>
                                <div class="text">
                                    <div class="title">${item.ingredient.name}</div>
                                </div>
                            </div>
                        </li>


                        <li class="th th-amount">
                            <div class="box-btn layui-clear">
                                <div class="less layui-btn">-</div>
                                <input class="Quantity-input" type="number" min="0" max="4" name=""
                                       value="${item.count}" disabled="disabled">
                                <div class="add layui-btn">+</div>
                            </div>
                        </li>

                        <li class="th th-op">
                            <a href="/cartItem/delete/${item.cartItemId}" type="button" class="layui-btn dele-btn">Delete</a>
                        </li>

                    </ul>
                </#list>
            </div>
        </div>

    </div>




    <div class="FloatBarHolder layui-clear">
        <div class="th th-chk">
            <div class="select-all">
                <div class="cart-checkbox">
                    <input class="check-all check" id="" name="select-all" type="checkbox" value="true">
                </div>
                <#--<label>&nbsp;&nbsp;已选<span class="Selected-pieces">0</span>件</label>-->
            </div>
        </div>

        <div class="th batch-deletion">
            <#--<span class="batch-dele-btn">批量删除</span>-->
        </div>
        <div class="th Settlement">
            <button class="layui-btn" id="build_recipe">Build Recipe</button>
        </div>
        <div class="th total">
            <#--<p>应付：<span class="pieces-total">0</span></p>-->
        </div>
    </div>



</div>
</div>


<style type="text/css">
    .cart_icon {
        position: fixed;
        border-radius: 10px 10px;
        bottom: 100px;
        right: 30px;
        width: 60px;
        height: 60px;
        background-color: #1E9FFF;
        text-align: center;
        line-height: 60px;
        font-size: 46px;
        color: white;
        text-decoration: none;
    }

</style>

<div class="cart_icon">
    <a href="${base}/">
        <i class="fa fa-arrow-circle-left" aria-hidden="true" style="color: white"></i>
    </a>
</div>


<script type="text/javascript">
    layui.config({
        base: './js/' //你存放新模块的目录，注意，不是layui的模块目录
    }).use(['mm', 'jquery', 'element', 'car'], function () {
        var mm = layui.mm, $ = layui.$, element = layui.element, car = layui.car;

        // 模版导入数据
        // var html = demo.innerHTML,
        // listCont = document.getElementById('list-cont');
        // mm.request({
        //   url: '../json/shopcart.json',
        //   success : function(res){
        //     listCont.innerHTML = mm.renderHtml(html,res)
        //     element.render();
        //     car.init()
        //   },
        //   error: function(res){
        //     console.log(res);
        //   }
        // })
        //
        car.init()

    });
</script>


<!-- 底部区域 -->
<footer id="footer">
    <div class="about-area">
        <div class="layui-container">
            <div class="layui-row about-top">
                <div class="pull-left about">
                    <div class="tuandui">
                        Select Ingredients Team
                    </div>
                    <div>
                        <a href="#">Feedback</a>
                        <a href="#">About us</a>
                        <a href="#">Problem-centered</a>
                    </div>

                    <div class="tuandui">
                        Select Ingredients Team
                    </div>
                    <div>
                        <a href="#">Business cooperation</a>
                    </div>
                </div>

                <div class="pull-right">
                    <div class="pull-left">
                        <div class="tuandui" style="margin-top: 25px;">
                            Follow us
                        </div>
                        <div class="wb-wx-img" style="margin-top: 90px;">
                            <img src="${base}/images/微博.png"/>
                            <img src="${base}/images/微信.png"/>
                        </div>
                    </div>

                    <div class="pull-right" style="margin-top: 25px;">
                        <div class="tuandui">
                            Select Ingredients App
                        </div>
                        <div class="text-center" style="margin-top: 25px;">
                            <img src="${base}/images/erweima.png"/><br>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="foot">
        <div class="container">
            <div class="row text-center">
                <div>@2020 shicaixuangou [2019]0454-015431238</div>
                <div> © 2020 Television Food Network, G.P. All rights reserved.</div>
            </div>
        </div>
    </div>
</footer>
<!-- /底部区域 -->


<script>
    layui.use(['carousel', 'jquery', 'layer'], function () {
        var carousel = layui.carousel;

        var layer = layui.layer;

        var $ = layui.jquery;

        // 建造实例
        carousel.render({
            elem: '#test1'
            , width: '100%' // 设置容器宽度。 设置100%自动适应宽度
            , interval: '3000' //自动切换的时间间隔，单位：ms（毫秒），不能低于800
            , height: '560px' // 设置容器宽度
            , arrow: 'always' //始终显示箭头
            //,anim: 'updown' //切换动画方式
        });

        // 图片轮播
        carousel.render({
            elem: '#test10'
            , width: '100%'
            , height: '560px'
            , interval: 5000
        });

        $("#build_recipe").on("click", function () {
            layer.open({
                type: 2,
                title: "Build recipe",
                area: ['70%', '90%'],
                fix: false,
                maxmin: true,
                shadeClose: true,
                scrollbar: true,
                shade: 0.4,
                skin: 'layui-layer-rim',
                content: ["/recipe"],
            });
        })


    });
</script>

</body>
</html>

