-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema test_nave
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test_nave
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test_nave` DEFAULT CHARACTER SET utf8mb4 ;
USE `test_nave` ;

-- -----------------------------------------------------
-- Table `test_nave`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_nave`.`posts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(280) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `test_nave`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_nave`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(191) NULL DEFAULT NULL,
  `password` VARCHAR(191) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `test_nave`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_nave`.`comments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(280) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `post_id` INT(11) NULL DEFAULT NULL,
  `user_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `post_id` (`post_id` ASC),
  INDEX `user_id` (`user_id` ASC),
  CONSTRAINT `post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES `test_nave`.`posts` (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `test_nave`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
