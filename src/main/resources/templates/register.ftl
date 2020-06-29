<#assign base=springMacroRequestContext.getContextUrl("")>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>管理系统</title>
    <link rel="stylesheet" href="${base}/lib/layui/css/layui.css">
</head>
<body class="layui-layout-body">
<script src="${base}/lib/jquery/jquery-3.3.1.js"></script>
<script src="${base}/lib/layui/layui.js"></script>

<script type="text/javascript">
    if (window != top)
        top.location.href = location.href;
</script>

<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;text-align: center">
    <legend>Please Register</legend>
</fieldset>


<div style="width: 70%;margin: 20px auto">
    <form class="layui-form layui-form-pane" method="post" action="/user/register">
        <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
        <div class="layui-form-item">
            <label class="layui-form-label">Email</label>
            <div class="layui-input-inline">
                <input type="email" name="email"
                       required
                       lay-verify="required|email"
                       autocomplete="on"
                       class="layui-input">
            </div>
            <i class="layui-icon layui-icon-email" style="font-size: 30px; color: #1E9FFF;"></i>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">Password</label>
            <div class="layui-input-inline">
                <input type="password" name="password"
                       required lay-verify="required|password"
                       autocomplete="off"
                       class="layui-input">
            </div>
            <i class="layui-icon layui-icon-password" style="font-size: 30px; color: #1E9FFF;"></i>
        </div>

        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="formDemo">Register</button>
                <button type="reset" class="layui-btn">Reset</button>
            </div>
        </div>


    </form>
</div>


<script>
    layui.use(['form', 'element', 'layer'], function () {
        var layer = layui.layer;

        <#if Session.msg??>
               layer.msg('${Session.msg}');
        </#if>

        var $ = layui.jquery
                , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

        var $ = layui.jquery;

        var form = layui.form;
        // 监听提交
        form.on('submit(formDemo)', function (data) {
            // layer.msg(JSON.stringify(data.field));
            return true;
        });
        // 自定义验证规则
        form.verify({
            password: [
                /^[\S]{6,12}$/
                , 'The password's length must be 6 to 12  and no Spaces are allowed'
            ]
        });

    });
</script>


</body>
</html>