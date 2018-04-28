<?php

//title of page to use
$title = "500";

//the description to use for page
$description = "Error: 500 - Internal Server Error message on the portfolio for Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$description2 = "Internal Server Error";

//the keywords to use for page
$keywords = "";

//include the header for page
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';

?>
                <!-- Start Dynamic content for page -->
                <div class="article article--50-50 article--error">
                    <div class="container">
                        <div class="article-50">
                            <img src="/assets/images/oops.png?v=1" alt="Road sign with the words oops">
                        </div>

                        <div class="article-50">
                            <p>The server couldn't follow your request and cannot be displayed.</p>
                            <p>Either refresh the page or try again later.</p>
                            <p>If not it's not you, its me!</p>
                        </div>
                    </div>
                </div>
                <!-- End dynamic content -->

<?php

//include the footer for page
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';

?>