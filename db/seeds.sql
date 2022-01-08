USE employee_tracker_db;

INSERT INTO department (name)
VALUES
('salon'),
('sales'),
('cashier'),
('management');
    
INSERT INTO role (title, salary department_id)
VALUES
('Hairstylist', 50000, 1),
('Color Specialist', 60000, 1),
('Barber', 50000,1),
('Salon Manager', 80000, 1),
('Brow Specialist', 50000, 2),
('Makeup Representative', 50000, 2),
('Skin Representative', 50000, 2),
('Beauty Advisor', 35000, 3),
('Store Manager', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES
('Stacey', 'Wilder', 1, 4),
('Kim', 'Sho', 2, 4),
('James', 'Lampy', 3, 4),
('Brett', 'Smith', 4, 9),
('Rhonda', 'Finn', 5, 9),
('Sara', 'Beggs', 6, 9),
('Mike', 'Fanta', 7, 9),
('Beckii', 'White', 8, 9);
('Bryant', 'Brown', 9, NULL),

