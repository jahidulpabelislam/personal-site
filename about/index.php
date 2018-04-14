<?php
$page_title = "About";
$header_title = "About Me";
$keywords = "";
$description = "Some Information About Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$header_description = "Find Out About Me";

$nav_tint = "light";

$tech_skills = array(
    array("text" => "HTML", "desc" => "HTML5 & HTML4"),
    array("text" => "CSS", "desc" => "CSS3, SCSS, Bootstrap3/4"),
    array("text" => "JavaScript", "desc" => "Node.js (socket.io & Express), JQuery, AngularJS"),
    array("text" => "PHP", "desc" => "Wordpress, Laravel, PDO"),
    array("text" => "SQL", "desc" => "MySQL"),
    array("text" => "NoSQL", "desc" => "Amazon DynamoDB"),
    array("text" => "Java", "desc" => "Java EE, 7JSF 2, AWT, Swing"),
    array("text" => "Python", "desc" => "graphics.py"),
    array("text" => "Visual Basic"),
    array("text" => "DVCS", "desc" => "Git (GitHub) for personal projects & Mercurial (Bitbucket) for projects within work"),
    array("text" => "Microsoft Office", "desc" => "I have used Excel to create and use College/Uni grading systems and financial record system, Word, Powerpoint (Also recently move some work to Google Sheets, Docs & Slides)")
);

$other_skills = array(
    array("text" => "Team Player", "desc" => "Being a good team player has been installed in me after playing with competitive Football teams"),
    array("text" => "Communication", "desc" => "Having experience in customer focused environments has taught me to have good communication skills both written and spoken"),
    array("text" => "Hard Worker")
);

$interests = array(
    array("text" => "Sports"),
    array("text" => "Music"),
    array("text" => "Photography"),
    array("text" => "Fashion"),
    array("text" => "Programming"),
    array("text" => "Gaming"),
    array("text" => "Trading")
);

