<?php
/*
 * Sets Constants for Connection to Database
 * @author 733474
*/

//IP of database server
define('IP', hidden);
//Database name for Lials
define('DATABASENAME', hidden);
//Username to database
define('USERNAME', hidden);
//Password for the user above
define('PASSWORD', hidden);


//Queries to create tables in database if there is none there
$CREATEQUERY = "CREATE TABLE IF NOT EXISTS User (Username VARCHAR(100) NOT NULL, Password VARCHAR(500) NOT NULL,Picture VARCHAR(50),Private BOOLEAN NOT NULL, PRIMARY KEY (Username) ); CREATE TABLE IF NOT EXISTS Goal (ID INT AUTO_INCREMENT, Goal VARCHAR(100) NOT NULL, Due DATE NOT NULL, Upload DATE NOT NULL, Username VARCHAR(100) NOT NULL, Completion BOOLEAN default false, PRIMARY KEY (ID), CONSTRAINT UsernameFK FOREIGN KEY (Username) REFERENCES User(Username) ); CREATE TABLE IF NOT EXISTS Comment (ID INT AUTO_INCREMENT, Comment VARCHAR(100) NOT NULL, GoalID INT NOT NULL, Username VARCHAR(100) NOT NULL, Upload DATE NOT NULL, PRIMARY KEY (ID), CONSTRAINT GoalIDFK FOREIGN KEY (GoalID) REFERENCES Goal(ID) ); CREATE TABLE IF NOT EXISTS Follow (Username1 VARCHAR(100) NOT NULL, Following VARCHAR(100) NOT NULL, PRIMARY KEY (Username1, Following), CONSTRAINT UsernameFK2 FOREIGN KEY (Username1) REFERENCES User(Username), CONSTRAINT FollowingFK FOREIGN KEY (Following) REFERENCES User(Username) ); CREATE TABLE IF NOT EXISTS Likes (Username VARCHAR(100) NOT NULL, GoalID INT NOT NULL, Liked BOOLEAN default true, PRIMARY KEY (Username, GoalID), CONSTRAINT UsernameFK3 FOREIGN KEY (Username) REFERENCES User(Username), CONSTRAINT GoalIDFK2 FOREIGN KEY (GoalID) REFERENCES Goal(ID) );";