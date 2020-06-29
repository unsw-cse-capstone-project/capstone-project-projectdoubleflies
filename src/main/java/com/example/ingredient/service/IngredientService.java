package com.example.ingredient.service;

import com.example.ingredient.dao.IngredientDao;
import com.example.ingredient.pojo.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author
 * @email
 * @description
 */

@Service
@Transactional
public class IngredientService {

    @Autowired
    private IngredientDao ingredientDao;

    public Page<Ingredient> paging(int page, int size) {

        Pageable pageable = PageRequest.of(page - 1, size);

        return ingredientDao.findAll(pageable);

    }

    public Page<Ingredient> categoryPaging(int page, int size,String category) {

        Pageable pageable = PageRequest.of(page - 1, size);

        return ingredientDao.findAllByCategoryEquals(pageable,category);

    }

}
