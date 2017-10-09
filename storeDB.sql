CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price FLOAT(10, 2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('iPhone', 'electronics', 800, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('socks', 'clothing', 100, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('deodarant', 'hygiene', 5, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('grapes', 'food', 4, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('office chair', 'home decor', 50, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('rug', 'home decor', 35, 850);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cheerios', 'food', 3.50, 5500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('poster', 'home decor', 25, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('backpack', 'school essentials', 45, 1500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('laptop', 'electronics', 1200, 500);
