<?php
$pageId = "site-map";
$pageTitle = $headerTitle = "Site Map";
$keywords = "";
$description = "Site Map for Jahidul Pabel Islam's Portfolio, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$headerDesc = "";

$navTint = "light";

include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php';
?>

				<div class="article">
					<div class="container">
						<ul class="site-map__list">
							<li>
								<a href="/" class="link">Home</a>
							</li>
							<li>
								<a href="/projects/" class="link">Projects</a>
								<ul>
									<li>
										<a href="/projects/mind-map/" class="link">Mind Map</a>
									</li>
									<li>
										<a href="/projects/bubbles-bargain-world/" class="link">BubblesBargainWorld</a>
									</li>
									<li>
										<a href="/projects/lials/" class="link">Lials</a>
									</li>
									<li>
										<a href="/projects/muesli/" class="link">Muesli</a>
									</li>
									<li>
										<a href="/projects/izibalo-android/frame.html" class="link">Izibalo - Android</a>
									</li>
									<li>
										<a href="/projects/e-games/" class="link">e-games</a>
									</li>
									<li>
										<a href="/projects/sportsite-universal/" class="link">Sportsite Universal</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="/contact/" class="link">Contact</a>
							</li>
							<li>
								<a href="/about/" class="link">About</a>
							</li>

							<li>
								<a href="/links/" class="link">Links</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="article article--halved">
					<div class="container">
						<div class="article__half">
							<a class="btn btn--red" href="/contact/">Get in Touch</a>
						</div>

						<div class="article__half">
							<a class="btn btn--purple" href="/projects/">View My Work</a>
						</div>
					</div>
				</div>
<?php
include $_SERVER['DOCUMENT_ROOT'] . '/partials/footer.php';
?>