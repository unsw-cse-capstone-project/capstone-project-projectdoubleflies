<#assign base=springMacroRequestContext.getContextUrl("")>
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




<section class="layui-container" id="section0">

    <div class="layui-row">
        <div class="title_more">
            <span class="col-sm-6 col-md-6 text-left left_title">The most popular recipe</span>
            <span class="col-sm-6 col-md-6 text-right right_more">
                <!--<a href="#">更多    ></a>-->
            </span>
        </div>
    </div>

    <div class="layui-row">
        <div class="layui-collapse">
            <#list recipeList as item>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title" style="font-size: 18px">${item.name}</h2>
                    <div class="layui-colla-content">
                        ${item.ingredients}
                        <br><br>
                        ${item.steps}
                    </div>
                </div>
            </#list>

        </div>
    </div>

</section>

<section class="layui-container" id="section1" style="margin-top: 30px">

    <div class="layui-row">
        <div class="title_more">
            <span class="col-sm-6 col-md-6 text-left left_title">The Ingredients</span>
            <span class="col-sm-6 col-md-6 text-right right_more">
                <!--<a href="#">更多    ></a>-->
            </span>
        </div>
    </div>

    <div class="layui-row  layui-tab">
        <ul class="layui-tab-title">
            <li class="layui-this" style="font-size: 20px;line-height: 34px;margin-right: 40px;">Vegetables</li>
            <li style="font-size: 20px;line-height: 34px;margin-right: 40px;">Grains</li>
            <li style="font-size: 20px;line-height: 34px;margin-right: 40px;">Seasoning</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
                <div class="layui-container">
                    <div class="layui-row image-list">
                        <ul>

                            <#list vegetables as item>
                                <li>
                                    <div>
                                        <a href="#">
                                            <img src="${base}/images/${item.image}" alt=""><br>
                                        </a>
                                    </div>

                                    <div class="item-title layui-elip text-center">
                                        ${item.name}
                                    </div>

                                    <div class="text-center">
                                        <button type="button" class="layui-btn layui-btn-normal add_to_cart"
                                                data-id="${item.ingredientId}">Add to Cart
                                        </button>
                                    </div>
                                </li>
                            </#list>

                        </ul>

                    </div>
                </div>
            </div>

            <div class="layui-tab-item">
                <div class="layui-container">
                    <div class="layui-row image-list">
                        <ul>

                            <#list grains as item>
                                <li>
                                    <div>
                                        <a href="#">
                                            <img src="${base}/images/${item.image}" alt=""><br>
                                        </a>
                                    </div>

                                    <div class="item-title layui-elip text-center">
                                        ${item.name}
                                    </div>

                                    <div class="text-center">
                                        <button type="button" class="layui-btn layui-btn-normal add_to_cart"
                                                data-id="${item.ingredientId}">Add to Cart
                                        </button>
                                    </div>
                                </li>
                            </#list>

                        </ul>

                    </div>
                </div>
            </div>


            <div class="layui-tab-item">
                <div class="layui-container">
                    <div class="layui-row image-list">
                        <ul>
                            <#list seasoning as item>
                                <li>
                                    <div>
                                        <a href="#">
                                            <img src="${base}/images/${item.image}" alt=""><br>
                                        </a>
                                    </div>

                                    <div class="item-title layui-elip text-center">
                                        ${item.name}
                                    </div>

                                    <div class="text-center">
                                        <button type="button" class="layui-btn layui-btn-normal add_to_cart"
                                                data-id="${item.ingredientId}">Add to Cart
                                        </button>
                                    </div>
                                </li>
                            </#list>

                        </ul>

                    </div>
                </div>
            </div>

        </div>
    </div>

</section>

<!-- section3 -->
<section class="section3" id="section3">
    <div class="layui-container">
        <div class="layui-row title_more">
            <!--<span class="col-sm-6 col-md-6 text-left left_title"></span>-->
            <span class="col-sm-6 col-md-6 text-right right_more">
                <!--<a href="#">更多    ></a>-->
            </span>
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
    <a href="${base}/cart">

        <i class="fa fa-shopping-cart" aria-hidden="true" style="color: white"></i>
    </a>
</div>

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
    layui.use(['carousel', 'jquery', 'layer', 'element'], function () {

        var element = layui.element;

        var carousel = layui.carousel;

        var layer = layui.layer;

        var $ = layui.jquery;

        $(".add_to_cart").on("click", function () {

            var id = $(this).attr("data-id")
            console.log(id)
            // 向服务端发送指令
            $.ajax({
                type: 'POST',
                dataType: 'json',
                // data: data.field,
                url: "/cart/add/" + id,

                success: function (data) {
                    layer.msg(data.message)

                },
                error: function (data) {
                    layer.msg(data.message)
                }
            });
        });


        // 建造实例
        carousel.render({
            elem: '#test1'
            , width: '100%' 
            , interval: '3000'
            , height: '560px' 
            , arrow: 'always' 
            //,anim: 'updown' 
        });

    
        carousel.render({
            elem: '#test10'
            , width: '100%'
            , height: '560px'
            , interval: 5000
        });


    });
</script>

</body>
</html>
