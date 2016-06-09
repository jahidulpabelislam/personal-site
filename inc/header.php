<!doctype html>
<html lang="en-gb">

	<head>
		<meta charset="utf-8">
		<!-- Bootstrap stylesheet-->
		<link href="/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="/lib/style.css" rel="stylesheet" title="style" media="all" type="text/css">
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
                    <a class="navbar-brand" id="logo-container" href="/"><img id="logo" src="/images/logo.png" alt="Jahidul Pabel Islam Logo"></a>
                    <a class="navbar-brand" href="/">Jahidul Pabel Islam</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse ">
                    <ul class="nav navbar-nav navbar-right">
                        <li <?php if ($title == "Home") echo "class='active'"; ?> ><a href="/"
                                                                                      title="Link to Home Page">Home</a></li>
                        <li <?php if ($title == "Previous Work") echo "class='active'"; ?> ><a href="/previous-work/"
                                                                                               title="Link to Previous Work Page">Previous
                                Work</a></li>
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
        <header>
            <div class="container">
                <h1><?php echo $title ?></h1>
                <hr>
                <p><?php echo $description2 ?></p>
            </div>
        </header>

        <section>
            <div class="container">