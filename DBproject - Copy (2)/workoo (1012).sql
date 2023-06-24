-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3325
-- Generation Time: Jun 08, 2023 at 12:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workoo`
--

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `amount_paid` int(11) DEFAULT NULL COMMENT '$',
  `method` char(250) DEFAULT NULL,
  `completing_date` date NOT NULL,
  `serviceprovider_id` int(11) NOT NULL,
  `shipment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL,
  `serviceprovider_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `request_date` date ,
  `description` text  NULL,
  `request_amount` int(11)  NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--



CREATE TABLE `messages` (
  `user_id` int(11) NOT NULL,
  `serviceprovider_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `time` time NOT NULL,
  `message_description` text DEFAULT NULL CURRENT_TIMESTAMP,
-- ALTER TABLE `messages` ADD `time` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE `messages` ADD `message_description` TEXT NULL DEFAULT NULL ;
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `review` (
  `rev_description` text DEFAULT 'nothing to say',
  `service_id` int(11) NOT NULL,
  `rev_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `serviceprovider_id` int(11) NOT NULL,
  `charges` double NOT NULL,
  `title` varchar(59) NOT NULL,
  `description` text NOT NULL,
  `images` varchar NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_provider`
--

CREATE TABLE `service_provider` (
  `experience` text NOT NULL,
  `service_name` char(250) NOT NULL,
  `availability_hours` time NOT NULL DEFAULT current_timestamp(),
  `change_per_hour` time DEFAULT NULL,
  `number_of_orders_completed` int(11) NOT NULL,
  `ratings` char(60) NOT NULL,
  `shipment_id` int(11) DEFAULT NULL,
  `serviceprovider_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_name` char(50) NOT NULL,
  `user_password` char(250) NOT NULL,
  `user_email` text NOT NULL,
  `user_ProfilePic` varchar DEFAULT NULL,
  `user_role` char(250) NOT NULL,
  `user_location` geometry NULL,
  `user_id` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`shipment_id`),
  ADD KEY `serviceprovider_id` (`serviceprovider_id`);

ALTER Table `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `user_id`(`user_id`),
  ADD KEY `serviceprovider_id` (`serviceprovider_id`);



--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`),
 -- ADD KEY `shipment_id` (`shipment_id`),
  ADD KEY `user_id` (`user_id`);
  ADD KEY `serviceprovider_id` (`serviceprovider_id`);
--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`rev_id`),
  ADD KEY `service_id` (`service_id`);  -- service.(`service_id`)

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `serviceprovider_id` (`serviceprovider_id`);

--
-- Indexes for table `service_provider`
--
ALTER TABLE `service_provider`
  ADD PRIMARY KEY (`serviceprovider_id`),
  ADD KEY `shipment_id` (`shipment_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `shipment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `rev_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_provider`
--
ALTER TABLE `service_provider`
  MODIFY `serviceprovider_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(30) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
  ADD CONSTRAINT `requests_ibfk_5` FOREIGN KEY (`serviceprovider_id`) REFERENCES `serviceprovider` (`serviceprovider_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);

--
-- Constraints for table `service_provider`
--
ALTER TABLE `service_provider`
  ADD CONSTRAINT `service_provider_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `payment` (`shipment_id`);


ALTER TABLE `messages`
  ADD CONSTRAINT `serviceprovider_ibfk_6` FOREIGN KEY (`serviceprovider_id`) REFERENCES `messages` (`serviceprovider_id`);
  ADD CONSTRAINT `user_id_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `messages` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
