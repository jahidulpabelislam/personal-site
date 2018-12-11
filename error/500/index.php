<?php
include $_SERVER["DOCUMENT_ROOT"] . "/site.php";

$pageId = $headTitle = $headerTitle = "500";

$headDesc = "Error: 500 - Internal Server Error message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
Site::getHTMLHead($pageId, $headTitle, $headDesc);

$headerDesc = "Internal Server Error";
$navTint = "light";
Site::getHeader($pageId, $headerTitle, $headerDesc, $navTint);
?>

				<div class="article article--halved">
					<div class="container">
						<div class="article__half">
							<img src="/assets/images/oops.png?v=2" alt="Road sign with the words oops" class="error__img">
						</div>

						<div class="article__half">
							<p>The server couldn't follow your request and can not displayed content.</p>
							<p>Either refresh the page or try again later.</p>
							<p>If not it's not you, nor me, its the sysadmin guy (ME!)!</p>
						</div>
					</div>
				</div>

<?php
Site::getFooter();
?>