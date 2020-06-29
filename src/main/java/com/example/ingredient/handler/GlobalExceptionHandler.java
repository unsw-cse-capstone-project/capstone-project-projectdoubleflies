package com.example.ingredient.handler;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

/**
 * @author
 * @email
 * @description
 */

//@ControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler(RuntimeException.class) // 所有的异常都是Exception子类
    public String error(HttpServletRequest request, Exception e, Model model) { // 出现异常之后会跳转到此方法

//        model.addAttribute("exception", e); // 将异常对象传递过去
//        model.addAttribute("url", request.getRequestURL()); // 获得请求的路径
        model.addAttribute("msg",e.getMessage());
        return "/fail";// 跳转路径
    }


//    @ExceptionHandler(Exception.class) // 所有的异常都是Exception子类
    public String defaultErrorHandler(HttpServletRequest request, Exception e, Model model) { // 出现异常之后会跳转到此方法

//        model.addAttribute("exception", e); // 将异常对象传递过去
//        model.addAttribute("url", request.getRequestURL()); // 获得请求的路径
        model.addAttribute("msg",e.getMessage());
        return "/fail";// 跳转路径
    }
}