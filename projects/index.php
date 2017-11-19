<?php
$title = "Projects";
$keywords = "";
$description = "Look at the Previous Projects of Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England has done before.";
$description2 = "Look at My Skills in Action in My Previous Projects.";
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>
                <div class="article">
                    <div class="container">

                        <p>These are some of the pieces of work I have completed during my time as a developer.</p>

                        <form class="search-form">
                            <div class="search-input-group">
                                <label for="search" class="screen-reader-text">Search for projects.</label>
                                <input type="text" class="input search-input" placeholder="Search for projects...">
                                <button class="btn btn--blue search-submit" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </form>

                        <p id="errors" class="feedback error"></p>
                        <i id="projectsLoading" class="fa fa-spinner fa-spin fa-3x" style="display:none"></i>
                        <div class="projects"></div>
                        <ul class="pagination pagination--projects"></ul>
                    </div>
                </div>

                <div class="article action">
                    <div class="container">
                        <div>
                            <a class="btn btn--purple" href="/contact/">Get in Touch</a>
                        </div>

                        <div>
                            <a class="btn btn--green" href="/about/">Learn About Me</a>
                        </div>
                    </div>
                </div>

                <div class="expanded-image-slide-show">
                    <img class="slide-show__nav slide-show__nav--blue slide-show__nav-previous" src="/images/previous.svg" alt="Click to View Previous Image" id="expandedImagePrevious">

                    <div class="expanded-image-container">
                        <img src="/images/blank.svg" class="expanded-image current">
                    </div>

                    <div class="expanded-image-container">
                        <img src="/images/blank.svg" class="expanded-image">
                    </div>

                    <img class="slide-show__nav slide-show__nav--blue slide-show__nav-next" id="expandedImageNext" src="/images/next.svg" alt="Click to View Next Image">
                    <button id="" type="button" class="btn btn--red expanded-image-slide-show__close">X</button>

                    <p class="slideShowNums">
                        <span id="slideShowNum"></span>
                        <span>/</span>
                        <span id="slideShowTotal"></span>
                    </p>

                    <div id="slideShowBullets" class="slideShowBullets"></div>
                </div>

                <div id="projectsDetail" class="modal">
                    <div class="modal__content">
                        <div class="project-header project-header--modal"><h3 class="article__header projectTitle"></h3><h4 class="projectDate"></h4></div>
                        <div class="skills"></div>
                        <div class="description"></div>
                        <p class="project__links"></p>
                        <div class="slide-show" id="projectsDetailSlideShow">
                            <div class="slide-show__viewpoint" data-slide-show-id="projectsDetailSlideShow">
                                <div class="slide-show__slides-container"></div>
                                <img class="slide-show__nav slide-show__nav--blue slide-show__nav-previous moveSlide" src="/images/previous.svg" alt="Click to View Previous Image" data-slide-show-id="projectsDetailSlideShow" data-nav-direction="previous">
                                <img class="slide-show__nav slide-show__nav--blue slide-show__nav-next moveSlide" src="/images/next.svg" alt="Click to View Next Image" data-slide-show-id="projectsDetailSlideShow" data-nav-direction="next">
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
                        <div class="slide-show" id="slide-show{{ID}}">
                            <div class="slide-show__viewpoint" data-slide-show-id="slide-show{{ID}}">
                                <div class="slide-show__slides-container"></div>
                                <img class="slide-show__nav slide-show__nav--{{Colour}} slide-show__nav-previous moveSlide" src="/images/previous.svg" alt="Click to View Previous Image" data-slide-show-id="slide-show{{ID}}" data-nav-direction="previous">
                                <img class="slide-show__nav slide-show__nav--{{Colour}} slide-show__nav-next moveSlide" src="/images/next.svg" alt="Click to View Next Image" data-slide-show-id="slide-show{{ID}}" data-nav-direction="next">
                            </div>
                            <div class="slideShowBullets"></div>
                        </div>
                    </div>
                </script>

                <script type="text/template" id="tmpl-slide-template">
                    <div class="slide-show__slide-container" id="slide{{ID}}">
                        <img src="{{File}}" class="slide js-expandable-image" alt="Screen shot of project" data-slide-show-id="slide-show{{ProjectID}}" data-slide-colour="{{Colour}}">
                    </div>
                </script>

                <script type="text/template" id="tmpl-slide-bullet-template">
                    <label class="slide-show__bullet slide-show__bullet--{{Colour}} js-slide-show-bullet" data-slide-show-id="slide-show{{ProjectID}}" data-slide-id="slide{{ID}}"></label>
                </script>

<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>