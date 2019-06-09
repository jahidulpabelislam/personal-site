<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$headDesc = "Some Information About Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$pageData = [
    "headTitle" => "About",
    "headDesc" => $headDesc,
    "headerTitle" => "About Me",
    "headerDesc" => "Find Out About Me",
    "navTint" => "light",
];
$pageRenderer->addPageData($pageData);

$pageRenderer->renderHTMLHead();
$pageRenderer->renderNav();
$pageRenderer->renderHeader();
?>

                <div class="article article--halved article--about">
                    <div class="container">
                        <div class="article__half">
                            <div class="about__images-of-me">
                                <img src="<?php $site::echoWithAssetVersion("/assets/images/jahidul-pabel-islam-young.png"); ?>" class="image-of-me image-of-me--baby" alt="Image of Jahidul Pabel Islam as a Child" />
                                <img src="<?php $site::echoWithAssetVersion("/assets/images/jahidul-pabel-islam-casual.jpg"); ?>" class="image-of-me image-of-me--grown" alt="Image of Jahidul Pabel Islam currently" />
                            </div>
                        </div>
                        <div class="article__half">
                            <p>My name is Jahidul Pabel Islam.</p>

                            <?php
                            $dob = "22/02/1996";

                            // Work out my age by the time difference from DOB to today
                            $age = $site->getTimeDifference($dob, null, "%y");
                            ?>

                            <p>I'm <?php echo $age; ?> years old.</p>
                            <p>A Full Stack Web and Software Developer.</p>
                        </div>
                    </div>
                </div>

                <div class="article article--halved article--about">
                    <div class="container">
                        <div class="article__half">
                            <a href="https://www.brightminded.com/" title="Link to BrightMinded website." target="_blank">
                                <img src="<?php $site::echoWithAssetVersion("/assets/images/brightminded.png"); ?>" alt="Logo of BrightMinded" />
                            </a>
                        </div>
                        <div class="article__half">
                            <?php
                            $workStartDate = "28/06/2017";
                            $workDurationString = "";
                            $yearsSinceStarted = (int)$site->getTimeDifference($workStartDate, null, "%y");
                            if ($yearsSinceStarted) {
                                $workDurationString .= "{$yearsSinceStarted} ";
                                $workDurationString .= $yearsSinceStarted === 1 ? "year" : "years";
                            }
                            $monthsSinceStarted = (int)$site->getTimeDifference($workStartDate, null, "%m");
                            if ($monthsSinceStarted) {
                                if ($yearsSinceStarted) {
                                    $workDurationString .= " and";
                                }
                                $workDurationString .= " $monthsSinceStarted ";
                                $workDurationString .= $monthsSinceStarted === 1 ? "month" : "months";
                            }
                            ?>
                            <p>
                                Been working as a Software Developer at
                                <a href="https://www.brightminded.com/" title="Link to BrightMinded website." class="link-styled link-styled--lime-green" target="_blank">
                                    BrightMinded
                                </a>
                                 for the past <?php echo trim($workDurationString); ?>.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="article article--halved article--about">
                    <div class="container">
                        <div class="article__half">
                            <a href="http://www.port.ac.uk/" title="Link to University of Portsmouth website." target="_blank">
                                <img src="<?php $site::echoWithAssetVersion("/assets/images/uop.png"); ?>" alt="Logo of University of Portsmouth" />
                            </a>
                        </div>
                        <div class="article__half">
                            <p>
                                Graduated in July 2017 from
                                <a href="http://www.port.ac.uk/" title="Link to University of Portsmouth website." class="link-styled link-styled--purple" target="_blank">
                                    University of Portsmouth
                                </a>
                                 with a 1st Class Honours degree in BSc Web Technologies.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="article article--halved article--about">
                    <div class="container">
                        <div class="article__half">
                            <a href="https://goo.gl/maps/KEJgpYCxm6x/" title="Link to Map of Bognor Regis." target="_blank">
                                <img src="<?php $site::echoWithAssetVersion("/assets/images/beach.jpg"); ?>" alt="Image of a Beach" />
                            </a>
                        </div>
                        <div class="article__half">
                            <p>
                                Based in <a href="https://goo.gl/maps/KEJgpYCxm6x/" title="Link to Map of Bognor Regis." class="link-styled link-styled--red" target="_blank">
                                    Bognor Regis</a>,<a class="link-styled link-styled--red" href="https://goo.gl/maps/EopyB2gtqXF2" title="Link to Map of West Sussex." target="_blank">
                                    West Sussex</a>, South East Coast of England.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="article article--map">
                    <div class="map js-bognor-regis-map"></div>
                </div>

                <div class="article article--halved article--about">
                    <div class="container">
                        <div class="article__half">
                            <img src="<?php $site::echoWithAssetVersion("/assets/images/languages.png"); ?>" alt="Image of 'hello' in different languages" />
                        </div>
                        <div class="article__half">
                            <p>I am Bilingual, I can speak English &amp; Bengali.</p>
                        </div>
                    </div>
                </div>

                <section class="article article--about">
                    <div class="container">
                        <h3 class="article__header">Technical Skills</h3>

                        <ul class="about__skills-interests">
                            <?php
                            $techSkills = [
                                [
                                    "text" => "PHP",
                                    "desc" => "Wordpress, Laravel & PDO",
                                ], [
                                    "text" => "JavaScript",
                                    "desc" => "Node.js (socket.io & Express), JQuery & AngularJS",
                                ], [
                                    "text" => "CSS",
                                    "desc" => "CSS3, SCSS, Bootstrap3/4",
                                ], [
                                    "text" => "HTML",
                                ], [
                                    "text" => "Python",
                                    "desc" => "flask & graphics.py",
                                ], [
                                    "text" => "SQL",
                                    "desc" => "MySQL",
                                ], [
                                    "text" => "NoSQL",
                                    "desc" => "Amazon DynamoDB & MongoDB",
                                ], [
                                    "text" => "Java",
                                    "desc" => "Java EE 7, JSF 2, AWT & Swing",
                                ], [
                                    "text" => "DVCS",
                                    "desc" => "Git (GitHub & GitLab) & Mercurial (Bitbucket)",
                                ], [
                                    "text" => "Microsoft Office",
                                    "desc" => "Excel, Word & Powerpoint",
                                ],
                            ];

                            foreach ($techSkills as $skill) {
                                $skillText = $skill["text"];
                                $hasSkillDesc = !empty($skill["desc"]);

                                $expandClass = $hasSkillDesc ? "js-expand-skill-interest" : "";

                                echo "<li class='skills-interests__item skills-interests__item--dark-blue {$expandClass}'>";
                                echo $skillText;

                                if ($hasSkillDesc) {
                                    echo " <span class='fa fa-plus skills-interests__item-expand-icon'></span>";
                                    echo "<div class='skills-interests__item-expand-content'>{$skill["desc"]}</div>";
                                }
                                echo "</li>";
                            }
                            ?>
                        </ul>
                    </div>
                </section>

                <section class="article article--about">
                    <div class="container">
                        <h3 class="article__header">Other Skills</h3>

                        <ul class="about__skills-interests">
                            <?php
                            $otherSkills = [
                                [
                                    "text" => "Team Player",
                                    "desc" => "Playing competitive football has meant being a good team player is installed in me",
                                ], [
                                    "text" => "Communication",
                                    "desc" => "Written & spoken communication skills from experience in customer focused environments",
                                ], [
                                    "text" => "Hard Worker",
                                ],
                            ];

                            foreach ($otherSkills as $skill) {
                                $skillText = $skill["text"];
                                $hasSkillDesc = !empty($skill["desc"]);

                                $expandClass = $hasSkillDesc ? "js-expand-skill-interest" : "";

                                echo "<li class='skills-interests__item skills-interests__item--purple {$expandClass}'>";
                                echo $skillText;

                                if ($hasSkillDesc) {
                                    echo " <span class='fa fa-plus skills-interests__item-expand-icon'></span>";
                                    echo "<div class='skills-interests__item-expand-content'>{$skill["desc"]}</div>";
                                }
                                echo "</li>";
                            }
                            ?>
                        </ul>
                    </div>
                </section>

                <section class="article article--about">
                    <div class="container">
                        <h3 class="article__header">Interests</h3>

                        <ul class="about__skills-interests">

                            <?php
                            $interests = [
                                ["text" => "Sports"],
                                ["text" => "Music"],
                                ["text" => "Photography"],
                                ["text" => "Fashion"],
                                ["text" => "Programming"],
                                ["text" => "Gaming"],
                                ["text" => "Trading"],
                            ];

                            foreach ($interests as $interest) {
                                $interestText = $interest["text"];
                                $hasInterestDesc = !empty($interest["desc"]);

                                $expandClass = $hasInterestDesc ? "js-expand-skill-interest" : "";

                                echo "<li class='skills-interests__item skills-interests__item--dark-green {$expandClass}'>";
                                echo $interestText;

                                if ($hasInterestDesc) {
                                    echo " <span class='fa fa-plus skills-interests__item-expand-icon'></span>";
                                    echo "<div class='skills-interests__item-expand-content'>{$interest["desc"]}</div>";
                                }

                                echo "</li>";
                            }
                            ?>
                        </ul>
                    </div>
                </section>

                <section class="article">
                    <div class="container">
                        <h3 class="article__header">What I've Been Up To</h3>
                        <div class="timeline">
                            <?php
                            $timelineItems = [
                                [
                                    "date" => "2017 - Present",
                                    "icon" => "work",
                                    "text" => "Software Developer @
                                        <a href='https://www.brightminded.com/' title='Link to BrightMinded website.' class='link-styled link-styled--orange' target='_blank'>
                                            BrightMinded
                                        </a>",
                                    "isActive" => true,
                                ], [
                                    "date" => "2014 - 2017",
                                    "icon" => "school",
                                    "text" => "Web Technologies Student @
                                        <a href='http://www.port.ac.uk/' title='Link to University of Portsmouth website.' class='link-styled link-styled--orange' target='_blank'>
                                            University of Portsmouth
                                        </a>",
                                    "isActive" => false,
                                ], [
                                    "date" => "2014 - 2017",
                                    "icon" => "film",
                                    "text" => "Working Part Time @
                                        <a href='https://uk.webuy.com/' title='Link to CeX website.' class='link-styled link-styled--orange' target='_blank'>
                                            CeX
                                        </a>
                                         as a Sales Assistant",
                                    "isActive" => false,
                                ], [
                                    "date" => "2014",
                                    "icon" => "food",
                                    "text" => "Working Part Time @
                                        <a href='https://www.kfc.co.uk/' title='Link to KFC website.' class='link-styled link-styled--orange' target='_blank'>
                                            KFC
                                        </a>
                                         as a Team Member",
                                    "isActive" => false,
                                ], [
                                    "date" => "2012 - 2014",
                                    "icon" => "school",
                                    "text" => "IT Student @
                                        <a href='https://chichester.ac.uk/' title='Link to Chichester College website.' class='link-styled link-styled--orange' target='_blank'>
                                            Chichester College
                                        </a>",
                                    "isActive" => false,
                                ], [
                                    "date" => $site->getYearStarted(),
                                    "icon" => "coding",
                                    "text" => "Got introduced to coding",
                                    "isActive" => false,
                                ], [
                                    "date" => "2005 - 2009",
                                    "icon" => "football",
                                    "text" => "Playing competitive football with
                                        <a href='http://www.felphamcolts.com/' title='Link to Felpham Colts website.' class='link-styled link-styled--orange' target='_blank'>
                                            Felpham Colts
                                        </a>",
                                    "isActive" => false,
                                ], [
                                    "date" => "1996 - 2007",
                                    "icon" => "childhood",
                                    "text" => "Life before getting introduced to technology",
                                    "isActive" => false,
                                ], [
                                    "date" => "1996",
                                    "icon" => "baby",
                                    "text" => "Born",
                                    "isActive" => false,
                                ],
                            ];

                            foreach ($timelineItems as $timelineItem) {
                                $activeClass = $timelineItem["isActive"] ? "timeline__item--active" : "";
                                echo "<div class='timeline__item {$activeClass}'>";

                                $date = $timelineItem["date"];
                                echo "<p class='timeline-item__date'>{$date}</p>";

                                $iconName = $timelineItem["icon"];
                                $iconClass = !empty($iconName) ? "timeline-item__content--{$iconName}" : "";
                                echo "<div class='timeline-item__content {$iconClass}'>";

                                echo "<p>". $timelineItem["text"] . "</p>";
                                echo "</div>";
                                echo "</div>";
                            }
                            ?>
                        </div>
                    </div>
                </section>

                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMU8a7-Fl8_ozCH4y_ZAL6n5fdy1sLeJg"></script>

                <script>
                    window.jpi = window.jpi || {};
                    window.jpi.config = window.jpi.config || {};
                    window.jpi.config.googleMapStyles = <?php echo file_get_contents(ROOT . "/assets/map-styling.json"); ?>;
                </script>

<?php
$similarLinks = [
    [
        "title" => "Projects",
        "url" => "projects",
        "text" => "View My Work",
        "colour" => "purple",
    ], [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
        "colour" => "red",
    ],
];
$pageRenderer->renderFooter($similarLinks);
