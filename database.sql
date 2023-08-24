
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
select * from history;
drop table notifications;
CREATE TABLE IF NOT EXISTS notifications (
    noti_id INT AUTO_INCREMENT,
    time TIMESTAMP,
    message VARCHAR(50),
    PRIMARY KEY (noti_id)
);
select *  from parameters;
select * from devices order by time desc;
delete from devices where time = '2023-7-20 12:20:20';
insert into parameters (temperature, pH, ec, humidity, time) values( 35.4, 2.1, 0.8, 20, '2024-7-1 17:23:54');
insert into parameters (temperature, pH, ec, humidity, time) values( 32.4, 2.4, 0.7, 30, '2024-7-3 10:23:54');
insert into devices (light, ec_pump, ph_pump, oxi_pump, time) values
('On', 'Off', 'Off', 'Off', '2023-7-13 7:20:20'),
( 'Off', 'Off','Off' , 'Off', '2023-7-13 10:40:20'),
( 'On', 'Off', 'On', 'Off', '2023-7-20 12:20:20'),
( 'On', 'Off', 'Off', 'Off', '2023-7-12 13:20:20');
delete from devices where cd_id = 34;
insert into devices (light, ec_pump, ph_pump, oxi_pump, time) values
( 'Off', 'Off', 'Off', 'Off', '2023-7-20 13:20:20'),
( 'On', 'Off', 'Off', 'Off', '2023-7-21 4:20:20'),
( 'On', 'On', 'Off', 'Off', '2023-7-21 4:21:20'),
( 'On', 'On', 'On', 'Off', '2023-7-21 4:30:20'),
( 'On', 'On', 'On', 'On', '2023-7-21 5:20:20'),
( 'On', 'On', 'Off', 'On', '2023-7-22 0:20:20'),
( 'On', 'On', 'Off', 'Off', '2023-7-22 1:20:20'),
( 'Off', 'Off', 'Off', 'Off', '2023-7-22 4:20:20');

SELECT
    date,
    SUM(TIME_TO_SEC(TIMEDIFF(off_time, on_time))) / 3600 AS total_light_on_hours
FROM (
    SELECT
        DATE(time) AS date,
        time,
        light,
        @off_time AS off_time,
        CASE
            WHEN light = 'On' AND @light = 'Off' THEN @off_time := time
            WHEN light = 'Off' THEN @off_time := time
        END AS set_off_time,
        @light := light AS set_light,
        @on_time AS on_time,
        CASE
            WHEN light = 'Off' AND @light = 'On' THEN @on_time := time
            WHEN light = 'On' THEN @on_time := time
        END AS set_on_time
    FROM devices, (SELECT @off_time := NULL, @on_time := NULL, @light := NULL) AS vars
    WHERE time BETWEEN '2023-07-12' AND '2023-07-22'
    ORDER BY time
) AS subquery
WHERE light = 'On' AND off_time IS NOT NULL
GROUP BY date
ORDER BY date;



