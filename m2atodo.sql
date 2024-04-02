-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 02, 2024 at 04:22 PM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m2atodo`
--

-- --------------------------------------------------------

--
-- Table structure for table `priorities`
--

DROP TABLE IF EXISTS `priorities`;
CREATE TABLE IF NOT EXISTS `priorities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `priorities`
--

INSERT INTO `priorities` (`id`, `name`) VALUES
(1, 'High Priority'),
(2, 'Medium Priority'),
(3, 'Low Priority');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `status` enum('In progress','Done') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'In progress',
  `priority_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `status`, `priority_id`, `created_at`, `updated_at`) VALUES
(1, 'Premiere tache2334444444444', 'Done', 3, '2024-04-01 15:40:08', '2024-04-01 16:15:56'),
(2, 'Mali2', 'Done', 2, '2024-04-01 16:19:41', '2024-04-02 16:18:20'),
(3, 'hdhd', 'In progress', 3, '2024-04-01 16:25:07', '2024-04-01 16:25:07'),
(4, 'fff56565', 'Done', 1, '2024-04-01 16:25:12', '2024-04-01 16:26:43'),
(5, 'hhh', 'Done', 2, '2024-04-01 16:25:16', '2024-04-02 16:18:42'),
(6, 'hh44', 'Done', 2, '2024-04-01 16:25:20', '2024-04-02 03:11:31'),
(9, 'ttttt', 'In progress', 3, '2024-04-01 16:25:39', '2024-04-01 16:25:39'),
(12, 'lfjalnflanklfd', 'In progress', 2, '2024-04-01 16:26:10', '2024-04-01 16:26:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'Abdoulaye2', 'Mohamed', 'abdoulaye@gmail.com', '1234'),
(3, 'Tom', 'Mark', 'tom@gmail.com', '$2b$10$rHdlMejMfsAt/noKeaBmJus9YsH6FMv24IxoWvieqFPI1YYZ9/9ym');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
