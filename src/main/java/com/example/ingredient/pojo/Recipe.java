package com.example.ingredient.pojo;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * @author
 * @email
 * @description 食谱
 */

@Data
@Entity
public class Recipe implements Serializable {

    @Id
    @Column(name = "recipe_id")
    private String recipeId;//           varchar(64),

    private String name; //                 varchar(255),

    private String ingredients;//          varchar(2048),

    private String steps;//                varchar(4096)

}
