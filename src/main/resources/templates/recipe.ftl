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


<section class="section3" id="section3">
    <div class="layui-container">

        <div class="layui-colla-item">
            <h2 class="layui-colla-title">${item.name}</h2>
            <div class="layui-colla-content layui-show">
            ${item.ingredients}
                <br><br>
            ${item.steps}
            </div>
        </div>

    </div>

</section>


<script>
    layui.use(['carousel', 'jquery', 'layer', 'element'], function () {

        var element = layui.element;

        var carousel = layui.carousel;

        var layer = layui.layer;

        var $ = layui.jquery;




    });
</script>

</body>
</html>