include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>

                <div class="article article--50-50 article--about">
                    <div class="container">
                        <div class="article-50">
                            <img src="/assets/images/JahidulPabelIslamCasual.jpg" class="image-of-me" alt="Jahidul Pabel Islam">
                        </div>
                        <div class="article-50">
                            <p>My name is Jahidul Pabel Islam.</p>
                            <p>I'm 22 years old.</p>
                            <p>A Full Stack Web and Software Developer.</p>
                        </div>
                    </div>
                </div>

                <div class="article article--50-50 article--about">
                    <div class="container">
                        <div class="article-50">
                            <a href="https://www.brightminded.com" title="Link to BrightMinded website." target="_blank"><img src="/assets/images/BrightMinded.png" alt="Logo of BrightMinded"></a>
                        </div>
                        <div class="article-50">
                            <p>Recently joined <a class="link--lime-green" href="https://www.brightminded.com" title="Link to BrightMinded website." target="_blank">BrightMinded</a> as a Junior Web Developer in June 2017.</p>
                        </div>
                    </div>
                </div>

                <div class="article article--50-50 article--about">
                    <div class="container">
                        <div class="article-50">
                            <a href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank"><img src="/assets/images/UoP.png" alt="Logo of University of Portsmouth"></a>
                        </div>
                        <div class="article-50">
                            <p>Graduated from <a class="link--purple" href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank">University of Portsmouth</a> with First Class Honours in BSc (Hons) Web Technologies in July 2017.</p>
                        </div>
                    </div>
                </div>

                <div class="article article--50-50 article--about">
                    <div class="container">
                        <div class="article-50">
                            <a href="https://goo.gl/maps/KEJgpYCxm6x" title="Link to Map of Bognor Regis." target="_blank"><img src="/assets/images/beach.jpg" alt="Image of a Beach"></a>
                        </div>
                        <div class="article-50">
                            <p>Based in <a class="link--red" href="https://goo.gl/maps/KEJgpYCxm6x" title="Link to Map of Bognor Regis." target="_blank">Bognor Regis</a>, <a class="link--red" href="https://goo.gl/maps/EopyB2gtqXF2" title="Link to Map of West Sussex." target="_blank">West Sussex</a>, South East Coast of England.</p>
                        </div>
                    </div>
                </div>

                <div class="article article--map">
                    <div class="map" id="map"></div>
                </div>

                <div class="article article--50-50 article--about">
                    <div class="container">
                        <div class="article-50">
                            <img src="/assets/images/languages.png" alt="Image of 'hello' in different languages">
                        </div>
                        <div class="article-50">
                            <p>I am Bilingual, I can speak English &amp; Bengali.</p>
                        </div>
                    </div>
                </div>

                <div class="article article--about">
                    <div class="container">
                        <h3 class="article__header">Technical Skills</h3>

                        <ul class="about__skills">
                            <?php
                            foreach ($tech_skills as $skill)
                            {
                                $skill_text = $skill["text"];
                                $skill_desc = (isset($skill["desc"])) ? $skill["desc"] : false;

                                $expand_class = ($skill_desc) ? "js-expand-label" : "";

                                echo '<li class="label label--blue ' . $expand_class .'">';
                                echo $skill_text;

                                if ($skill_desc)
                                    echo ' <span class="fa fa-plus label__expand-icon"></span><div class="label__more_content">' . $skill_desc . '</div>';
                                echo '</li>';
                            }
                            ?>
                        </ul>
                    </div>
                </div>

                <div class="article article--about">
                    <div class="container">
                        <h3 class="article__header">Other Skills</h3>

                        <ul class="about__skills">
                            <?php
                            foreach ($other_skills as $skill)
                            {
                                $skill_text = $skill["text"];
                                $skill_desc = (isset($skill["desc"])) ? $skill["desc"] : false;

                                $expand_class = ($skill_desc) ? "js-expand-label" : "";

                                echo '<li class="label label--purple ' . $expand_class .'">';
                                echo $skill_text;

                                if ($skill_desc)
                                    echo ' <span class="fa fa-plus label__expand-icon"></span><div class="label__more_content">' . $skill_desc . '</div>';
                                echo '</li>';
                            }
                            ?>
                        </ul>
                    </div>
                </div>

                <div class="article article--about">
                    <div class="container">
                        <h3 class="article__header">Interests</h3>

                        <ul class="about__interests">

                            <?php
                            foreach ($interests as $interest)
                            {
                                $interest_text = $interest["text"];
                                $interest_desc = (isset($interest["desc"])) ? $interest["desc"] : false;

                                $expand_class = ($skill_desc) ? "js-expand-label" : "";

                                echo '<li class="label label--green ' . $expand_class .'">';
                                echo $interest_text;

                                if ($interest_desc)
                                    echo ' <span class="fa fa-plus label__expand-icon"></span><div class="label__more_content">' . $interest_desc . '</div>';

                                echo '</li>';
                            }
                            ?>

                        </ul>
                    </div>
                </div>

                <div class="article">
                    <div class="container">
                        <h3 class="article__header">What I've Been Up To</h3>
                        <div class="timeline">
                            <div class="timeline__item timeline__item--active">
                                <h2 class="timeline__date">2017 - Present</h2>
                                <div class="timeline-item__content timeline-item__content--work">
                                    <p>Junior Web Developer @ <a class="link--orange" href="https://www.brightminded.com" title="Link to BrightMinded website." target="_blank">BrightMinded</a></p>
                                </div>
                            </div>
                            <div class="timeline__item">
                                <h2 class="timeline__date">2014 - 2017</h2>
                                <div class="timeline-item__content timeline-item__content--school">
                                    <p>BSc (Hons) Web Technologies Student @ <a class="link--orange" href="http://www.port.ac.uk" title="Link to University of Portsmouth website." target="_blank">University of Portsmouth</a></p>
                                </div>
                            </div>
                            <div class="timeline__item">
                                <h2 class="timeline__date">2014 - 2017</h2>
                                <div class="timeline-item__content timeline-item__content--film">
                                    <p>Working Part Time @ <a class="link--orange" href="https://uk.webuy.com/" title="Link to CeX website." target="_blank">CeX</a> as a Sales Assistant</p>
                                </div>
                            </div>
                            <div class="timeline__item">
                                <h2 class="timeline__date">2014</h2>
                                <div class="timeline-item__content timeline-item__content--food">
                                    <p>Working Part Time @ <a class="link--orange" href="https://www.kfc.co.uk/" title="Link to KFC website." target="_blank">KFC</a> as a Team Member</p>
                                </div>
                            </div>
                            <div class="timeline__item">
                                <h2 class="timeline__date">2012 - 2014</h2>
                                <div class="timeline-item__content timeline-item__content--school">
                                    <p>BTEC Extended Diploma in IT Student @ <a class="link--orange" href="https://chichester.ac.uk/" title="Link to Chichester College website." target="_blank">Chichester College</a></p>
                                </div>
                            </div>
                            <div class="timeline__item">
                                <h2 class="timeline__date">2010</h2>
                                <div class="timeline-item__content timeline-item__content--coding">
                                    <p>Got Introduced to Developing/Coding</p>
                                </div>
                            </div>
                            <div class="timeline__item">
                                <h2 class="timeline__date">2005 - 2009</h2>
                                <div class="timeline-item__content timeline-item__content--football">
                                    <p>Playing for a Competitive Football Team @ <a class="link--orange" href="http://www.felphamcolts.com/" title="Link to Felpham Colts website." target="_blank">Felpham Colts</a> </p>
                                </div>
                            </div>
                            <div class="timeline__item">
                                <h2 class="timeline__date">1996 - 2007</h2>
                                <div class="timeline-item__content timelime-item__content--childhood">
                                    <p>Life before getting introduced to technology</p>
                                </div>
                            </div>
                            <div class="timeline__item">
                                <h2 class="timeline__date">1996</h2>
                                <div class="timeline-item__content timeline-item__content--baby">
                                    <p>Born</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="article article--50-50">
                    <div class="container">
                        <div class="article-50">
                            <a class="btn btn--purple" href="/projects/">View My Work</a>
                        </div>

                        <div class="article-50">
                            <a class="btn btn--red" href="/contact/">Get in Touch</a>
                        </div>
                    </div>
                </div>

            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMU8a7-Fl8_ozCH4y_ZAL6n5fdy1sLeJg"></script>

            <script>
                var style = <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'].'/assets/map-styling.json'); ?>;

                var initMap = function () {
                    var lat = 50.78420;
                    var lng = -0.67400;

                    var bognorRegis = new google.maps.LatLng(lat, lng);
                    var zoom = 12;

                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: bognorRegis,
                        zoom: zoom,
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        styles: style
                    });

                    var bognorRegisMarker = new google.maps.Marker({
                        position: bognorRegis,
                        map: map
                    });

                    google.maps.event.addDomListener(window, 'resize', function() {
                        map.setCenter(bognorRegis);
                    });
                };

                google.maps.event.addDomListener(window, 'load', initMap);
            </script>
<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>