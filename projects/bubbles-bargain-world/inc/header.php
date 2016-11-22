<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Jahidul Pabel Islam">
    <!-- Dynamically insert the description for a page -->
    <meta name="description"
          content="<?php echo $description ?>">
    <!-- Dynamically insert the keywords for a page -->
    <meta name="keywords"
          content="<?php echo $keywords ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Dynamically insert the title for a page -->
    <title><?php echo $title ?> - Bubbles Bargain World</title>
    <!-- the favicon for browsers -->
    <link rel="icon" href="/projects/bubbles-bargain-world/images/favicon.png">
    <!-- the style sheet for the site -->
    <link rel="stylesheet" type="text/css" href="/projects/bubbles-bargain-world/lib/style.css"/>
</head>

<body>
<!-- header container which includes logo and opening hours -->
<header>

    <!-- Logo -->
    <a href="/"><img id="logo" src="/projects/bubbles-bargain-world/images/logo.png" alt="Bubbles Bargain World Logo"></a>

    <!-- Div containing opening hours -->
    <div id="openingHours">

        <!-- The opening hour for each day -->
        <p id="monday">Monday: 9am - 5:30pm</p>
        <p id="tuesday">Tuesday: 9am - 5:30pm</p>
        <p id="wednesday">Wednesday: 9am - 5:30pm</p>
        <p id="thursday">Thursday: 9am - 5:30pm</p>
        <p id="friday">Friday: 9am - 5:30pm</p>
        <p id="saturday">Saturday: 9am - 5:30pm</p>
        <p id="sunday">Sunday: 10am - 4pm</p>
    </div>
</header>

<!-- Navigation bar -->
<nav>

    <!-- Menu Icon/Only used for smaller screens -->
    <img id="menuIcon" src="/projects/bubbles-bargain-world/images/menuIcon.svg" alt="Menu">

    <!-- The different links -->
    <ul>
        <!-- Check if page is any of the ones in nav menu -->
        <li><a <?php if ($title == "Home") echo "id='current'"; ?> href="/">Home</a></li>
        <li><a <?php if ($title == "Products") echo "id='current'"; ?> href="/products">Products</a></li>
        <li><a <?php if ($title == "Contact") echo "id='current'"; ?> href="/contact">Contact</a></li>
        <li><a <?php if ($title == "About") echo "id='current'"; ?> href="/about">About</a></li>
    </ul>
</nav>

<!-- The main content -->
<section>

    <!-- Dynamically insert the heading for a page -->
    <!-- Heading for a page -->
    <h1><?php echo $title ?></h1>