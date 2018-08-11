<?php
/*
 * Get all files need together
 * @author Jahidul Pabel Islam
*/

date_default_timezone_set("Europe/London");

//using include to include all php files needed
include $_SERVER['DOCUMENT_ROOT'] . '/config.php';  // Copy config-sample.php and rename to config.php then fill in necessary constant
include 'Database.php';
include 'Hasher.php'; // Copy admin/inc/Hasher-sample.php and rename to Hasher.php then update both the functions with your Hashing functionality
include 'Auth.php';  // Copy admin/inc/Auth-sample.php and rename to Auth.php then update all 3 functions with your Auth functionality
include 'functions.php';
include 'portfolioFunctions.php';