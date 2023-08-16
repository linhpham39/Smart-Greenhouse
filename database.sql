
CREATE DATABASE GREENHOUSE;

USE GREENHOUSE;
Set global local_infile=1;
CREATE TABLE IF NOT EXISTS parameters (
    para_id INT AUTO_INCREMENT,
    temperature REAL,
    ph REAL,
    ec REAL,
    humidity INT,
    time TIMESTAMP,
    PRIMARY KEY (para_id)
);

CREATE TABLE IF NOT EXISTS devices (
    cd_id INT AUTO_INCREMENT,
    light ENUM('On', 'Off'),
    ec_pump ENUM('On', 'Off'),
    ph_pump ENUM('On', 'Off'),
    oxi_pump ENUM('On', 'Off'),
    time TIMESTAMP,
    PRIMARY KEY (cd_id),
    CHECK (light IN ('On', 'Off')),
    CHECK (ec_pump IN ('On', 'Off')),
    CHECK (ph_pump IN ('On', 'Off')),
    CHECK (oxi_pump IN ('On', 'Off'))
);

CREATE TABLE IF NOT EXISTS history (
    history_id INT AUTO_INCREMENT,
    time TIMESTAMP,
    message VARCHAR(50),
    PRIMARY KEY (history_id)
);

insert into parameters (temperature, pH, ec, humidity, time) values( 35.4, 2.1, 0.8, 20, '2024-7-1 17:23:54');
insert into parameters (temperature, pH, ec, humidity, time) values( 32.4, 2.4, 0.7, 30, '2024-7-3 10:23:54');
insert into devices (light, ec_pump, ph_pump, oxi_pump, time) values
('On', 'Off', 'Off', 'Off', '2024-7-13 7:20:20'),
( 'Off', 'Off','Off' , 'Off', '2024-7-13 10:40:20'),
( 'On', 'Off', 'On', 'Off', '2024-7-20 12:20:20'),
( 'On', 'Off', 'Off', 'Off', '2024-7-120 13:20:20');

