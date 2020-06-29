package com.example.ingredient.dao;

import com.example.ingredient.pojo.Ingredient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author
 * @email
 * @description
 */

public interface IngredientDao extends JpaRepository<Ingredient, String>, JpaSpecificationExecutor<Ingredient> {

    Page<Ingredient> findAllByCategoryEquals(Pageable pageable, String category);

}
