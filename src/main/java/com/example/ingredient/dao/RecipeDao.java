package com.example.ingredient.dao;

import com.example.ingredient.pojo.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author
 * @email
 * @description
 */

public interface RecipeDao extends JpaRepository<Recipe,String>, JpaSpecificationExecutor<Recipe> {
}
