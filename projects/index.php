<?php
$title = "Projects";
$keywords = "";
$description = "Look at the Previous Projects of Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England has done before.";
$description2 = "Look at My Skills in Action in My Previous Projects.";
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>
                <div class="article">
                    <div class="container">

                        <p class="wow fadeInUp" data-wow-delay="0.6s">These are some of the pieces of work I have completed during my time as a developer.</p>

                        <form class="search wow fadeInDown" data-wow-delay="0.8s">
                            <div class="search-input-group">
                                <label for="search" class="screen-reader-text">Search for projects.</label>
                                <input type="text" class="input" placeholder="Search for projects..." id="searchInput">
                                <button class="btn btn--blue" type="submit" id="searchSubmit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </form>

                        <p id="errors" class="feedback error"></p>
                        <i id="projectsLoading" class="fa fa-spinner fa-spin fa-3x" style="display:none"></i>
                        <div id="projects"></div>
                        <ul class="pagination pagination--projects"></ul>
                    </div>
                </div>

                <div class="article action">
                    <div class="container">
                        <div class="wow fadeInLeft" data-wow-delay="0.4s">
                            <a class="btn btn--purple" href="/contact/">Get in Touch</a>
                        </div>

                        <div class="wow fadeInRight" data-wow-delay="0.4s">
                            <a class="btn btn--green" href="/about/">Learn About Me</a>
                        </div>
                    </div>
                </div>

                <div id="expandedImageDivContainer">
                    <img class="slideShowNav slideShowNav--blue previous" src="/images/previous.svg" alt="Click to View Previous Image" id="expandedImagePrevious">

                    <div class="expandedImageDiv">
                        <img src="/images/blank.svg" id="expandedImage" class="expandedImage">
                    </div>

                    <div class="expandedImageDiv">
                        <img src="/images/blank.svg" id="expandedImage2" class="expandedImage">
                    </div>

                    <img class="slideShowNav slideShowNav--blue next" id="expandedImageNext" src="/images/next.svg" alt="Click to View Next Image">
                    <button id="expandedImageClose" type="button" class="btn btn--red">X</button>

                    <p id="slideShowNums">
                        <span id="slideShowNum"></span>
                        <span>/</span>
                        <span id="slideShowTotal"></span>
                    </p>

                    <div id="slideShowBullets" class="slideShowBullets"></div>
                </div>

                <div id="projectsDetail" class="modal">
                    <div class="modal__content">
                        <div class="projectHeader projectHeader--modal"><h3 class="article__header projectTitle"></h3><h4 class="projectDate"></h4></div>
                        <div class="skills"></div>
                        <div class="description"></div>
                        <p class="project__links"></p>
                        <div class="slideShow" id="projectsDetailSlideShow">
                            <div class="slideShowViewpoint" data-slide-show-id="projectsDetailSlideShow">
                                <div class="slidesContainer"></div>
                                <img class="slideShowNav slideShowNav--blue previous moveSlide" src="/images/previous.svg" alt="Click to View Previous Image" data-slide-show-id="projectsDetailSlideShow" data-nav-direction="previous">
                                <img class="slideShowNav slideShowNav--blue next moveSlide" src="/images/next.svg" alt="Click to View Next Image" data-slide-show-id="projectsDetailSlideShow" data-nav-direction="next">
                            </div>
                            <div class="slideShowBullets"></div>
                        </div>
                    </div>
                </div>

                <script type="text/template" id="tmpl-project-template">
                    <div id="project{{ID}}" class="project">
                        <h3 class="article__header projectTitle">{{Name}}</h3>
                        <h4 class="projectDate">{{Date}}</h4>
                        <div class="skills"></div>
                        <div class="description">{{ShortDescription}}</div>
                        <button class="btn btn--{{Colour}} viewMoreButton">Read More »</button>
                        <p class="project__links"></p>
                        <div class="slideShow" id="slideShow{{ID}}">
                            <div class="slideShowViewpoint" data-slide-show-id="slideShow{{ID}}">
                                <div class="slidesContainer"></div>
                                <img class="slideShowNav slideShowNav--{{Colour}} previous moveSlide" src="/images/previous.svg" alt="Click to View Previous Image" data-slide-show-id="slideShow{{ID}}" data-nav-direction="previous">
                                <img class="slideShowNav slideShowNav--{{Colour}} next moveSlide" src="/images/next.svg" alt="Click to View Next Image" data-slide-show-id="slideShow{{ID}}" data-nav-direction="next">
                            </div>
                            <div class="slideShowBullets"></div>
                        </div>
                    </div>
                </script>

                <script type="text/template" id="tmpl-slide-template">
                    <div class="slideContainer" id="slide{{ID}}">
                        <img src="{{File}}" class="slide js-expandable-image" alt="Screen shot of project" data-slide-show-id="slideShow{{ProjectID}}" data-slide-colour="{{Colour}}">
                    </div>
                </script>

                <script type="text/template" id="tmpl-slide-bullet-template">
                    <label class="bullet bullet--{{Colour}} js-slide-show-bullet" data-slide-show-id="slideShow{{ProjectID}}" data-slide-id="slide{{ID}}"></label>
                </script>

<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>