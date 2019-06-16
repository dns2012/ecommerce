-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(20,	17,	1,	2,	'2019-06-16 14:18:16',	'2019-06-16 14:18:16'),
(21,	17,	2,	1,	'2019-06-16 14:18:47',	'2019-06-16 14:18:47');

DROP TABLE IF EXISTS `cart_attribute`;
CREATE TABLE `cart_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `field` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `cart_attribute_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `cart_attribute` (`id`, `cart_id`, `field`, `value`) VALUES
(14,	20,	'Warna',	'Merah'),
(15,	20,	'Ukuran',	'43'),
(16,	21,	'Warna',	'Hitam');

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_sector_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_sector_id` (`category_sector_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_sector_id`) REFERENCES `category_sector` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `category` (`id`, `category_sector_id`, `parent_id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1,	1,	0,	'Kuliner',	'kuliner.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(2,	1,	0,	'Craft',	'craft.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(3,	1,	0,	'Fashion',	'fashion.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(4,	1,	1,	'Menu Sarapan',	'sarapan.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(5,	1,	1,	'Makanan Siap Saji',	'siapsaji.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(6,	1,	1,	'Minuman',	'minuman.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(7,	2,	0,	'Laptop',	'laptop.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(8,	2,	0,	'Handphone',	'handphone.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(9,	2,	0,	'Kamera',	'kamera.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48');

DROP TABLE IF EXISTS `category_sector`;
CREATE TABLE `category_sector` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `category_sector` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1,	'Khas Tangsel',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(2,	'Peralatan Elektronik',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(3,	'Aksesoris Elektronik',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48');

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` int(11) NOT NULL COMMENT 'gram',
  `price` int(11) NOT NULL,
  `view` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product` (`id`, `category_id`, `seller_id`, `name`, `description`, `quantity`, `weight`, `price`, `view`, `created_at`, `updated_at`) VALUES
(1,	3,	1,	'Clarisse ALICE Wedges Wanita Wedges Cantik Prepet Tinggi 7cm Krem Hitam Cream',	'ALICE wedges adalah Sepatu wanita dengan desain cantik nan simple ditambah dengan detail perekat yang bisa disesuaikan dengan ukuran kaki kamu akan CANTIK saat kamu memakainya, cocok di padukan dengan berbagai macam outfit anda. Ada 2 pilihan warna yang cantik, KOLEKSI ke dua warna nya SEKARANG JUGA.\r\n\r\nDiproduksi dengan pengrajin terbaik LOKAL, dengan potongan POLA yang pas sesuai dengan lekuk kaki wanita asia, membuat ALICE wedges pas dikaki dan NYAMAN digunakan.\r\nDIJAMIN sepatu kami jahitan dan pengerjaan nya lebih rapih. ',	40,	1000,	120000,	102,	'2019-05-25 22:30:48',	'2019-05-25 22:30:48'),
(2,	7,	2,	'NETBOOK LAPTOP KECIL MURAH DELL ATOM BANYAK BONUS HARGA MIRING',	'SPESIFIKASI :\r\n\r\nINTEL ATOM \r\nRAM DDR3 2 GB ( Glossy 1 gb - bisa di UP menjadi 2gb tambah di keranjang untuk tambahan up Ram ) \r\nHARDISK 160 GB\r\nWIFI\r\nCARDREADER PORT\r\nRJ 45 LAN PORT\r\nUSB 2.0 X 3 PORT\r\nVGA PORT\r\nAUDIO PORT IN\r\nAUDIO PORT OUT\r\nUKURAN LAYAR 10.1 WIDE INCH ANTIGLARED LED (TIDAK CAPE KALAU DIPAKAI LAMA BEDA DENGAN LAYAR2 STANDARD)\r\nSUDAH TERINSTALL WINDOWS 7,OFFICE,ADOBEREADER,AIMP3,PICASA,GOOGLE CHROME,DLL SIAP PAKAI\r\n\r\nKONDISI FISIK : \r\n',	7,	2500,	1403000,	29,	'2019-06-01 11:04:48',	'2019-06-01 11:04:48');

DROP TABLE IF EXISTS `product_attribute`;
CREATE TABLE `product_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `field` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_attribute_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_attribute` (`id`, `product_id`, `field`, `value`) VALUES
(1,	1,	'Warna',	'Merah, Hijau, Biru'),
(2,	1,	'Ukuran',	'L,XL,XXL');

DROP TABLE IF EXISTS `product_discussion`;
CREATE TABLE `product_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `discussion` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_discussion_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_discussion_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_discussion` (`id`, `product_id`, `user_id`, `discussion`, `created_at`) VALUES
(1,	2,	17,	'Apa barang masih ada?',	'2019-06-10 17:34:05'),
(2,	1,	17,	'Gan ready  stok?',	'2019-06-10 17:34:31');

DROP TABLE IF EXISTS `product_image`;
CREATE TABLE `product_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_image` (`id`, `product_id`, `name`) VALUES
(1,	1,	'b7e2fcf5ca00dae53964a8ca121ef1a8.jpg'),
(2,	2,	'b7e2fcf5ca00dae53964a8ca121ef1a8.jpg');

DROP TABLE IF EXISTS `product_rating`;
CREATE TABLE `product_rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_rating_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_rating_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_rating` (`id`, `product_id`, `user_id`, `rating`, `created_at`) VALUES
(1,	1,	16,	4,	'2019-06-01 11:04:48'),
(2,	1,	17,	5,	'2019-06-01 11:04:48');

DROP TABLE IF EXISTS `product_review`;
CREATE TABLE `product_review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_review` (`id`, `product_id`, `user_id`, `review`, `created_at`) VALUES
(1,	1,	16,	'Sangat bagus barangnya',	'2019-06-01 11:04:48'),
(2,	1,	16,	'Barang sesuai',	'2019-06-01 11:04:48'),
(3,	2,	17,	'Pengiriman Cepat',	'2019-06-10 17:20:27'),
(4,	2,	17,	'Pengiriman Cepat',	'2019-06-10 17:21:49'),
(5,	2,	17,	'Pengiriman Cepat',	'2019-06-10 17:22:22'),
(6,	2,	17,	'Pengiriman Cepat',	'2019-06-10 17:23:45'),
(7,	2,	17,	'Pengiriman Cepat',	'2019-06-10 17:24:13');

DROP TABLE IF EXISTS `product_specification`;
CREATE TABLE `product_specification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `field` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_specification_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_specification` (`id`, `product_id`, `field`, `value`) VALUES
(1,	1,	'Merk',	'Clarisse'),
(2,	1,	'Model',	'ALICE Wedges');

DROP TABLE IF EXISTS `product_wishlist`;
CREATE TABLE `product_wishlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_wishlist_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_wishlist_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_wishlist` (`id`, `product_id`, `user_id`) VALUES
(1,	1,	16),
(12,	1,	17),
(15,	2,	17);

DROP TABLE IF EXISTS `seller`;
CREATE TABLE `seller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `birthday` date DEFAULT '1970-01-01',
  `gender` enum('NONE','MALE','FEMALE') NOT NULL,
  `phone` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `seller` (`id`, `name`, `email`, `password`, `image`, `birthday`, `gender`, `phone`, `created_at`, `updated_at`) VALUES
(1,	'SELLER 1',	'seller1@gmail.com',	'$2b$10$9syRxJogIYo3D5AK.KJ58.9X.Q2eLatbPv3Ox76vq1h63qi/Yu0Pm',	'user-default.png',	'1970-01-01',	'MALE',	62,	'2019-06-01 09:52:32',	'2019-06-01 09:52:32'),
(2,	'SELLER 2',	'seller2@gmail.com',	'$2b$10$xnFerxeJadkkEB4T/x.kKuvm1LeWWeaZ7bxuiVvjdhgn0O.NmsXhq',	'user-default.png',	'1970-01-01',	'NONE',	62,	'2019-06-01 12:49:24',	'2019-06-01 12:49:24');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `birthday` date DEFAULT '1970-01-01',
  `gender` enum('NONE','MALE','FEMALE') NOT NULL,
  `phone` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`, `name`, `email`, `password`, `image`, `birthday`, `gender`, `phone`, `created_at`, `updated_at`) VALUES
(16,	'DNS PROGRESS',	'dnsprogress@gmail.com',	'$2b$10$9syRxJogIYo3D5AK.KJ58.9X.Q2eLatbPv3Ox76vq1h63qi/Yu0Pm',	'user-default.png',	'1970-01-01',	'MALE',	62,	'2019-06-01 09:52:32',	'2019-06-01 09:52:32'),
(17,	'Dani Susanto',	'dani@gmail.com',	'$2b$10$xnFerxeJadkkEB4T/x.kKuvm1LeWWeaZ7bxuiVvjdhgn0O.NmsXhq',	'user-default.png',	'1970-01-01',	'NONE',	62,	'2019-06-01 12:49:24',	'2019-06-01 12:49:24');

DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `province_id` int(11) NOT NULL,
  `province_name` varchar(255) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `postal` int(11) NOT NULL,
  `address` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user_address` (`id`, `user_id`, `province_id`, `province_name`, `city_id`, `city_name`, `postal`, `address`, `status`, `created_at`, `updated_at`) VALUES
(13,	17,	2,	'Bangka Belitung',	17,	'Kabupaten Badung',	67226,	'Jalan Nangka',	0,	'2019-06-02 15:11:00',	'2019-06-02 15:11:00'),
(14,	17,	2,	'Bangka',	17,	'Kabupaten Badung',	67226,	'Jalan Nangka',	1,	'2019-06-02 15:11:03',	'2019-06-02 15:11:21');

-- 2019-06-16 10:14:26
