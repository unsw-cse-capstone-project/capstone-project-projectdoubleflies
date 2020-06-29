package com.example.ingredient.controller;

import com.example.ingredient.pojo.User;
import com.example.ingredient.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

/**
 * @author
 * @email
 * @description
 */
@Controller
@RequestMapping("/cartItem")
public class CartItemController {


    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private HttpSession session;

    @RequestMapping("/delete/{cartItemId}")
    public String delete(@PathVariable String cartItemId) {

        User user = (User) session.getAttribute("user");

        cartItemService.delete(cartItemId, user.getUserId());

        return "redirect:/cart";

    }


}
