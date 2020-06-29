package com.example.ingredient.service;

import cn.hutool.core.lang.Snowflake;
import com.example.ingredient.dao.CartDao;
import com.example.ingredient.dao.CartItemDao;
import com.example.ingredient.dao.IngredientDao;
import com.example.ingredient.pojo.Cart;
import com.example.ingredient.pojo.CartItem;
import com.example.ingredient.pojo.Ingredient;
import com.example.ingredient.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author
 * @email
 * @description
 */
@Service
@Transactional
public class CartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private Snowflake snowflake;

    @Autowired
    private CartItemDao cartItemDao;

    @Autowired
    private IngredientDao ingredientDao;


    public Result add(String userId, String ingredientId) {

        Ingredient ingredient = ingredientDao.findById(ingredientId).get();

        Cart cart = cartDao.findCartByUserId(userId);

        Specification<CartItem> specification = new Specification<CartItem>() {
            @Override
            public Predicate toPredicate(Root<CartItem> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicateList = new ArrayList<Predicate>();

                Join<CartItem, Ingredient> join = root.join(root.getModel().getSingularAttribute("ingredient", Ingredient.class), JoinType.INNER);
                predicateList.add(criteriaBuilder.equal(join.get("ingredientId").as(String.class), ingredientId));

                return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };

        List<CartItem> cartItemList = cartItemDao.findAll(specification);

        CartItem cartItem = null;

        if (cartItemList != null && cartItemList.size() > 0) {
            cartItem = cartItemList.get(0);
        }
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCartItemId(String.valueOf(snowflake.nextId()));
            cartItem.setCart(cart);
            cartItem.setIngredient(ingredient);
            cartItem.setAddTime(new Timestamp(new Date().getTime()));
            cartItem.setCount(1);
        } else {
            if (cartItem.getCount() ==  4) {
                return new Result(false, 201, "No more than four");
            }
            cartItem.setCount(cartItem.getCount() + 1);
        }
        cartItemDao.save(cartItem);
        return new Result(true, 200, "Add to Cart");
    }


    public Cart findCartByUserId(String userId) {
        return cartDao.findCartByUserId(userId);
    }

}
