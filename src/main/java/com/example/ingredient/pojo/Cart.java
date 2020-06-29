package com.example.ingredient.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author
 * @email
 * @description 购物车表
 */

@Data
@Entity
@EqualsAndHashCode(exclude = {"cartItems"}) // 忽略属性，否则出现死循环
@ToString(exclude = {"cartItems"})   // 忽略属性，否则出现死循环
public class Cart implements Serializable {

    @Id
    @Column(name = "cart_id")
    private String cartId;//              varchar(64) not null,

    @Column(name = "user_id")
    private String userId;//             varchar(64),


    @OneToMany(mappedBy = "cart", fetch = FetchType.EAGER)
    @OrderBy("addTime DESC")
    @JsonIgnoreProperties(value = "cart")
    private Set<CartItem> cartItems = new HashSet<CartItem>(0);



}
