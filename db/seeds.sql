INSERT INTO department (id, name)
VALUES
('101', 'salon'),
('102', 'sales'),
('103', 'cashier'),
('104', 'management');
    
INSERT INTO role (id, title, salary, department_id)
VALUES
( '201', 'Hairstylist', '50000', '101'),
( '202','Color Specialist', '60000', '101'),
( '203','Barber', '50000', '101'),
( '204','Salon Manager', '80000', '101'),
( '205','Beauty Advisor', '35000', '101'),
( '206','Brow Specialist', '50000', '101'),
( '207','Makeup Artist', '50000', '101'),
( '208','Skin Representative', '50000', '109'),
( '209','Store Manager', '80000', '101');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id )
VALUES
('1', 'Stacey', 'Wilder', '201', '4'),
('2', 'Kim', 'Sho', '202', '4'),
('3', 'James', 'Lampy', '203', '4'),
('4', 'Brett', 'Smith', '204', '10'),
('5', 'Rhonda', 'Finn', '205', '10'),
('6', 'Sara', 'Beggs', '205', '10'),
('7', 'Mike', 'Fanta', '206', '10'),
('8', 'Beckii', 'White', '207', '10'),
('9', 'Bryant', 'Brown', '208', '10'),
('10', 'Alyssa', 'Grape', '209', NULL);
