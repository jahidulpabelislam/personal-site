<?php

//title of page to use
$title = "401";

//the description to use for page
$description = "Error: 401 - Unauthorized message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$description2 = "Unauthorized";

//the keywords to use for pages
$keywords = "";

//include the header for page
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';

?>

                <!-- Start Dynamic content for page -->
                <div class="article article--50-50 article--error">
                    <div class="container">
                        <div class="article-50">
                            <img src="/assets/images/no-entry.png?v=1" alt="No entry sign">
                        </div>
                        <div class="article--50-50">
                            <p>The page you are trying to view needs authorization. You either supplied the wrong credentials or your browser doesn't understand how to supply credentials.</p>
                        </div>
                    </div>
                </div>
                <!-- End dynamic content -->

<?php

//include the footer for page
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';

?>