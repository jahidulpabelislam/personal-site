<?php
$title = "Home";
$keywords = "";
$description = "e-Portfolio for Jahidul Pabel Islam, a Software Developer in Bognor Regis, West Sussex Down in the South Coast of England.";
$description2 = "Jahidul Pabel Islam, a Software Developer.";
include 'inc/header.php';
?>
                <div class="article">
                    <h2 id="mainHello">Hello</h2>
                    <p id="afterMainHello">there everyone, welcome to my e-Portfolio. Thanks for clicking on my website.</p>
                    <p>I'm a Software Developer, Develop from Websites to Programs, learning my trade at University of Portsmouth,
                        Based in West Sussex down in the South Coast of England.</p>
                    <p>Here you will be able to look at all my <a href="/projects">work</a> I have done over the last couple of
                        years, <a href="/about">learn about me</a> also you will be able to <a href="/contact/">contact</a> me for
                        any enquires, to provide any feedback and follow my future work.</p>
                    <p>So have a look around my ever evolving e-Portfolio.</p>
                </div>

                <div id="projectPreview" class="article">
                    <h3>My Latest Projects</h3>
                    <div class="slideShow">
                        <div class="slideShowViewpointContainer">
                            <div class="slideShowViewpoint">
                                <div class="slidesContainer"></div>
                            </div>
                        </div>
                        <img class="slideShowNav previous" src="/images/previous.svg" alt="Click to View Previous Image">
                        <img class="slideShowNav next" src="/images/next.svg" alt="Click to View Next Image">
                    </div>
                    <div id="errors"></div>
                </div>

                <div class="article action">
                    <div><a class="btn btn-primary" href="/projects/">View My Work</a></div>
                    <div><a class="btn btn-success" href="/about/">Learn About Me</a></div>
                </div>

                <script type="text/javascript" src="/lib/slideShow.js"></script>
                <script type="text/javascript" src="/lib/helperFunctions.js"></script>
                <script type="text/javascript" src="/lib/xhr.js"></script>
                <script type="text/javascript" src="/lib/projectsPreview.js"></script>

<?php
include 'inc/footer.html';
?>