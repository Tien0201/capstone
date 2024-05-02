/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `path` varchar(255) NOT NULL,
  `isDelete` bit(1) DEFAULT NULL,
  `saved_users` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comment` (`comment_id`, `content`, `user_id`, `image_id`) VALUES
(1, 'tếu tếu', 2, 1);
INSERT INTO `comment` (`comment_id`, `content`, `user_id`, `image_id`) VALUES
(2, 'xấu', 2, 2);
INSERT INTO `comment` (`comment_id`, `content`, `user_id`, `image_id`) VALUES
(3, 'đẹp', 2, 1);
INSERT INTO `comment` (`comment_id`, `content`, `user_id`, `image_id`) VALUES
(4, 'ok ok ', 2, 3),
(5, 'tệ', 2, 2),
(6, 'alo alo', 2, 3),
(7, 'aaaaaaa', 2, 3),
(8, 'bbbbbbbb', 2, 1),
(9, 'bbbbbbbb', 2, 1);

INSERT INTO `image` (`image_id`, `title`, `user_id`, `path`, `isDelete`, `saved_users`) VALUES
(1, '1712217721992-323_ROG Zephyrus M16 (2023).jpg', 2, 'C:\\Users\\ADMIN\\Desktop\\cypersoft\\capStone\\uploads\\1712217721992-323_ROG Zephyrus M16 (2023).jpg', 1, '[5,2]');
INSERT INTO `image` (`image_id`, `title`, `user_id`, `path`, `isDelete`, `saved_users`) VALUES
(2, '1712217802285-323_ROG Zephyrus M16 (2023).jpg', 2, 'C:\\Users\\ADMIN\\Desktop\\cypersoft\\capStone\\uploads\\1712217802285-323_ROG Zephyrus M16 (2023).jpg', 0, '[2]');
INSERT INTO `image` (`image_id`, `title`, `user_id`, `path`, `isDelete`, `saved_users`) VALUES
(3, '1712218156280-323_ROG Zephyrus M16 (2023).jpg', 2, '\\uploads\\1712218156280-323_ROG Zephyrus M16 (2023).jpg', 1, '[5]');
INSERT INTO `image` (`image_id`, `title`, `user_id`, `path`, `isDelete`, `saved_users`) VALUES
(4, '1712412396404-434289364_380244721502703_6920982081762110752_n.jpg', 2, 'uploads\\1712412396404-434289364_380244721502703_6920982081762110752_n.jpg', 1, '[2]'),
(5, '1712412430488-434289364_380244721502703_6920982081762110752_n.jpg', 2, 'uploads\\1712412430488-434289364_380244721502703_6920982081762110752_n.jpg', 1, '[]'),
(6, '1714366123096-323_test search.jpg', 2, 'uploads\\1714366123096-323_ROG Zephyrus M16 (2023).jpg', 1, '[2,5]');

INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'zz2xxx2zz', 'abcddd@gmail.com', '$2b$10$/aDXttPRuoM6gCXoU0vEBuUA.fs8e3.17jBz2ELZO3tydlShVnXha');
INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES
(2, 'abc', 'abc@gmail.com', '$2b$10$qFZi00wlowJY.HmvUla8GepmHtpnOvc9C5rKFx2eth8lcpPfHa.xK');
INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES
(3, 'abcd', 'abcd@gmail.com', '$2b$10$yi/hO/j/9W25kv.6IHw.8.A8TCs9w2XgIItVm4xYCEtg0MFxOFM8u');
INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES
(4, 'abcde', 'abcde@gmail.com', '$2b$10$lYw/FtiBXqElSFCyicKRsejtON.as0CgRHFyVmE2bE237A2/RgtkG'),
(5, 'abcdef', 'abcdef@gmail.com', '$2b$10$Fi9QKKJ..cSr59GBQHaPGuFFy6MsbCws3gKLgLuOOW57E16Hkw2L2');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;