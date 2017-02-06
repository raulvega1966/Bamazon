CREATE DATABASE IF NOT EXISTS bamazon_db;

USE bamazon_db;

CREATE TABLE IF NOT EXISTS bamazonitems (
item_id integer(30) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price FLOAT(10) NOT NULL,
stock_quantity integer(100) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO bamazonitems (product_name, department_name, price, stock_quantity) VALUES
("Men's Sport Socks", "Men's Clothing", 5.00, 10),
("Women's Heart Pendant - 14K Gold", "Jewelry", 1500.00, 12),
("Recliner Sofa", "Furniture", 300.00, 9),
("Toy Train", "Toys", 25.00, 25),
("Kayak with Paddle", "Sports", 800.00, 3),
("Men's Pants", "Men's Clothing", 25.00, 50),
("Stud Earrings - 14K Gold", "Jewelry", 1200.00, 20),
("Night Stand", "Furniture", 300.00, 8),
("Toy Truck", "Toys", 20.00, 25),
("Fishing Reel", "Sports", 120.00, 5);


SELECT * FROM bamazonitems;

DELETE FROM bamazonitems WHERE item_id > 10;
