<?php
$title = "Home";
$keywords = "";
$description = "e-Portfolio for Jahidul Pabel Islam, a Software Developer in Bognor Regis, West Sussex Down in the South Coast of England.";
$description2 = "Jahidul Pabel Islam, a Web &amp; Software Developer.";
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>
                <div class="article">
                    <div class="container">
                        <img src="/assets/images/JahidulPabelIslam.jpg" class="image-of-me image-of-me--home" alt="Jahidul Pabel Islam">
                        <p><span class="main-hello">Hello</span> there everyone, welcome to my portfolio, thanks for clicking on my website.</p>
                    </div>
                </div>

                <div class="article">
                    <div class="container">
                        <p>I am a developer that develops in various types of software anything from websites to apps.</p>
                        <p>I currently working as a Junior Web Developer at <a class="link" href="https://www.brightminded.com" title="Link to BrightMinded website." target="_blank">BrightMinded</a> after completing a degree at the <a class="link" href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank">University of Portsmouth</a>.</p>
                        <p>I reside in  <a class="link" href="https://goo.gl/maps/KEJgpYCxm6x" title="Link to Map of Bognor Regis." target="_blank">West Sussex</a>, down in the South Coast of England.</p>
                        <p>Here you will be able to look at all the <a class="link" href="/projects">work</a> I have done over the last couple of years, <a class="link" href="/about">learn about me</a>, and <a class="link" href="/contact/">contact me</a> for any enquiries or to provide any feedback.</p>
                        <p>So, have a look at my ever-evolving portfolio.</p>
                    </div>
                </div>

                <div class="article">
                    <div class="container">
                        <h3 class="article__header">My Services</h3>
                    </div>
                </div>

                <div class="article">
                    <h3 class="article__header">My Latest Projects</h3>
                    <i class="projects-loading-img fa fa-spinner fa-spin fa-3x" style="display:none"></i>
                    <div id="slide-show--projects-preview" class="slide-show">
                        <div class="slide-show__viewpoint" data-slide-show-id="#slide-show--projects-preview">
                            <div class="slide-show__slides-container"></div>
                            <img class="slide-show__nav slide-show__nav-- slide-show__nav-previous js-move-slide" src="/assets/images/previous.svg" alt="Click to View Previous Image" data-slide-show-id="#slide-show--projects-preview" data-nav-direction="previous">
                            <img class="slide-show__nav slide-show__nav-- slide-show__nav-next js-move-slide" src="/assets/images/next.svg" alt="Click to View Next Image" data-slide-show-id="#slide-show--projects-preview" data-nav-direction="next">
                        </div>
                        <div class="js-slide-show-bullets"></div>
                    </div>
                    <p class="feedback feedback--error"></p>

                    <a class="btn btn--blue" href="/projects/">View All My Work</a>
                </div>

                <div class="article">
                    <div class="container">
                        <h3 class="article__header">What I've Been Up To</h3>
                    </div>
                </div>

                <div class="article">
                    <div class="container">
                        <h3 class="article__header">Instagram</h3>
                    </div>
                </div>

                <div class="article article--50-50">
                    <div class="container">
                        <div class="article-50"><a class="btn btn--blue" href="/projects/">View My Work</a></div>
                        <div class="article-50"><a class="btn btn--lime-green" href="/about/">Learn About Me</a></div>
                    </div>
                </div>

                <script type="text/template" id="tmpl-slide-template">
                    <div class="slide-show__slide-container" id="slide--{{ID}}" data-slide-colour="{{Colour}}">
                        <div class="slide-show__project-description-container">
                            <div class="slide-show__project-description slide-show__project-description--{{Colour}}">
                                <div class="project__header">
                                    <h3 class="article__header project-title project-title--inline">{{Name}}</h3>
                                    <h4 class="project-date project-date--inline">{{Date}}</h4>
                                </div>
                                <div class="project-description__text">{{ShortDescription}}</div>
                                <div class="project-description__links"></div>
                            </div>
                        </div>
                        <img class="slide" src="{{File}}" alt="Screen shot of Project">
                    </div>
                </script>

                <script type="text/template" id="tmpl-slide-bullet-template">
                    <label class="slide-show__bullet js-slide-show-bullet slide-show__bullet--{{Colour}}" data-slide-show-id="#slide-show--projects-preview" data-slide-id="slide--{{ID}}"></label>
                </script>


<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>