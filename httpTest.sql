drop table if exists users;

create table  user (id varchar(32),name varchar(32),age int,created_at datetime, updated_at datetime,email varchar(32));

insert into user(id,name,age) values('sp100029','peter',25),('sp100030','tom',50),('sp100031','karl',34),('sp100032','mary',18);


drop table if exists token;

create table  token (intAuthToken varchar(32),id varchar(32) ,device varchar(32),ip varchar(16),created_at datetime, updated_at datetime,email varchar(32)) ;


insert into token (intAuthToken, id, device, ip) values('xxxyyyzz','sp100029','iphone6','192.168.1.88'), ('aaabbbccc','sp100029','Samsung Glaxy s3','177.15.33.8'),('dddeeefff','sp100030','xiaomi 4x','110.20.3.7'),('eeefffggg','sp100031','xiaomi 4x','111.20.3.7'),('yuqbajnnr','sp100032','iPhone se','121.2.88.137');
