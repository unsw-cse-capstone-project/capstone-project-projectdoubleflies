package com.example.ingredient.service;

import cn.hutool.core.lang.Snowflake;
import com.example.ingredient.dao.CartDao;
import com.example.ingredient.dao.UserDao;
import com.example.ingredient.pojo.Cart;
import com.example.ingredient.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * @author
 * @email
 * @description
 */

@Service
@Transactional
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private Snowflake snowflake;


    @Autowired
    private CartDao cartDao;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public User findByEmail(String email){

        return userDao.findUserByEmail(email);
    }



    // 用户注册
    public void register(User user) {

        user.setUserId(String.valueOf(snowflake.nextId()));

        // 密码加密
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        userDao.save(user);


        Cart cart = new Cart();

        cart.setCartId(String.valueOf(snowflake.nextId()));

        cart.setUserId(user.getUserId());

        cartDao.save(cart);

    }

    // 用户登录
    public User login(User user) {

        User userFromDB = userDao.findUserByEmail(user.getEmail());

        if (userFromDB != null && bCryptPasswordEncoder.matches(user.getPassword(), userFromDB.getPassword())) {
            return userFromDB;
        }

        return null;
    }


}
