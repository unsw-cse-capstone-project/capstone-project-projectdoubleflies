package com.example.ingredient.dao;

import com.example.ingredient.pojo.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author
 * @email
 * @description
 */

public interface CartItemDao extends JpaRepository<CartItem,String>, JpaSpecificationExecutor<CartItem> {

}
