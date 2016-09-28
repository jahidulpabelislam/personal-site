<?php
$dsn = "mysql:host=hidden;charset-UTF-8";
$username = "hidden";
$password = "hidden";
$dbase = "hidden";
$createquery = "CREATE TABLE IF NOT EXISTS Task (
				    ID int auto_increment PRIMARY KEY,
					Text VARCHAR(100) not null,
					PrecedingID int,
					PlanStartTime int,
					PlanDuration int,
					PlanEndTime int,
					SlackStartTime int,
					SlackDuration int,
					SlackEndTime int,
					PERTX int,
					PERTY int,
					PERTWidth int,
					PERTHeight int,
					ActualStartTime int,
					ActualDuration int,
					ActualEndTime int,
					Complete int,
					CONSTRAINT PrecedingIDIDFK FOREIGN KEY (PrecedingID) REFERENCES Task(ID)
				    );";
?>