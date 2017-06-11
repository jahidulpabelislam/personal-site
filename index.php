<?php
$title = "Home";
$keywords = "";
$description = "e-Portfolio for Jahidul Pabel Islam, a Software Developer in Bognor Regis, West Sussex Down in the South Coast of England.";
$description2 = "Jahidul Pabel Islam, a Web &amp; Software Developer.";
include 'inc/header.php';
?>
                <div class="article wow fadeInLeft" data-wow-delay="0.6s">
                    <div class="container">
                        <h2 id="mainHello">Hello</h2>
                        <p id="afterMainHello">there everyone, welcome to my portfolio, thanks for clicking on my website.</p>
                        <p>I'm a developer, based in West Sussex down in the South Coast of England, learning my trade at  <a href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank">University
                                of Portsmouth</a>,
                            I develop websites to programs.</p>
                        <p>Here you will be able to look at all my <a href="/projects">work</a> I have done over the last couple of
                            years, <a href="/about">learn about me</a>, and <a href="/contact/">contact me</a>
                            for
                            any enquiries or to provide any feedback.</p>
                        <p>So, have a look around my ever evolving portfolio.</p>
                    </div>
                </div>

                <div id="projectPreview" class="article wow fadeInRight hasSlideShow" data-wow-delay="0.8s">
                    <h3>My Latest Projects</h3>
                    <i id="projectsLoading" class="fa fa-spinner fa-spin fa-3x" style="display:none"></i>
                    <div class="slideShow">
                        <div class="slideShowViewpoint">
                            <div class="slidesContainer"></div>
                            <img class="slideShowNav previous" src="/images/previous.svg" alt="Click to View Previous Image">
                            <img class="slideShowNav next" src="/images/next.svg" alt="Click to View Next Image">
                        </div>
                        <div class="slideShowBullets"></div>
                    </div>
                    <p id="errors" class="feedback error"></p>
                </div>

                <div class="article action">
                    <div class="container">
                        <div class="wow fadeInLeft" data-wow-delay="0.4s"><a class="btn btn-primary" href="/projects/">View My
                                Work</a></div>
                        <div class="wow fadeInRight" data-wow-delay="0.4s"><a class="btn btn-success" href="/about/">Learn About
                                Me</a></div>
                    </div>
                </div>

                <script type="text/javascript" src="/lib/js/slideShow.js"></script>
                <script type="text/javascript" src="/lib/js/helperFunctions.js"></script>
                <script type="text/javascript" src="/lib/js/xhr.js"></script>
                <script type="text/javascript" src="/lib/js/projectsPreview.js"></script>
                <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

<?php
include 'inc/footer.html';
?>