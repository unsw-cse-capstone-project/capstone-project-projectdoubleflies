drop database if exists ingredient;
CREATE DATABASE ingredient CHARACTER SET utf8 ;
use ingredient;


drop table if exists cart;

drop table if exists cart_item;

drop table if exists ingredient;

drop table if exists user;

/*==============================================================*/
/* Table: cart                                                  */
/*==============================================================*/
create table cart
(
   cart_id              varchar(64) not null,
   user_id              varchar(64),
   primary key (cart_id)
);

alter table cart comment '购物车表';

/*==============================================================*/
/* Table: cart_item                                             */
/*==============================================================*/
create table cart_item
(
   cart_item_id         varchar(64) not null,
   cart_id              varchar(64),
   ingredient_id        varchar(64),
   add_time             datetime comment '加入时间',
   count                int,
   primary key (cart_item_id)
);

alter table cart_item comment '购物车项目表';

/*==============================================================*/
/* Table: ingredient                                            */
/*==============================================================*/
create table ingredient
(
   ingredient_id        varchar(64) not null,
   name                 varchar(64),
   image                varchar(255) comment '商品图片',
   price                int comment '商品价格。单位为分',
   primary key (ingredient_id)
);

alter table ingredient comment '食材表';

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
   user_id              varchar(64) not null,
   email                varchar(128),
   password             varchar(64) comment '密码。',
   primary key (user_id)
);

alter table user comment '用户表';

alter table cart add constraint FK_Reference_3 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table cart_item add constraint FK_Reference_2 foreign key (cart_id)
      references cart (cart_id) on delete restrict on update restrict;

alter table cart_item add constraint FK_Reference_4 foreign key (ingredient_id)
      references ingredient (ingredient_id) on delete restrict on update restrict;

