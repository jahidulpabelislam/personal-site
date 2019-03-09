<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");

$site = Site::get();

$headTitle = $headerTitle = "403";

$headDesc = "Error: 403 - Forbidden Page message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$site->echoHTMLHead($headTitle, $headDesc);

$headerDesc = "Forbidden Page";
$site->echoHeader($headerTitle, $headerDesc);
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img src="<?php $site->echoWithAssetVersion("/assets/images/no-entry.png"); ?>" alt="No entry sign" class="error__img">
                        </div>
                        <div class="article__half">
                            <p>The access to the requested page is strictly forbidden.</p>
                        </div>
                    </div>
                </div>

<?php
$similarLinks = [
    [
        "title" => "Projects",
        "url" => "projects",
        "text" => "View My Work",
        "colour" => "purple",
    ], [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
        "colour" => "blue",
    ],
];
$site->echoFooter($similarLinks);
