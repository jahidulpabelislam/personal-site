<!DOCTYPE html>
<html lang="en-gb">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Jahidul Pabel Islam">
        <!-- Dynamically insert the description for a page -->
        <meta name="description" content="<?php echo $description ?>">
        <!-- Dynamically insert the keywords for a page -->
        <meta name="keywords" content="<?php echo $keywords ?>">

        <!-- Custom stylesheet for site -->

        <?php if (!isset($_GET["debug"])):?>
        <link href="/assets/css/main.min.css" rel="stylesheet" title="style" media="all" type="text/css">
        <?php else: ?>
        <link href="/assets/css/style.css" rel="stylesheet" title="style" media="all" type="text/css">
        <?php endif; ?>

        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

        <!-- the favicon for browsers -->
        <link rel="icon" href="/assets/images/favicon.png">

        <meta name="theme-color" content="#337ab7">
        <title><?php echo $page_title ?> | Jahidul Pabel Islam</title>
    </head>

    <body>

        <nav class="nav">
            <div class="container">
                <div class="nav__mobile-header">
                    <button type="button" class="nav__links__toggle">
                        <span class="screen-reader-text">Toggle navigation</span>
                        <span class="menu-bar menu-bar--top"></span>
                        <span class="menu-bar menu-bar--middle"></span>
                        <span class="menu-bar menu-bar--bottom"></span>
                    </button>
                    <a class="nav__brand nav__brand--logo-container" href="/<?php if ($page_title == "Home") echo "#";?>"><img class="nav__brand--logo <?php if ($page_title == "Home") echo "current";?>" src="/assets/images/logo.png" alt="Jahidul Pabel Islam Logo"></a>
                    <a class="nav__brand nav__brand--text <?php if ($page_title == "Home") echo "current";?>" href="/">Jahidul Pabel Islam</a>
                </div>
                <div class="nav__links-container closed">
                    <ul class="nav__links">
                        <li <?php if ($page_title == "Home") echo "class='active'"; ?> ><a href="/<?php if ($page_title == "Home") echo "#";?>" title="Link to Home Page">Home</a></li>
                        <li <?php if ($page_title == "Projects") echo "class='active'"; ?> ><a href="/projects/<?php if ($page_title == "Projects") echo "#";?>" title="Link to Projects Page">Projects</a></li>
                        <li <?php if ($page_title == "Contact") echo "class='active'"; ?> ><a href="/contact/<?php if ($page_title == "Contact") echo "#";?>" title="Link to Contact Page">Contact</a></li>
                        <li <?php if ($page_title == "About") echo "class='active'"; ?> ><a href="/about/<?php if ($page_title == "About") echo "#";?>" title="Link to About Page">About</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Main for a primary marketing message or call to action -->
        <header class="jumbotron jumbotron--<?php echo strtolower($page_title);?>">
            <div class="jumbotron__overlay">
                <div class="container">
                    <h1 class="jumbotron__title"><?php echo $header_title ?></h1>
                    <hr class="jumbotron__line-breaker">
                    <p class="jumbotron__desc"><?php echo $header_description ?></p>
                    <img src="/assets/images/down-arrow.svg" class="js-scroll-to-content scroll-to-content">
                </div>
            </div>
        </header>

        <section class="main-content">
            <div class="section-inner-container">