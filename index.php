<?php
$title = "Home";
$keywords = "";
$description = "e-Portfolio for Jahidul Pabel Islam, a Software Developer in Bognor Regis, West Sussex Down in the South Coast of England.";
$description2 = "Jahidul Pabel Islam, a Web &amp; Software Developer.";
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>
                <div class="article">
                    <div class="container">
                        <p><span id="mainHello">Hello</span> there everyone, welcome to my portfolio, thanks for clicking on my website.</p>
                        <p>I'm a developer who develops anything from websites to apps.</p>
                        <p>Based in West Sussex down in the South Coast of England, currently working as a Junior Web Developer at <a class="link" href="http://www.brightminded.com" title="Link to BrightMinded website." target="_blank">BrightMinded</a> after completing a degree at  <a class="link" href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank">University of Portsmouth</a>.</p>
                        <p>Here you will be able to look at all my <a class="link" href="/projects">work</a> I have done over the last couple of years, <a class="link" href="/about">learn about me</a>, and <a class="link" href="/contact/">contact me</a> for any enquiries or to provide any feedback.</p>
                        <p>So, have a look around my ever evolving portfolio.</p>
                    </div>
                </div>

                <div class="article">
                    <h3 class="article__header">My Latest Projects</h3>
                    <i id="projectsLoading" class="fa fa-spinner fa-spin fa-3x" style="display:none"></i>
                    <div class="slideShow" id="projectPreview">
                        <div class="slideShowViewpoint" data-slide-show-id="projectPreview">
                            <div class="slidesContainer"></div>
                            <img class="slideShowNav slideShowNav-- previous moveSlide" src="/images/previous.svg" alt="Click to View Previous Image" data-slide-show-id="projectPreview" data-nav-direction="previous">
                            <img class="slideShowNav slideShowNav-- next moveSlide" src="/images/next.svg" alt="Click to View Next Image" data-slide-show-id="projectPreview" data-nav-direction="next">
                        </div>
                        <div class="slideShowBullets"></div>
                    </div>
                    <p id="errors" class="feedback error"></p>
                </div>

                <div class="article action">
                    <div class="container">
                        <div><a class="btn btn--blue" href="/projects/">View My Work</a></div>
                        <div><a class="btn btn--lime-green" href="/about/">Learn About Me</a></div>
                    </div>
                </div>

                <script type="text/template" id="tmpl-slide-template">
                    <div class="slideContainer" id="slide{{ID}}" data-slide-colour="{{Colour}}">
                        <div class="projectDescriptionContainer">
                            <div class="projectDescription projectDescription--{{Colour}}">
                                <div class="projectHeader">
                                    <h3 class="article__header projectTitle">{{Name}}</h3>
                                    <h4 class="projectDate">{{Date}}</h4>
                                </div>
                                <div class="projectDescriptionText">{{ShortDescription}}</div>
                                <div class="projectLinks"></div>
                            </div>
                        </div>
                        <img class="slide" src="{{File}}" alt="Screen shot of Project">
                    </div>
                </script>

                <script type="text/template" id="tmpl-slide-bullet-template">
                    <label class="bullet js-slide-show-bullet bullet--{{Colour}}" data-slide-show-id="projectPreview" data-slide-id="slide{{ID}}"></label>
                </script>


<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>