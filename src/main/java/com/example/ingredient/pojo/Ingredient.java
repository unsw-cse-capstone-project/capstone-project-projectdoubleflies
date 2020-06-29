package com.example.ingredient.pojo;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * @author
 * @email
 * @description 食材表
 */

@Data
@Entity
public class Ingredient implements Serializable {

    @Id
    @Column(name = "ingredient_id")
    private String ingredientId;//       varchar(64) not null,

    private String name;   //              varchar(64),

    private String image;    //            varchar(255) comment '商品图片',

    private String category; //

}
