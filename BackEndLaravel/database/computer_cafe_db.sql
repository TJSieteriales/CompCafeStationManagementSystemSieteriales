DROP DATABASE IF EXISTS computer_cafe_db;
Drop Table stations;
CREATE DATABASE computer_cafe_db;

USE computer_cafe_db;

CREATE TABLE stations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    station_name VARCHAR(100) NOT NULL,
    tier VARCHAR(100) NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

INSERT INTO stations(station_name, tier, hourly_rate, created_at, updated_at)
VALUES
    ('PC-001', 'Regular', 40.00, NOW(), NOW()),
    ('PC-002', 'VIP', 60.00, NOW(), NOW()),
    ('PC-003', 'Streaming Room', 100.00, NOW(), NOW());

SELECT * FROM stations;