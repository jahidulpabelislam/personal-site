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
        <link href="/lib/css/main.min.css" rel="stylesheet" title="style" media="all" type="text/css">
        <?php else: ?>
        <link href="/lib/css/style.css" rel="stylesheet" title="style" media="all" type="text/css">
        <link href="/lib/css/third-party/animate.min.css" rel="stylesheet" title="style" media="all" type="text/css">
        <?php endif; ?>

        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

        <!-- the favicon for browsers -->
        <link rel="icon" href="/images/favicon.png">

        <meta name="theme-color" content="#337ab7">
        <title><?php echo $title ?> | Jahidul Pabel Islam</title>
    </head>

    <body>

        <nav class="navbar navbar-default navbar-fixed-top" id="nav">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" id="logoContainer" href="/"><img id="logo" src="/images/logo.png" alt="Jahidul Pabel Islam Logo" <?php if ($title == "Home") echo "style='opacity:1;' class='current'"; ?> ></a>
                    <a class="navbar-brand" id="name" href="/" <?php if ($title == "Home") echo "style='color: #337ab7;'"; ?> >JahidulPabel Islam</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse ">
                    <ul class="nav navbar-nav navbar-right">
                        <li <?php if ($title == "Home") echo "class='active'"; ?> ><a href="/" title="Link to Home Page">Home</a></li>
                        <li <?php if ($title == "Projects") echo "class='active'"; ?> ><a href="/projects/" title="Link to Projects Page">Projects</a>
                        </li>
                        <li <?php if ($title == "Contact") echo "class='active'"; ?> ><a href="/contact/" title="Link to Contact Page">Contact</a>
                        </li>
                        <li <?php if ($title == "About") echo "class='active'"; ?> ><a href="/about/" title="Link to About Page">About</a></li>
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