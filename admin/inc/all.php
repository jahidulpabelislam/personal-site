<?php
/*
 * Get all files need together
 * @author Jahidul Pabel Islam
*/

date_default_timezone_set("Europe/London");

//using include to include all php files needed
include $_SERVER['DOCUMENT_ROOT'] . '/config.php';
include 'database.php';
include 'Hasher.php';
include 'Auth.php';
include 'functions.php';
include 'portfolioFunctions.php';