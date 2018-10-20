<!DOCTYPE html>
<html lang="en-gb">

	<head>

		<?php
		$environment = !empty(getenv('APPLICATION_ENV')) ? getenv('APPLICATION_ENV') : "development";

		// Only want Google Analytic for live site
		if ($environment === "production") {
			?>
			<!-- Global site tag (gtag.js) - Google Analytics -->
			<script async src="https://www.googletagmanager.com/gtag/js?id=UA-70803146-2" type="text/javascript"></script>
			<script type="text/javascript">
				window.dataLayer = window.dataLayer || [];

				function gtag() {
					dataLayer.push(arguments);
				}

				gtag('js', new Date());

				gtag('config', 'UA-70803146-2');
			</script>
			<?php
		}
		?>

		<?php
		$headTitle = $pageTitle . " | Jahidul Pabel Islam - Full Stack Web & Software Developer";
		if ($pageId === "Home") {
			$headTitle = "Full Stack Web & Software Developer, Jahidul Pabel Islam's Portfolio";
		}
		?>

		<title><?php echo $headTitle; ?></title>

		<?php
		$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 'https' : 'http';
		$localURL = $protocol . '://' . $_SERVER["SERVER_NAME"] . "/";
		$liveURl = "https://jahidulpabelislam.com/";
		
		$pageTitleFormatted = strtolower($pageTitle);
		$pageTitleFormatted = str_replace(" ", "-", $pageTitleFormatted);
		
		if ($pageId !== "Home") {
			$liveURl .= $pageTitleFormatted . "/";
		}
		
		$indexedPages = array(
			"Home",
			"Projects",
			"Contact",
			"About",
			"Links",
			"Site Map",
		);
		
		if (in_array($pageId, $indexedPages) && $environment === "production") {
			echo "<link rel='canonical' href='$liveURl'/>";
		}
		else {
			echo "<meta name='robots' content='noindex,nofollow'/>";
		}
		?>

		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<meta name="author" content="Jahidul Pabel Islam"/>
		<!-- Dynamically insert the description for a page -->
		<meta name="description" content="<?php echo $description; ?>"/>
		<!-- Dynamically insert the keywords for a page -->
		<meta name="keywords" content="<?php echo $keywords; ?>"/>
		
		<meta property="og:locale" content="en_GB"/>
		<meta property="og:type" content="website"/>
		<meta property="og:title" content="<?php echo $headTitle; ?>"/>
		<meta property="og:url" content="<?php echo $liveURl; ?>"/>
		<meta property="og:description" content="<?php echo $description; ?>"/>
		<meta property="og:site_name" content="Jahidul Pabel Islam"/>

		<?php
		$imageLocation = "assets/images/portfolio-$pageTitleFormatted-preview.png";

		if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/" . $imageLocation)) {
			$imageUrl = $localURL . $imageLocation . "?v=2";
			?>
			<meta property="og:image" content="<?php echo $imageUrl; ?>"/>
			<?php
		}
		?>

		<meta name="twitter:card" content="summary_large_image"/>
		<meta name="twitter:title" content="<?php echo $headTitle; ?>"/>
		
		<!-- Custom stylesheet for site -->
		<?php if (!isset($_GET["debug"])) {
			?>
			<link href="/assets/css/main.min.css?v=1" rel="stylesheet" title="style" media="all" type="text/css">
			<?php
		}
		else {
			?>
			<link href="/assets/css/style.css?v=1" rel="stylesheet" title="style" media="all" type="text/css">
			<?php
		};
		?>
		
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" title="style" media="all" type="text/css">
		
		<link href="https://fonts.googleapis.com/css?family=Cabin|Oswald" rel="stylesheet">

		<?php
		include $_SERVER['DOCUMENT_ROOT'] . '/partials/favicons.php';
		?>
	</head>

	<body>

		<nav class="nav nav--<?php echo $navTint; ?>">
			<div class="container nav__container">
				<div class="nav__header">
					<button type="button" class="nav__mobile-toggle">
						<span class="screen-reader-text">Toggle navigation</span>
						<span class="menu-bar menu-bar--top"></span>
						<span class="menu-bar menu-bar--middle"></span>
						<span class="menu-bar menu-bar--bottom"></span>
					</button>
					<a class="nav__logo-container" href="/<?php if ($pageId == "Home") echo "#"; ?>"><img class="nav__logo <?php if ($pageId == "Home") echo "current"; ?>" src="/assets/images/logo.png?v=2" alt="Jahidul Pabel Islam Logo"></a>
				</div>
				<div class="nav__links-container">
					<ul class="nav__links">
						<li class="nav-link__item"><a href="/projects/<?php if ($pageId == "Projects") echo "#"; ?>" class="nav-item__link <?php if ($pageId == "Projects") echo "active"; ?>" title="Link to Projects Page">Projects</a></li>
						<li class="nav-link__item"><a href="/contact/<?php if ($pageId == "Contact") echo "#"; ?>" class="nav-item__link <?php if ($pageId == "Contact") echo "active"; ?>" title="Link to Contact Page">Contact</a></li>
						<li class="nav-link__item"><a href="/about/<?php if ($pageId == "About") echo "#"; ?>" class="nav-item__link <?php if ($pageId == "About") echo "active"; ?>" title="Link to About Page">About</a></li>
					</ul>
				</div>
				<div class="nav__social-links-container">
					<ul class="nav__social-links">
						<li class="nav-link__item"><a href="https://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="social-link"><img src="/assets/images/linkedin.svg?v=1" alt="Find me on Linkedin /jahidulpabelislam" class="social-link__img social-link__img--linkedin"></a></li>
						<li class="nav-link__item"><a href="https://github.com/jahidulpabelislam" target="_blank" class="social-link"><img src="/assets/images/github.svg?v=1" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github"></a></li>
						<li class="nav-link__item"><a href="https://www.instagram.com/jahidulcodes/" target="_blank" class="social-link"><span class="social-link__img social-link__img--instagram "><i></i></span></a></li>
					</ul>
				</div>
			</div>
		</nav>

		<!-- Main for a primary marketing message or call to action -->
		<header class="jumbotron jumbotron--<?php echo $pageTitleFormatted; ?>">
			<div class="jumbotron__overlay">
				<div class="container">
					<h1 class="jumbotron__title"><?php echo $headerTitle ?></h1>
					<hr class="jumbotron__line-breaker">
					<p class="jumbotron__desc"><?php echo $headerDesc ?></p>
					<img src="/assets/images/down-arrow.svg?v=1" class="js-scroll-to-content jumbotron__scroll-to-content">
				</div>
			</div>
		</header>

		<section class="main-content">
			<div class="section-inner-container">
