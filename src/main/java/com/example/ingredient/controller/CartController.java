package com.example.ingredient.controller;

import com.example.ingredient.pojo.User;
import com.example.ingredient.service.CartService;
import com.example.ingredient.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpSession;

/**
 * @author
 * @email
 * @description
 */
@Controller
@RequestMapping("/cart")
public class CartController {


    @Autowired
    private CartService cartService;

    @Autowired
    private HttpSession session;


    @PostMapping("/add/{ingredientId}")
    @ResponseBody
    public Result add(@PathVariable String ingredientId) {

        User user = (User) session.getAttribute("user");

        if (user == null) {
            return new Result(false, 400, "Please Login First");
        }

        return cartService.add(user.getUserId(), ingredientId);

    }


}
