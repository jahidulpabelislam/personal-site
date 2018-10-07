<?php
//title of page to use
$pageTitle = "500";

$headerTitle = "500";

//the description to use for page
$description = "Error: 500 - Internal Server Error message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$headerDesc = "Internal Server Error";

//the keywords to use for page
$keywords = "";

$navTint = "light";

//include the header for page
include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php';
?>
				<!-- Start Dynamic content for page -->
				<div class="article article--halved">
					<div class="container">
						<div class="article__half">
							<img src="/assets/images/oops.png?v=1" alt="Road sign with the words oops" class="error__img">
						</div>

						<div class="article__half">
							<p>The server couldn't follow your request and can not displayed content.</p>
							<p>Either refresh the page or try again later.</p>
							<p>If not it's not you, nor me, its the sysadmin guy (ME!)!</p>
						</div>
					</div>
				</div>
				<!-- End dynamic content -->

<?php
//include the footer for page
include $_SERVER['DOCUMENT_ROOT'] . '/partials/footer.php';
?>