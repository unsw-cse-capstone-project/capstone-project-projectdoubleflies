package com.example.ingredient.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @author
 * @email
 * @description 购物车项表
 */

@Data
@Entity
@EqualsAndHashCode(exclude = {"cart","ingredient"}) // 忽略属性，否则出现死循环
@ToString(exclude = {"cart","ingredient"})   // 忽略属性，否则出现死循环
public class CartItem implements Serializable {

    @Id
    @Column(name = "cart_item_id")
    private String cartItemId;//        varchar(64) not null,


    // cart_id              varchar(64),

    @ManyToOne(targetEntity=Cart.class)
    @JoinColumn(name="cart_id",referencedColumnName="cart_id")
    @JsonIgnore
    private Cart cart;


    // ingredient_id        varchar(64),

    @OneToOne(targetEntity=Ingredient.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "ingredient_id", referencedColumnName = "ingredient_id")
    private Ingredient ingredient;


    @Column(name = "add_time")
    private Timestamp addTime;//            datetime comment '加入时间',


    private Integer count;//               int,




}
