<?php

//title of page to use
$page_title = "403";

$header_title = "403";

//the description to use for page
$description = "Error: 403 - Forbidden Page message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$header_description = "Forbidden Page";

//the keywords to use for pages
$keywords = "";

//include the header for page
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';

?>
                <!-- Start Dynamic content for page -->
                <div class="article article--error">
                    <div class="container">
                        <div class="article-50">
                            <img src="/assets/images/no-entry.png?v=1" alt="No entry sign">
                        </div>
                        <div class="article--50-50">
                            <p>The access to the requested page is strictly forbidden.</p>
                        </div>
                    </div>
                </div>
                <!-- End dynamic content -->

<?php

//include the footer for page
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';

?>