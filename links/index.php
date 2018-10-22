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

		<title>Social Media Links | Jahidul Pabel Islam - Full Stack Web & Software Developer</title>

		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<meta name="author" content="Jahidul Pabel Islam"/>
		<meta name="description" content="Social Media Links for Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England."/>
		<meta name="keywords" content=""/>

		<?php
		$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 'https' : 'http';
		$url = $protocol . '://' . $_SERVER["SERVER_NAME"] . "/";
		$pageUrl = $url . "links/";
		?>
		<meta property="og:title" content="Social Media Links | Jahidul Pabel Islam - Full Stack Developer"/>
		<meta property="og:url" content="<?php echo $pageUrl; ?>"/>
		<meta property="og:description" content="Social Media Links for Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England."/>

		<?php
		$imageUrl = $url . "images/portfolio-links-preview.png?v=2";
		?>
		<meta property="og:image" content="<?php echo $imageUrl; ?>"/>

		<meta name="twitter:card" content="summary_large_image"/>

		<!-- Custom stylesheet for site -->
		<?php if (!isset($_GET["debug"])) {
			?>
			<link href="/assets/css/main.min.css?v=1" rel="stylesheet" title="style" media="all" type="text/css"/>
			<?php
		}
		else {
			?>
			<link href="/assets/css/style.css?v=1" rel="stylesheet" title="style" media="all" type="text/css"/>
			<?php
		};
		?>

		<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet"/>
		<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"/>

		<?php
		include $_SERVER['DOCUMENT_ROOT'] . '/partials/favicons.php';
		?>
	</head>

	<body>
		<main class="main-content social-links-page">
			<div class="container">

				<div class="social-link-container">
					<a href="https://facebook.com/jahidulpabelislam/" target="_blank" class="social-link">
						<img src="/assets/images/facebook.svg?v=1" alt="Add Me facebook.com/jahidulpabelislam" class="social-link__img social-link__img--facebook">
						<p class="social-link__text social-link__text--facebook"> /jahidulpabelislam</p>
					</a>
				</div>

				<div class="social-link-container">
					<a href="https://twitter.com/itsjahidulislam/" target="_blank" class="social-link">
						<img src="/assets/images/twitter.png?v=2" alt="Follow Me @ItsJahidulIslam" class="social-link__img social-link__img--twitter">
						<p class="social-link__text social-link__text--twitter"> @ItsJahidulIslam</p>
					</a>
				</div>

				<div class="social-link-container">
					<a href="https://instagram.com/jahidulpabelislam/" target="_blank" class="social-link">
						<span class="social-link__img social-link__img--instagram"><i></i></span>
						<p class="social-link__text social-link__text--instagram"> @jahidulpabelislam</p>
					</a>
				</div>

				<div class="social-link-container social-link-container--snapchat">
					<!--Snapcode-->
					<a class="social-link" href="https://snapchat.com/add/jahidulpislam/" target="_blank">
						<object data="https://feelinsonice-hrd.appspot.com/web/deeplink/snapcode?username=jahidulpislam&amp;type=PNG" type="image/png" class="social-link__img social-link__img--snapchat"></object>
						<p class="social-link__text social-link__text--snapchat">jahidulpislam</p>
					</a>
				</div>

				<div class="social-link-container">
					<a href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" class="social-link">
						<img src="/assets/images/linkedin.svg?v=1" alt="Find me on Linkedin /jahidulpabelislam" class="social-link__img social-link__img--linkedin">
						<p class="social-link__text social-link__text--linkedin"> /jahidulpabelislam</p>
					</a>
				</div>

				<div class="social-link-container">
					<a href="https://github.com/jahidulpabelislam/" target="_blank" class="social-link">
						<img src="/assets/images/github.svg?v=1" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github">
						<p class="social-link__text social-link__text--github"> /jahidulpabelislam</p>
					</a>
				</div>

				<div class="social-link-container">
					<a href="https://instagram.com/jahidulcodes/" target="_blank" class="social-link">
						<span class="social-link__img social-link__img--instagram"><i></i></span>
						<p class="social-link__text social-link__text--instagram"> @jahidulcodes</p>
					</a>
				</div>

			</div>
		</main>

		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" type="text/javascript"></script>
		<script src="/assets/js/jpi/stickyFooter.js?v=1" type="text/javascript"></script>
	</body>

</html>