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
                    <img class="slideShowNav" src="/images/previous.svg" alt="Click to View Previous Image" id="expandedImagePrevious">

                    <div class="expandedImageDiv">
                        <img src="/images/blank.svg" id="expandedImage" class="expandedImage">
                    </div>

                    <div class="expandedImageDiv">
                        <img src="/images/blank.svg" id="expandedImage2" class="expandedImage">
                    </div>

                    <img class="slideShowNav" id="expandedImageNext" src="/images/next.svg" alt="Click to View Next Image">
                    <button id="expandedImageClose" type="button" class="btn btn--red">X</button>

                    <div id="slideShowNums">
                        <p id="slideShowNum"></p>
                        <p>/</p>
                        <p id="slideShowTotal"></p>
                    </div>

                    <div id="slideShowBullets" class="slideShowBullets"></div>
                </div>

                <div id="projectsDetail" class="modal">
                    <div class="modal__content">
                        <div class="projectHeader"><h3 class="article__header projectTitle"></h3><h4 class="projectDate"></h4></div>
                        <div class="skills"></div>
                        <div class="description"></div>
                        <p class="links"></p>
                        <div class="slideShow">
                            <div class="slideShowViewpoint">
                                <div class="slidesContainer"></div>
                                <img class="slideShowNav previous" src="/images/previous.svg" alt="Click to View Previous Image">
                                <img class="slideShowNav next" src="/images/next.svg" alt="Click to View Next Image">
                            </div>
                            <div class="slideShowBullets"></div>
                        </div>
                    </div>
                </div>

<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>