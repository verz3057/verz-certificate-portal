-- Complete SQL Schema and Seed Data for VERZ Certificate Verification Portal
-- Database: verz_certificate

CREATE DATABASE IF NOT EXISTS verz_certificate;
USE verz_certificate;

-- --------------------------------------------------------
-- Table structure for table `admins`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table structure for table `students`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `roll_number` VARCHAR(255) NOT NULL UNIQUE,
  `student_name` VARCHAR(255) NOT NULL,
  `father_name` VARCHAR(255) NOT NULL,
  `college_name` VARCHAR(255) NOT NULL,
  `course_name` VARCHAR(255) NOT NULL,
  `certificate_status` VARCHAR(50) DEFAULT 'Verified',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Seed Data for `admins`
-- --------------------------------------------------------
-- Password is 'Admin@123' hashed using bcrypt
INSERT INTO `admins` (`name`, `email`, `password`, `created_at`) 
VALUES 
('Administrator', 'admin@verz.in', '$2b$10$7ALe/ZqltYM5lFSwo8X7pemRGzIVVti1VwQFlJtzkDZ1SZm83jst.', NOW())
ON DUPLICATE KEY UPDATE email=email;
