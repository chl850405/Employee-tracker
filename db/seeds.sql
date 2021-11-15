INSERT INTO department ('id', 'name')
VALUES
    ('101', 'salon'),
    ('102', 'sales'),
    ('103', 'cashier'),
    ('104', 'management');
    
INSERT INTO roles ('title', 'salary', 'department_id')
VALUES
    ( 'Hairstylist', '50000', '101'),
    ( 'Color Specialist', '60000', '101'),
    ( 'Barber', '50000', '101'),
    ( 'Salon Manager', '80000', '101'),
    ( 'Beauty Advisor', '35000', '101'),
    ( 'Brow Specialist', '50000', '101'),
    ( 'Makeup Artist', '50000', '101'),
    ( 'Skin Representative', '50000', '101'),
    ( 'Store Manager', '80000', '101');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id )
VALUES
    ('1', 'Stacey', 'Wilder', 'Hairstylist', 'Brett Smith'),
    ('2', 'Kim', 'Sho', 'Color Specialist', 'Brett Smith'),
    ('3', 'James', 'Lampy', 'Barber', 'Brett Smith'),
    ('4', 'Brett', 'Smith', 'Salon Manager', 'Alyssa Grape'),
    ('5', 'Rhonda', 'Finn', 'Beauty Advisor', 'Alyssa Grape'),
    ('6', 'Sara', 'Beggs', 'Beauty Advisor', 'Alyssa Grape'),
    ('7', 'Mike', 'Fanta', 'Brow Specialist', 'Alyssa Grape'),
    ('8', 'Beckii', 'White', 'Makeup Representative', 'Alyssa Grape'),
    ('9', 'Bryant', 'Brown', 'Skin Representative', 'Alyssa Grape'),
    ('10', 'Alyssa', 'Grape', 'Store Manager', '');
