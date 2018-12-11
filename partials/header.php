
		<nav class="nav nav--<?php echo $navTint; ?>">
			<div class="container nav__container">
				<div class="nav__header">
					<button type="button" class="nav__mobile-toggle">
						<span class="screen-reader-text">Toggle navigation</span>
						<span class="menu-bar menu-bar--top"></span>
						<span class="menu-bar menu-bar--middle"></span>
						<span class="menu-bar menu-bar--bottom"></span>
					</button>
					<a class="nav__logo-container" href="/<?php if ($pageId == "home") echo "#"; ?>"><img class="nav__logo <?php if ($pageId == "home") echo "current"; ?>" src="/assets/images/logo.png?v=2" alt="Jahidul Pabel Islam Logo"></a>
				</div>
				<div class="nav__links-container">
					<ul class="nav__links">
						<li class="nav-link__item"><a href="/projects/<?php if ($pageId == "projects") echo "#"; ?>" class="nav-item__link <?php if ($pageId == "projects") echo "active"; ?>" title="Link to Projects Page">Projects</a></li>
						<li class="nav-link__item"><a href="/contact/<?php if ($pageId == "contact") echo "#"; ?>" class="nav-item__link <?php if ($pageId == "contact") echo "active"; ?>" title="Link to Contact Page">Contact</a></li>
						<li class="nav-link__item"><a href="/about/<?php if ($pageId == "about") echo "#"; ?>" class="nav-item__link <?php if ($pageId == "about") echo "active"; ?>" title="Link to About Page">About</a></li>
					</ul>
				</div>
				<div class="nav__social-links-container">
					<ul class="nav__social-links">
						<li class="nav-link__item"><a href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" class="social-link"><img src="/assets/images/linkedin.svg?v=1" alt="Find me on Linkedin /jahidulpabelislam" class="social-link__img social-link__img--linkedin"></a></li>
						<li class="nav-link__item"><a href="https://github.com/jahidulpabelislam/" target="_blank" class="social-link"><img src="/assets/images/github.svg?v=1" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github"></a></li>
						<li class="nav-link__item"><a href="https://www.instagram.com/jahidulcodes/" target="_blank" class="social-link"><span class="social-link__img social-link__img--instagram "><i></i></span></a></li>
					</ul>
				</div>
			</div>
		</nav>

		<!-- Main for a primary marketing message or call to action -->
		<header class="jumbotron jumbotron--<?php echo $pageId; ?>">
			<div class="jumbotron__overlay">
				<div class="container">
					<h1 class="jumbotron__title"><?php echo $title ?></h1>
					<hr class="jumbotron__line-breaker">
					<p class="jumbotron__desc"><?php echo $desc ?></p>
					<img src="/assets/images/down-arrow.svg?v=1" class="js-scroll-to-content jumbotron__scroll-to-content" alt="Arrow point down" aria-label="Jump to content">
				</div>
			</div>
		</header>

		<main class="main-content">
			<div class="main-content__inner">
				<!-- Start Dynamic content for page -->