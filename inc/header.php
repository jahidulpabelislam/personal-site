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
        <!-- Bootstrap stylesheet-->
        <link href="/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <!-- Custom stylesheet for site -->
        <link href="/lib/main.css" rel="stylesheet" title="style" media="all" type="text/css">

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="/lib/bootstrap/js/bootstrap.min.js"></script>

        <!-- the favicon for browsers -->
        <link rel="icon" href="/images/logo.png">
        <title><?php echo $title ?> | Jahidul Pabel Islam</title>
    </head>

    <body>

        <nav class="navbar navbar-inverse navbar-fixed-top" id="nav">
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
                                                                              alt="Jahidul Pabel Islam Logo" <?php if ($title == "Home") echo "style='opacity:1;'"; ?> ></a>
                    <a class="navbar-brand" id="name" href="/" <?php if ($title == "Home") echo "style='color:white;'"; ?> >Jahidul Pabel
                        Islam</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse ">
                    <ul class="nav navbar-nav navbar-right">
                        <li <?php if ($title == "Home") echo "class='active'"; ?> ><a href="/"
                                                                                      title="Link to Home Page">Home</a></li>
                        <li <?php if ($title == "Projects") echo "class='active'"; ?> ><a href="/projects/"
                                                                                               title="Link to Projects Page">Projects</a></li>
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
        <header class="jumbotron" <?php echo "id='". $title ."'" ?>>
            <div class="container">
                <h1><?php echo $title ?></h1>
                <hr>
                <p><?php echo $description2 ?></p>
            </div>
        </header>

        <section>
            <div id="sectionInnerContainer">


