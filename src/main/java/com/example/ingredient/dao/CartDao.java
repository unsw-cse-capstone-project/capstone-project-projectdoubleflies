package com.example.ingredient.dao;

import com.example.ingredient.pojo.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author
 * @email
 * @description
 */

public interface CartDao extends JpaRepository<Cart,String> {

    Cart findCartByUserId(String userId);
}
