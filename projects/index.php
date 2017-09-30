<?php
$title = "Projects";
$keywords = "";
$description = "Look at the Previous Projects of Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England has done before.";
$description2 = "Look at My Skills in Action in My Previous Projects.";
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>
                <div class="article">
                    <div class="container">

                        <p class="wow fadeInUp" data-wow-delay="0.6s">These are some of the pieces of work I have completed duringmy time as a developer.</p>

                        <form id="search" class="wow fadeInDown" data-wow-delay="0.8s">
                            <div class="input-group">
                                <label id="searchLabel" for="search">Search for projects.</label>
                                <input type="text" class="form-control" placeholder="Search for projects..." id="searchInput">
                                <div class="input-group-btn">
                                    <button class="btn btn-primary" type="submit" id="searchSubmit">
                                        <i class="glyphicon glyphicon-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <p id="errors" class="feedback error"></p>
                        <i id="projectsLoading" class="fa fa-spinner fa-spin fa-3x" style="display:none"></i>
                        <div id="projects"></div>
                        <div id="pagination"></div>
                    </div>
                </div>

                <div class="article action">
                    <div class="container">
                        <div class="wow fadeInLeft" data-wow-delay="0.4s">
                            <a class="btn btn-info" href="/contact/">Get in Touch</a>
                        </div>

                        <div class="wow fadeInRight" data-wow-delay="0.4s">
                            <a class="btn btn-success" href="/about/">Learn About Me</a>
                        </div>
                    </div>
                </div>

                <div id="expandedImageDivContainer">
                    <img class="slideShowNav" src="/images/previous.svg"
                         alt="Click to View Previous Image" id="expandedImagePrevious">

                    <div class="expandedImageDiv">
                        <img src="/images/blank.svg" id="expandedImage" class="expandedImage">
                    </div>

                    <div class="expandedImageDiv">
                        <img src="/images/blank.svg" id="expandedImage2" class="expandedImage">
                    </div>

                    <img class="slideShowNav" id="expandedImageNext" src="/images/next.svg" alt="Click to View Next Image">
                    <button id="expandedImageClose" type="button" class="btn btn-danger">X</button>

                    <div id="slideShowNums">
                        <p id="slideShowNum"></p>
                        <p>/</p>
                        <p id="slideShowTotal"></p>
                    </div>

                    <div id="slideShowBullets" class="slideShowBullets"></div>
                </div>

                <div id="projectsDetail" class="modal" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button id="modalClose" type="button" class="close" data-dismiss="modal">&times;</button>
                                <div class="modal-title projectHeader"><h3 class="projectTitle"></h3><h4 class="projectDate"></h4></div>
                            </div>
                            <div class="modal-body">
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

                    </div>
                </div>

<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>