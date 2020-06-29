package com.example.ingredient.controller;

import com.example.ingredient.exception.MyException;
import com.example.ingredient.pojo.User;
import com.example.ingredient.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * @author
 * @email
 * @description 用户
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private HttpSession session;


    // 用户注册
    @PostMapping("/register")
    public String register(User user) {

        User userFromDB = userService.findByEmail(user.getEmail());

        if (userFromDB != null) {

            session.setAttribute("msg", "Email already exists");

            return "/register";
        }

        userService.register(user);

        session.setAttribute("msg", "Successful registration, please login");

        return "redirect:/login";
    }

    // 用户登录
    @PostMapping("/login")
    public String login(User user) {

        User userFromDB = userService.login(user);

        if (userFromDB == null) {
            session.setAttribute("msg", "Incorrect email or password");
            return "/login";
        }
        session.setAttribute("user", userFromDB);

        session.removeAttribute("msg");

        return "redirect:/";
    }


    // 退出登录
    @RequestMapping("/logout")
    public String quit() {

        session.removeAttribute("user");

        return "redirect:/";
    }

}