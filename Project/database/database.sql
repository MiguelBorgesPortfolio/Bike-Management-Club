DROP DATABASE IF EXISTS ests_event_db;

CREATE DATABASE IF NOT EXISTS `ests_event_db`;

CREATE USER IF NOT EXISTS 'ests_event_usr' @'%' IDENTIFIED BY 'ESTSEvent@PW';
GRANT ALL ON ests_event_db.* TO 'ests_event_usr' @'%';
FLUSH PRIVILEGES;

USE `ests_event_db`;

CREATE TABLE `EventType` (
    `et_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `et_description` VARCHAR(255) UNIQUE NOT NULL
) ENGINE = InnoDB,
DEFAULT CHARSET = utf8mb4,
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `Event` (
    `e_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `e_id_type` INT NOT NULL,
    `e_description` VARCHAR(255) NOT NULL,
    `e_date` date NOT NULL,
    FOREIGN KEY (`e_id_type`) REFERENCES `EventType`(`et_id`)
) ENGINE = InnoDB,
DEFAULT CHARSET = utf8mb4,
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `Member` (
    `m_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `m_name` VARCHAR(255) NOT NULL
) ENGINE = InnoDB,
DEFAULT CHARSET = utf8mb4,
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `MemberEventType` (
    `met_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `met_id_member`INT NOT NULL,
    `met_id_event_type` INT NOT NULL,
    FOREIGN KEY (`met_id_member`) REFERENCES `Member`(`m_id`),
    FOREIGN KEY (`met_id_event_type`) REFERENCES `EventType`(`et_id`),
    UNIQUE (`met_id_member`, `met_id_event_type`)
) ENGINE = InnoDB,
DEFAULT CHARSET = utf8mb4,
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `MemberEvent` (
    `me_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `me_id_member`INT NOT NULL,
    `me_id_event` INT NOT NULL,
    FOREIGN KEY (`me_id_member`) REFERENCES `Member`(`m_id`),
    FOREIGN KEY (`me_id_event`) REFERENCES `Event`(`e_id`),
    UNIQUE (`me_id_member`, `me_id_event`)
) ENGINE = InnoDB,
DEFAULT CHARSET = utf8mb4,
COLLATE = utf8mb4_0900_ai_ci;



INSERT INTO
    `EventType` (`et_description`)
VALUES
    ("Estrada"),
    ("BTT"),
    ("BMX"),
    ("Pista"),
    ("Ciclocrosse"),
    ("Cicloturismo");


INSERT INTO
    `Event` (`e_id_type`, `e_description`, `e_date`)
VALUES
    (1, "Teste Estrada Novembro", "2025-11-01"),
    (2, "Teste BTT", "2025-11-30"),
    (1, "Teste Estrada Dezembro", "2025-12-01"),
    (4, "Teste Pista Dezembro", "2025-12-15");


INSERT INTO
    `Member` (`m_name`)
VALUES  
    ("João Silva"),
    ("Maria Oliveira"),
    ("Carlos Ferreira");


INSERT INTO 
    `MemberEventType` (`met_id_member`, `met_id_event_type`)
VALUES
    (1, 1),
    (1, 2),
    (2, 5),
    (3, 3),
    (3, 4);

INSERT INTO 
    `MemberEvent` (`me_id_member`, `me_id_event`)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 3),
    (3, 4);