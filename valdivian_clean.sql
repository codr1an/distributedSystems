-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: nov. 21, 2024 la 05:09 PM
-- Versiune server: 10.4.32-MariaDB
-- Versiune PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `valdivian_clean`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `cart`
--

CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL,
  `total_cart_price` double NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `cart_item`
--

CREATE TABLE `cart_item` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` double NOT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_id` bigint(20) NOT NULL,
  `items_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_price` double NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `orders_items`
--

CREATE TABLE `orders_items` (
  `order_id` bigint(20) NOT NULL,
  `items_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `model_year` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `product`
--

INSERT INTO `product` (`id`, `brand`, `category`, `description`, `image_url`, `model_year`, `name`, `price`) VALUES
(1, 'Apple', 'phone', 'The latest iPhone with advanced features.', '/iPhone.png', 2023, 'iPhone 14', 999.99),
(2, 'Samsung', 'phone', 'High-end Samsung smartphone.', '/iPhone.png', 2023, 'Samsung Galaxy S23', 899.99),
(3, 'Google', 'phone', 'Google’s newest flagship phone.', '/iPhone.png', 2023, 'Google Pixel 8', 799.99),
(4, 'OnePlus', 'phone', 'Fast and powerful OnePlus device.', '/iPhone.png', 2023, 'OnePlus 11', 749.99),
(5, 'Xiaomi', 'phone', 'Affordable smartphone with great specs.', '/iPhone.png', 2023, 'Xiaomi Mi 13', 599.99),
(6, 'Sony', 'phone', 'Sony’s premium smartphone with 4K display.', '/iPhone.png', 2023, 'Sony Xperia 1 V', 1099.99),
(7, 'Motorola', 'phone', 'Stylish and fast Motorola phone.', '/iPhone.png', 2023, 'Motorola Edge 40', 649.99),
(8, 'Nokia', 'phone', 'Affordable phone with decent performance.', '/iPhone.png', 2022, 'Nokia G50', 299.99),
(9, 'Huawei', 'phone', 'Advanced Huawei smartphone.', '/iPhone.png', 2023, 'Huawei P60 Pro', 899.99),
(10, 'Asus', 'phone', 'Gaming smartphone with top specs.', '/iPhone.png', 2023, 'Asus ROG Phone 7', 1199.99),
(11, 'Samsung', 'tv', 'Premium 8K TV with Quantum Dot technology.', '/tv.png', 2023, 'Samsung QLED 8K', 4999.99),
(12, 'LG', 'tv', '4K OLED TV with incredible color accuracy.', '/tv.png', 2023, 'LG OLED C3', 2799.99),
(13, 'Sony', 'tv', 'High-end 4K HDR TV with immersive sound.', '/tv.png', 2023, 'Sony Bravia XR', 3299.99),
(14, 'TCL', 'tv', 'Affordable 4K TV with great features.', '/tv.png', 2023, 'TCL 6-Series', 799.99),
(15, 'Hisense', 'tv', 'Impressive 4K TV with Dolby Vision.', '/tv.png', 2023, 'Hisense U8H', 1099.99),
(16, 'Panasonic', 'tv', 'Superb OLED TV with vivid colors.', '/tv.png', 2023, 'Panasonic LZ2000', 3999.99),
(17, 'Philips', 'tv', 'TV with unique Ambilight technology.', '/tv.png', 2023, 'Philips Ambilight', 1599.99),
(18, 'Vizio', 'tv', 'Bright and vibrant 4K display.', '/tv.png', 2023, 'Vizio P-Series Quantum', 1299.99),
(19, 'Sharp', 'tv', 'Solid 4K HDR TV for home use.', '/tv.png', 2022, 'Sharp Aquos', 999.99),
(20, 'Toshiba', 'tv', 'Smart TV with integrated Alexa.', '/tv.png', 2022, 'Toshiba Fire TV', 599.99),
(21, 'Apple', 'laptop', 'Powerful laptop with M2 chip.', '/laptop.png', 2023, 'MacBook Pro 16\"', 2499.99),
(22, 'Dell', 'laptop', 'Sleek and powerful 15-inch laptop.', '/laptop.png', 2023, 'Dell XPS 15', 1999.99),
(23, 'HP', 'laptop', '2-in-1 convertible laptop.', '/laptop.png', 2023, 'HP Spectre x360', 1499.99),
(24, 'Lenovo', 'laptop', 'Business-class laptop with great features.', '/laptop.png', 2023, 'Lenovo ThinkPad X1 Carbon', 1799.99),
(25, 'Asus', 'laptop', 'Lightweight and powerful for professionals.', '/laptop.png', 2023, 'Asus ZenBook Pro', 1599.99),
(26, 'Acer', 'laptop', 'Gaming laptop with high-end graphics.', '/laptop.png', 2023, 'Acer Predator Helios', 2299.99),
(27, 'MSI', 'laptop', 'Thin and light gaming laptop.', '/laptop.png', 2023, 'MSI Stealth 15M', 1399.99),
(28, 'Razer', 'laptop', 'Premium gaming laptop.', '/laptop.png', 2023, 'Razer Blade 15', 2999.99),
(29, 'Microsoft', 'laptop', 'Stylish laptop with Windows OS.', '/laptop.png', 2023, 'Microsoft Surface Laptop 5', 1299.99),
(30, 'Samsung', 'laptop', 'Versatile laptop with AMOLED display.', '/laptop.png', 2023, 'Samsung Galaxy Book 3', 1399.99),
(31, 'LG', 'monitor', 'Gaming monitor with high refresh rate.', '/monitor.png', 2023, 'LG UltraGear', 499.99),
(32, 'Asus', 'monitor', 'Reliable monitor for gamers.', '/monitor.png', 2023, 'ASUS TUF Gaming', 399.99),
(33, 'Samsung', 'monitor', 'Super ultrawide monitor for immersive viewing.', '/monitor.png', 2023, 'Samsung Odyssey G9', 1499.99),
(34, 'Sharp', 'monitor', '4K monitor with excellent color accuracy.', '/monitor.png', 2022, 'Dell Ultrasharp 27', 799.99),
(35, 'Unknown', 'monitor', 'Designer monitor with 4K resolution.', '/monitor.png', 2022, 'BenQ PD3220U', 999.99),
(36, 'Acer', 'monitor', 'Affordable 1440p gaming monitor.', '/monitor.png', 2023, 'Acer Nitro XV272U', 349.99),
(37, 'HP', 'monitor', 'QHD gaming monitor with vibrant colors.', '/monitor.png', 2023, 'HP Omen 27i', 549.99);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `user`
--

INSERT INTO `user` (`id`, `address`, `email`, `name`, `password`, `role`) VALUES
(1, 'Admin Street 1, 61616 Adminstadt', 'admin@gmail.com', 'Cool Admin', '$2a$10$U6xwNNefrhbWFNFyBGYy/ufLvNKIjpHu6I.UXbD/bKpKZ7DWoKbXO', 'admin'),
(2, 'User street, 61234 Userstadt', 'user@gmail.com', 'Cool User', '$2a$10$U6xwNNefrhbWFNFyBGYy/u9otmUP2gV.97DxzCmnM/BuxQKhzXZp6', 'user');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKl70asp4l4w0jmbm1tqyofho4o` (`user_id`);

--
-- Indexuri pentru tabele `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjcyd5wv4igqnw413rgxbfu4nv` (`product_id`);

--
-- Indexuri pentru tabele `cart_items`
--
ALTER TABLE `cart_items`
  ADD UNIQUE KEY `UK383kkp3af9dpn91t406oqe9n1` (`items_id`),
  ADD KEY `FK99e0am9jpriwxcm6is7xfedy3` (`cart_id`);

--
-- Indexuri pentru tabele `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`);

--
-- Indexuri pentru tabele `orders_items`
--
ALTER TABLE `orders_items`
  ADD UNIQUE KEY `UK7qrg5pfgjon82yhgwfqrdijm5` (`items_id`),
  ADD KEY `FKij1wwgx6o198ubsx1oulpopem` (`order_id`);

--
-- Indexuri pentru tabele `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexuri pentru tabele `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pentru tabele `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pentru tabele `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pentru tabele `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pentru tabele `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FKl70asp4l4w0jmbm1tqyofho4o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constrângeri pentru tabele `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `FKjcyd5wv4igqnw413rgxbfu4nv` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constrângeri pentru tabele `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `FK99e0am9jpriwxcm6is7xfedy3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `FKnqjva2t0na43f4qxm3xprl2qu` FOREIGN KEY (`items_id`) REFERENCES `cart_item` (`id`);

--
-- Constrângeri pentru tabele `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constrângeri pentru tabele `orders_items`
--
ALTER TABLE `orders_items`
  ADD CONSTRAINT `FKe64jvabyr77d5fmc7rif7g35m` FOREIGN KEY (`items_id`) REFERENCES `cart_item` (`id`),
  ADD CONSTRAINT `FKij1wwgx6o198ubsx1oulpopem` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
