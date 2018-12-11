<?php
include $_SERVER["DOCUMENT_ROOT"] . "/site.php";

$pageId = $headTitle = $headerTitle = "403";

$headDesc = "Error: 403 - Forbidden Page message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
Site::getHeader($pageId, $headerTitle, $headerDesc);

Site::getHTMLHead($pageId, $headTitle, $headDesc);
$headerDesc = "Forbidden Page";
?>

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

<?php
Site::getFooter();
?>