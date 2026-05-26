show tables;

CREATE DATABASE fitlife_store;

USE fitlife_store;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2)
);

INSERT INTO products (name, price) VALUES
('Whey Protein 400g', 29.90),
('Creatine 300g', 24.90),
('Multivitamin 120 Capsules', 18.90),
('Melatonin Tablets', 12.90),
('Pre-Workout Energy', 21.90),
('Shaker Bottle', 9.90);

SELECT * FROM products;
