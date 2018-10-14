<?php
//title of page to use
$pageTitle = "401";

$headerTitle = "401";

//the description to use for page
$description = "Error: 401 - Unauthorized message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$headerDesc = "Unauthorized";

//the keywords to use for pages
$keywords = "";

$navTint = "dark";

//include the header for page
include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php';
?>
	
				<!-- Start Dynamic content for page -->
				<div class="article article--halved">
					<div class="container">
						<div class="article__half">
							<img src="/assets/images/no-entry.png?v=2" alt="No entry sign" class="error__img">
						</div>
						<div class="article--halved">
							<p>The page you are trying to view needs authorization. You either supplied the wrong credentials or your browser doesn't understand how to supply credentials.</p>
						</div>
					</div>
				</div>
				<!-- End dynamic content -->

<?php
//include the footer for page
include $_SERVER['DOCUMENT_ROOT'] . '/partials/footer.php';
?>