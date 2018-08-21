<?php
$page_title = "Home";
$header_title = "Jahidul Pabel Islam";
$keywords = "";
$description = "Portfolio for Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down in the South Coast of England.";
$header_description = "Full Stack Web &amp; Software Developer";

$nav_tint = "dark";

include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>
                <div class="article home__hello">
                    <div class="container">
                        <p><span class="main-hello">Hello</span> there everyone!</p>
                        <img src="/assets/images/JahidulPabelIslamSmart.jpg?v=1" class="home-hello__img" alt="Jahidul Pabel Islam">
                        <img src="/assets/images/logo-inverted.png?v=1" class="home-hello__img home-hello__logo" alt="Jahidul Pabel Islam's Logo">
                    </div>
                </div>

                <div class="article home__intro">
                    <div class="container">
                        <p>Welcome to my portfolio, thanks for clicking on my website!</p>
                    </div>
                </div>

                <div class="article">
                    <div class="container">
                        <p>My drive and passion lives in developing various types of software anything from websites to apps.</p>
                        <p>Always looking into new languages and frameworks that are upcoming to learn how ongoing projects can do things better while also to expand my knowledge.</p>
                        <p>Currently working as a Junior Web Developer at <a class="link" href="https://www.brightminded.com" title="Link to BrightMinded website." target="_blank">BrightMinded</a> after completing a degree at the <a class="link" href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank">University of Portsmouth</a>.</p>
                        <p>Reside in  <a class="link" href="https://goo.gl/maps/KEJgpYCxm6x" title="Link to Map of Bognor Regis." target="_blank">West Sussex</a>, down in the South Coast of England.</p>
                    </div>
                </div>

                <div class="article">
                    <div class="container">
                        <p>Here you will be able to look at all the <a class="link" href="/projects">work</a> I have done over the last 6 years, <a class="link" href="/about">learn about me</a>, and <a class="link" href="/contact/">contact me</a> for any enquiries or to provide any feedback.</p>
                        <p>So, have a look at my ever-evolving portfolio, as i'm always looking to find different ways to improve my site by experimenting with new technologies and ideas here.</p>
                    </div>
                </div>

                <div class="article article--orange clearfix">
                    <div class="container">
                        <div class="workflow">
                            <div class="workflow__item ">
                                <h3 class="article__header">Design > Code</h3>
                                <img src="/assets/images/design-icon.png?v=1" class="workflow-item__image">
                                <div class="workflow-item__description">
                                    <p>My work starts after receiving finished designs on PSD's or Flat Image Files.</p>
                                    <p>At this stage I begin turning designs into pixel perfect sites/apps.</p>
                                </div>
                            </div>
                            <div class="workflow__item">
                                <h3 class="article__header">Code</h3>
                                <img src="/assets/images/code-icon.png?v=1" class="workflow-item__image">
                                <div class="workflow-item__description">
                                    <p>I tend to build systems fully bespoke, but if the requirements require I will use various frameworks and libraries to fulfill the required system (But try to keep that to a minimum).</p>
                                </div>
                            </div>
                            <div class="workflow__item">
                                <h3 class="article__header">Responsive Design</h3>
                                <img src="/assets/images/responsive-icon.png?v=1"  class="workflow-item__image">
                                <div class="workflow-item__description">
                                    <p>Any site or application I build I will always built the system to be usable on many different sized devices.</p>
                                    <p>I always approach styling in a mobile first approach.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="article projects">
                    <h3 class="article__header">My Latest Projects</h3>

                    <div><i class="projects__loading-img fa fa-spinner fa-spin fa-3x"></i></div>

                    <div id="slide-show--home" class="slide-show">
                        <div class="slide-show__viewpoint" data-slide-show-id="#slide-show--home">
                            <div class="slide-show__slides-container"></div>
                            <img class="slide-show__nav slide-show__nav-- slide-show__nav-previous js-move-slide" src="/assets/images/previous.svg?v=1" alt="Click to View Previous Image" data-slide-show-id="#slide-show--home" data-nav-direction="previous">
                            <img class="slide-show__nav slide-show__nav-- slide-show__nav-next js-move-slide" src="/assets/images/next.svg?v=1" alt="Click to View Next Image" data-slide-show-id="#slide-show--home" data-nav-direction="next">
                        </div>
                        <div class="js-slide-show-bullets"></div>
                    </div>
                    <p class="feedback feedback--error"></p>

                    <a class="btn" href="/projects/">View All My Work</a>
                </div>

                <div class="article article--green">
                    <div class="container">
                        <div class="stats">
                            <div class="stats__item">
                                <h3 class="article__header article__header--stats counter" data-to="22" data-speed="2000">0</h3>
                                <p class="stats__text">Personal Projects (+ <span class="counter" data-to="22" data-speed="2000">0</span> work projects)</p>
                            </div>
                            <div class="stats__item">
                                <h3 class="article__header article__header--stats counter" data-to="1249" data-speed="2000">0</h3>
                                <p class="stats__text">Commits</p>
                            </div>
                            <div class="stats__item">
                                <h3 class="article__header article__header--stats counter" data-to="8" data-speed="2000">0</h3>
                                <p class="stats__text">Years experience</p>
                            </div>
                            <div class="stats__item">
                                <h3 class="article__header article__header--stats js-seconds-on-site">0</h3>
                                <p class="stats__text">Seconds on here</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half"><a class="btn btn--lime-green" href="/about/">Learn About Me</a></div>
                        <div class="article__half"><a class="btn btn--purple" href="/projects/">View My Work</a></div>
                    </div>
                </div>

                <script type="text/template" id="tmpl-slide-template">
                    <div class="slide-show__slide" id="slide-{{ID}}" data-slide-colour="{{Colour}}">
                        <img class="slide-show__img" src="{{File}}" alt="Screen shot of {{Name}} Project">
                        <div class="slide-show__info-container">
                            <div class="slide-show__info slide-show__info--{{Colour}}">
                                <div class="project__header">
                                    <h3 class="project__title project__title--inline">{{Name}}</h3>
                                    <h4 class="project__date project__date--inline">{{Date}}</h4>
                                </div>
                                <div class="project-info__desc">{{ShortDescription}}</div>
                                <div class="project-info__links"></div>
                            </div>
                        </div>
                    </div>
                </script>

                <script type="text/template" id="tmpl-slide-bullet-template">
                    <label class="slide-show__bullet js-slide-show-bullet slide-show__bullet--{{Colour}}" data-slide-show-id="#slide-show--home" data-slide-id="slide-{{ID}}"></label>
                </script>


<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          