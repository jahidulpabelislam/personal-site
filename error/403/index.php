<?php
//title of page to use
$pageTitle = "403";

$headerTitle = "403";

//the description to use for page
$description = "Error: 403 - Forbidden Page message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$headerDesc = "Forbidden Page";

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
						<div class="article__half">
							<p>The access to the requested page is strictly forbidden.</p>
						</div>
					</div>
				</div>
				<!-- End dynamic content -->

<?php
//include the footer for page
include $_SERVER['DOCUMENT_ROOT'] . '/partials/footer.php';
?>