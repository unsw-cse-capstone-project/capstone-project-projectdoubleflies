package com.example.ingredient.service;

import com.example.ingredient.dao.RecipeDao;
import com.example.ingredient.pojo.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author
 * @email
 * @description
 */

@Service
@Transactional
public class RecipeService {

    @Autowired
    private RecipeDao recipeDao;


    public Page<Recipe> paging(int page, int size) {

        Pageable pageable = PageRequest.of(page - 1, size);

        return recipeDao.findAll(pageable);

    }
}
