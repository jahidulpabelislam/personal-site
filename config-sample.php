<?php
/*
 * Sets Constants for Connection to the Database
 * @author Jahidul Pabel Islam
*/

if (!defined("DEBUG")) {
	define("DEBUG", false);
}

// IP of database server
if (!defined("DB_IP")) {
	define("DB_IP", "localhost");
}
// Database name to use in server
if (!defined("DB_NAME")) {
	define("DB_NAME", "jpi");
}
// Username to database
if (!defined("DB_USERNAME")) {
	define("DB_USERNAME", "root");
}
// Password for the user above
if (!defined("DB_PASSWORD")) {
	define("DB_PASSWORD", "");
}

// The API endpoint for my portfolio
if (!defined("JPI_API_ENDPOINT")) {
	define("JPI_API_ENDPOINT", "https://api.jahidulpabelislam.com");
}
if (!defined("JPI_API_VERSION")) {
	define("JPI_API_VERSION", "3");
}