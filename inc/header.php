<!DOCTYPE html>
<html lang="en-gb">

    <head>
        <?php
        $head_title = $title . " | Jahidul Pabel Islam - Full Stack Web & Software Developer";
        if ($title === "Home")
        {
            $head_title = "Full Stack Web & Software Developer, Jahidul Pabel Islam's Portfolio";
        }
        ?>
        <title><?php echo $head_title; ?></title>

        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="author" content="Jahidul Pabel Islam"/>
        <!-- Dynamically insert the description for a page -->
        <meta name="description" content="<?php echo $description; ?>"/>
        <!-- Dynamically insert the keywords for a page -->
        <meta name="keywords" content="<?php echo $keywords; ?>"/>

        <!-- Custom stylesheet for site -->

        <?php if (!isset($_GET["debug"])):?>
        <link href="/assets/css/main.min.css?v=1" rel="stylesheet" title="style" media="all" type="text/css">
        <?php else: ?>
        <link href="/assets/css/style.css?v=1" rel="stylesheet" title="style" media="all" type="text/css">
        <?php endif; ?>

        <?php
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 'https' : 'http';
        $url = $protocol . '://' .$_SERVER["SERVER_NAME"] . "/";
        $page_url = $url;
        if ($title !== "Home")
        {
            $page_url .= strtolower($title);
        }
        ?>
        <meta property="og:title" content="<?php echo $head_title; ?>"/>
        <meta property="og:url" content="<?php echo $page_url; ?>"/>
        <meta property="og:description" content="<?php echo $description; ?>"/>

        <?php
        $image_url = $url . "images/portfolio-". strtolower($title) . "-preview.png";
        ?>
        <meta property="og:image" content="<?php echo $image_url; ?>"/>

        <meta name="twitter:card" content="summary_large_image"/>

        <link href="https://fonts.googleapis.com/css?family=Cabin|Oswald" rel="stylesheet">

        <meta name="theme-color" content="#0375b4">
        <title><?php echo $page_title ?> | Jahidul Pabel Islam</title>

        <!-- Favicons/Icons for devices -->
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicons/apple-touch-icon-57x57.png?v=1"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicons/apple-touch-icon-60x60.png?v=1"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicons/apple-touch-icon-72x72.png?v=1"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicons/apple-touch-icon-76x76.png?v=1"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicons/apple-touch-icon-114x114.png?v=1"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicons/apple-touch-icon-120x120.png?v=1"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicons/apple-touch-icon-144x144.png?v=1"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicons/apple-touch-icon-152x152.png?v=1"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon-180x180.png?v=1"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png?v=1"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png?v=1"/>
        <link rel="manifest" href="/assets/favicons/site.webmanifest?v=1"/>
        <link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg?v=1" color="#0375b4"/>
        <link rel="shortcut icon" href="/assets/favicons/favicon.ico?v=1"/>
        <meta name="msapplication-TileColor" content="#f5f5f5"/>
        <meta name="msapplication-TileImage" content="/assets/favicons/mstile-144x144.png?v=1"/>
        <meta name="msapplication-config" content="/assets/favicons/browserconfig.xml?v=1"/>
        <meta name="theme-color" content="#337ab7"/>

    </head>

    <body>

        <nav class="nav nav--<?php echo $nav_tint; ?>">
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

        <?php
        $css_page_title = strtolower($page_title);
        $css_page_title = str_replace(" ", "-", $css_page_title);
        ?>

        <!-- Main for a primary marketing message or call to action -->
        <header class="jumbotron jumbotron--<?php echo $css_page_title; ?>">
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