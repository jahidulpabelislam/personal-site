<!DOCTYPE html>
<html lang="en-gb">

    <head>
        <?php
        $head_title = $title . " | Jahidul Pabel Islam - Full Stack Developer";
        if ($title === "Home")
        {
            $head_title = "Full Stack Developer, Jahidul Pabel Islam's Portfolio";
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

        <meta name="theme-color" content="#337ab7"/>

        <!-- Custom stylesheet for site -->
        <link href="/lib/css/main.min.css" rel="stylesheet" title="style" media="all" type="text/css"/>

        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>

        <!-- Favicons/Icons for devices -->
        <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-touch-icon-57x57.png?v=1">
        <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-touch-icon-60x60.png?v=1">
        <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-touch-icon-72x72.png?v=1">
        <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-touch-icon-76x76.png?v=1">
        <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-touch-icon-114x114.png?v=1">
        <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-touch-icon-120x120.png?v=1">
        <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-touch-icon-144x144.png?v=1">
        <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-touch-icon-152x152.png?v=1">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-180x180.png?v=1">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png?v=1">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png?v=1">
        <link rel="manifest" href="/images/site.webmanifest?v=1">
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg?v=1" color="#0375b4">
        <link rel="shortcut icon" href="/images/favicon.ico?v=1">
        <meta name="msapplication-TileColor" content="#f5f5f5">
        <meta name="msapplication-TileImage" content="/images/mstile-144x144.png?v=1">
        <meta name="msapplication-config" content="/images/browserconfig.xml?v=1">
        <meta name="theme-color" content="#ffffff">
    </head>

    <body>

        <nav class="navbar navbar-default navbar-fixed-top" id="nav">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                            aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" id="logoContainer" href="/"><img id="logo" src="/images/logo.png"
                                                                             alt="Jahidul Pabel Islam Logo" <?php if ($title == "Home") echo "style='opacity:1;' class='current'"; ?> ></a>
                    <a class="navbar-brand" id="name" href="/" <?php if ($title == "Home") echo "style='color: #337ab7;'"; ?> >Jahidul
                        Pabel
                        Islam</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse ">
                    <ul class="nav navbar-nav navbar-right">
                        <li <?php if ($title == "Home") echo "class='active'"; ?> ><a href="/"
                                                                                      title="Link to Home Page">Home</a></li>
                        <li <?php if ($title == "Projects") echo "class='active'"; ?> ><a href="/projects/"
                                                                                          title="Link to Projects Page">Projects</a>
                        </li>
                        <li <?php if ($title == "Contact") echo "class='active'"; ?> ><a href="/contact/"
                                                                                         title="Link to Contact Page">Contact</a>
                        </li>
                        <li <?php if ($title == "About") echo "class='active'"; ?> ><a href="/about/"
                                                                                       title="Link to About Page">About</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>

        <!-- Main for a primary marketing message or call to action -->
        <header class="jumbotron" <?php echo "id='" . $title . "'" ?>>
            <div class="container">
                <h1 class="wow fadeInDown" data-wow-delay="0.2s"><?php echo $title ?></h1>
                <hr>
                <p class="wow fadeInUp" data-wow-delay="0.4s"><?php echo $description2 ?></p>
            </div>
        </header>

        <section>
            <div id="sectionInnerContainer">