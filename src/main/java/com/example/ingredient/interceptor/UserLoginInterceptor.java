package com.example.ingredient.interceptor;

import com.example.ingredient.pojo.User;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author
 * @email
 * @description 登录拦截器
 */
@Component
public class UserLoginInterceptor extends HandlerInterceptorAdapter {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        System.out.println("---- 进入用户拦截器 ----");

        //  得到对象
        User user = (User) request.getSession().getAttribute("user");

        //  判断对象是否存在
        if (user != null) {
            return true;
        } else {
            //  不存在则跳转到登录页
            response.sendRedirect(request.getContextPath() + "/login");
            return false;
        }


    }


}
