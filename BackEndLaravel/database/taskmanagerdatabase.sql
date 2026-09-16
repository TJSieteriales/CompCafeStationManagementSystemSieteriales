//Copy this code in mysql for database

CREATE DATABASE IF NOT EXISTS task_manager_db;
USE task_manager_db;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    due_date DATE NULL,
    is_done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, category, priority, due_date, is_done) VALUES
('Create React interface', 'Development', 'High', '2026-09-05', FALSE),
('Set up Laravel API', 'Backend', 'Medium', '2026-09-06', FALSE),
('Create project folders', 'Setup', 'Low', '2026-09-02', TRUE);

SELECT * FROM tasks;