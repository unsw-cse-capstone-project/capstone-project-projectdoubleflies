package com.example.ingredient.service;

import com.example.ingredient.dao.CartDao;
import com.example.ingredient.dao.CartItemDao;
import com.example.ingredient.pojo.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author
 * @email
 * @description
 */
@Transactional
@Service
public class CartItemService {

    @Autowired
    private CartItemDao cartItemDao;


    @Autowired
    private CartDao cartDao;


    public void delete(String cartItemId, String userId) {

        cartItemDao.deleteById(cartItemId);

    }
}
