<?php
include $_SERVER["DOCUMENT_ROOT"] . "/site.php";

$headTitle = $headerTitle = "401";

$headDesc = "Error: 401 - Unauthorized message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
Site::echoHTMLHead($headTitle, $headDesc);

$headerDesc = "Unauthorized";
Site::echoHeader($headerTitle, $headerDesc);
?>

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

<?php
Site::echoFooter();
?>