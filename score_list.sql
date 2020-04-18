-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2019 年 01 月 16 日 18:20
-- 伺服器版本: 10.1.37-MariaDB
-- PHP 版本： 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `score_list`
--

-- --------------------------------------------------------

--
-- 資料表結構 `crack`
--

CREATE TABLE `crack` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(40) NOT NULL,
  `id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `crack`
--

INSERT INTO `crack` (`name`, `score`, `id`) VALUES
('test1', '0', 1),
('test2', '0', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `crescent_moon`
--

CREATE TABLE `crescent_moon` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `day_of_dush`
--

CREATE TABLE `day_of_dush` (
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `score` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `day_of_dush-2`
--

CREATE TABLE `day_of_dush-2` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(40) NOT NULL,
  `id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `day_of_dush-2`
--

INSERT INTO `day_of_dush-2` (`name`, `score`, `id`) VALUES
('test1', '0', 1),
('test2', '0', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `kiss_you_baby`
--

CREATE TABLE `kiss_you_baby` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `kpks-1`
--

CREATE TABLE `kpks-1` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(40) NOT NULL,
  `id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `kpks-1`
--

INSERT INTO `kpks-1` (`name`, `score`, `id`) VALUES
('test1', '0', 1),
('test2', '0', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `kpks-2`
--

CREATE TABLE `kpks-2` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(40) NOT NULL,
  `id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `kpks-2`
--

INSERT INTO `kpks-2` (`name`, `score`, `id`) VALUES
('test1', '0', 1),
('test2', '0', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `paranoia`
--

CREATE TABLE `paranoia` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(40) NOT NULL,
  `id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `paranoia`
--

INSERT INTO `paranoia` (`name`, `score`, `id`) VALUES
('test1', '0', 1),
('test2', '0', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `pm-1`
--

CREATE TABLE `pm-1` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(40) NOT NULL,
  `id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `pm-1`
--

INSERT INTO `pm-1` (`name`, `score`, `id`) VALUES
('test1', '0', 1),
('test2', '0', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `pm-2`
--

CREATE TABLE `pm-2` (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(40) NOT NULL,
  `id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `pm-2`
--

INSERT INTO `pm-2` (`name`, `score`, `id`) VALUES
('test1', '0', 1),
('test2', '0', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `天之弱`
--

CREATE TABLE `天之弱` (
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `score` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `天之弱`
--

INSERT INTO `天之弱` (`name`, `score`, `id`) VALUES
('test1', '0', 1),
('test2', '0', 2);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `crack`
--
ALTER TABLE `crack`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 資料表索引 `day_of_dush-2`
--
ALTER TABLE `day_of_dush-2`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 資料表索引 `kpks-1`
--
ALTER TABLE `kpks-1`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 資料表索引 `kpks-2`
--
ALTER TABLE `kpks-2`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 資料表索引 `paranoia`
--
ALTER TABLE `paranoia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 資料表索引 `pm-1`
--
ALTER TABLE `pm-1`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 資料表索引 `pm-2`
--
ALTER TABLE `pm-2`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 資料表索引 `天之弱`
--
ALTER TABLE `天之弱`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
