DROP TABLE IF EXISTS Manager_Management;

CREATE TABLE Manager_Management (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(50),
    DisplayName VARCHAR(50),
    Phone VARCHAR(15),
    CustomerMail VARCHAR(255),
    Role ENUM('Admin', 'SuperAdmin', 'Guest', 'User') NOT NULL DEFAULT 'User'
);

INSERT INTO Manager_Management (UserName, DisplayName, Phone, CustomerMail, Role)
VALUES 
    ('yigitavar', 'Yigit', '05358170601', 'yigitavar@hotmail.com', 'SuperAdmin'),
    ('begumselveravar', 'Begum', '05329122345', 'begumavar@hotmail.com', 'Guest'),
    ('hakanavar', 'Hakan', '05324372620', 'hakanavar@hotmail.com', 'Admin'),
    ('fundacetinavar', 'Funda', '05322891259', 'fundaavar@hotmail.com', 'Guest');

SELECT * FROM Manager_Management
