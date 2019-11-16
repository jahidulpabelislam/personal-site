<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/init.php");

$site = Site::get();
$page = Page::get();

$headDesc = "Information about Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "About",
    "headDesc" => $headDesc,
    "headerTitle" => "About Me",
    "headerDesc" => "Find Out About Me",
    "navTint" => "light",
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();

$nowDateTime = getNowDateTime();

function renderSkillsOrInterests(string $heading, array $items, string $colour) {
    ?>
    <section class="article article--about">
        <div class="container">
            <h3 class="article__header"><?php echo $heading; ?></h3>
            <ul class="about__skills-interests">
            <?php
            foreach ($items as $item) {
                $hasDesc = !empty($item["desc"]);

                $expandClass = $hasDesc ? "skills-interests__item--expandable" : "";

                echo "<li class='skills-interests__item skills-interests__item--{$colour} {$expandClass}'>";
                echo $item["text"];

                if ($hasDesc) {
                    echo " <span class='skills-interests__item-expand-icon fa fa-plus '></span>";
                    echo "<div class='skills-interests__item-expand-content'>{$item["desc"]}</div>";
                }

                echo "</li>";
            }
            ?>
            </ul>
        </div>
    </section>
    <?php
}
?>

                <div class="article article--halved article--about">
                    <div class="container">
                        <div class="article__half">
                            <div class="about__images-of-me">
                                <img class="image-of-me image-of-me--baby" src="<?php echoWithAssetVersion("/assets/images/jahidul-pabel-islam-young.png"); ?>" alt="Image of Jahidul Pabel Islam as a Child" />
                                <img class="image-of-me image-of-me--grown" src="<?php echoWithAssetVersion("/assets/images/jahidul-pabel-islam-casual.jpg"); ?>" alt="Image of Jahidul Pabel Islam currently" />
                            </div>
                        </div>
                        <div class="article__half">
                            <p>My name is Jahidul Pabel Islam.</p>

                            <?php
                            $dob = "22/02/1996";

                            // Work out my age by the time difference from DOB to today
                            $age = getTimeDifference($dob, $nowDateTime, "%y");
                            ?>

                            <p>I'm <?php echo $age; ?> years old.</p>
                            <p>A Full Stack Developer.</p>
                        </div>
                    </div>
                </div>

                <div class="article article--halved article--about">
                    <div class="container">
                        <div class="article__half">
                            <a href="https://d3r.com/" title="Link to D3R website." target="_blank" rel="noopener noreferrer">
                                <img src="<?php echoWithAssetVersion("/assets/images/logos/d3r.svg"); ?>" alt="Logo of D3R" />
                            </a>
                        </div>
                        <div class="article__half">
                            <?php
                            $durationAtWorkStr = "";

                            $workStartDateStr = "23/09/2019";
                            $workStartDate = DateTime::createFromFormat("d/m/Y", $workStartDateStr);

                            $yearsSinceStarted = (int)getTimeDifference($workStartDate, $nowDateTime, "%y");
                            if ($yearsSinceStarted) {
                                $durationAtWorkStr .= "{$yearsSinceStarted} ";
                                $durationAtWorkStr .= $yearsSinceStarted === 1 ? "year" : "years";
                            }

                            $monthsSinceStarted = (int)getTimeDifference($workStartDate, $nowDateTime, "%m");
                            if ($monthsSinceStarted) {
                                if ($yearsSinceStarted) {
                                    $durationAtWorkStr .= " and";
                                }

                                $durationAtWorkStr .= " {$monthsSinceStarted} ";
                                $durationAtWorkStr .= $monthsSinceStarted === 1 ? "month" : "months";
                            }

                            if ($durationAtWorkStr) {
                                $durationAtWorkStr = " for the past " . trim($durationAtWorkStr);
                            }
                            ?>
                            <p>
                                Been working as a Web Developer at
                                <a class="link-styled link-styled--light-blue" href="https://d3r.com/" title="Link to D3R website." target="_blank" rel="noopener noreferrer">D3R</a><?php echo $durationAtWorkStr; ?>.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="article article--halved article--about">
                    <div class="container">
                        <div class="article__half">
                            <a href="https://www.port.ac.uk/" title="Link to University of Portsmouth website." target="_blank" rel="noopener noreferrer">
                                <img src="<?php echoWithAssetVersion("/assets/images/logos/uop.png"); ?>" alt="Logo of University of Portsmouth" />
                            </a>
                        </div>
                        <div class="article__half">
                            <p>
                                Graduated in July 2017 from
                                <a class="link-styled link-styled--purple" href="https://www.port.ac.uk/" title="Link to University of Portsmouth website." target="_blank" rel="noopener noreferrer">
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
                            <a href="https://goo.gl/maps/KEJgpYCxm6x/" title="Link to map of Bognor Regis." target="_blank" rel="noopener noreferrer">
                                <img src="<?php echoWithAssetVersion("/assets/images/beach.jpg"); ?>" alt="Image of a Beach" />
                            </a>
                        </div>
                        <div class="article__half">
                            <p>
                                Based in <a class="link-styled link-styled--red" href="https://goo.gl/maps/KEJgpYCxm6x/" title="Link to map of Bognor Regis." target="_blank" rel="noopener noreferrer">
                                    Bognor Regis</a>,<a class="link-styled link-styled--red" href="https://goo.gl/maps/EopyB2gtqXF2" title="Link to Map of West Sussex." target="_blank" rel="noopener noreferrer">
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
                            <img src="<?php echoWithAssetVersion("/assets/images/languages.png"); ?>" alt="Image of 'hello' in different languages" />
                        </div>
                        <div class="article__half">
                            <p>I am Bilingual, I can speak English &amp; Bengali.</p>
                        </div>
                    </div>
                </div>

                <?php
                $techSkills = [
                    [
                        "text" => "PHP",
                        "desc" => "Wordpress, Laravel &amp; PDO",
                    ], [
                        "text" => "JavaScript",
                        "desc" => "Node.js (socket.io &amp; Express), JQuery &amp; AngularJS",
                    ], [
                        "text" => "CSS",
                        "desc" => "CSS3, SCSS &amp; Bootstrap3/4",
                    ], [
                        "text" => "HTML",
                    ], [
                        "text" => "Python",
                        "desc" => "flask &amp; graphics.py",
                    ], [
                        "text" => "SQL",
                        "desc" => "MySQL",
                    ], [
                        "text" => "NoSQL",
                        "desc" => "Amazon DynamoDB &amp; MongoDB",
                    ], [
                        "text" => "Java",
                        "desc" => "Java EE 7, JSF 2, AWT &amp; Swing",
                    ], [
                        "text" => "DVCS",
                        "desc" => "Git (GitHub &amp; GitLab) &amp; Mercurial (Bitbucket)",
                    ], [
                        "text" => "Microsoft Office",
                        "desc" => "Excel, Word &amp; Powerpoint",
                    ],
                ];
                renderSkillsOrInterests("Technical Skills", $techSkills, "dark-blue");
                ?>

                <?php
                $otherSkills = [
                    [
                        "text" => "Team Player",
                        "desc" => "Playing competitive football has meant being a good team player is installed in me",
                    ], [
                        "text" => "Communication",
                        "desc" => "Written &amp; spoken communication skills from experience in customer focused environments",
                    ], [
                        "text" => "Hard Worker",
                    ],
                ];
                renderSkillsOrInterests("Other Skills", $otherSkills, "purple");
                ?>

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
                renderSkillsOrInterests("Interests", $interests, "dark-green");
                ?>

                <section class="article">
                    <div class="container">
                        <h3 class="article__header">What I've Been Up To</h3>
                        <div class="timeline">
                            <?php
                            $timelineItems = [
                                [
                                    "date" => "2019 - Present",
                                    "icon" => "work",
                                    "text" => "Web Developer @
                                        <a class='link-styled link-styled--orange' href='https://d3r.com/' title='Link to D3R website.' target='_blank' rel='noopener noreferrer'>
                                            D3R
                                        </a>",
                                    "isActive" => true,
                                ], [
                                    "date" => "2017 - 2019",
                                    "icon" => "work",
                                    "text" => "Software Developer @
                                        <a class='link-styled link-styled--orange' href='https://brightminded.com/' title='Link to BrightMinded website.' target='_blank' rel='noopener noreferrer'>
                                            BrightMinded
                                        </a>",
                                ], [
                                    "date" => "2014 - 2017",
                                    "icon" => "school",
                                    "text" => "Web Technologies Student @
                                        <a class='link-styled link-styled--orange' href='https://www.port.ac.uk/' title='Link to University of Portsmouth website.' target='_blank' rel='noopener noreferrer'>
                                            University of Portsmouth
                                        </a>",
                                ], [
                                    "date" => "2014 - 2017",
                                    "icon" => "film",
                                    "text" => "Working Part Time @
                                        <a class='link-styled link-styled--orange' href='https://uk.webuy.com/' title='Link to CeX website.' target='_blank' rel='noopener noreferrer'>
                                            CeX
                                        </a>
                                         as a Sales Assistant",
                                ], [
                                    "date" => "2014",
                                    "icon" => "food",
                                    "text" => "Working Part Time @
                                        <a class='link-styled link-styled--orange' href='https://www.kfc.co.uk/' title='Link to KFC website.' target='_blank' rel='noopener noreferrer'>
                                            KFC
                                        </a>
                                         as a Team Member",
                                ], [
                                    "date" => "2012 - 2014",
                                    "icon" => "school",
                                    "text" => "IT Student @
                                        <a class='link-styled link-styled--orange' href='https://chichester.ac.uk/' title='Link to Chichester College website.' target='_blank' rel='noopener noreferrer'>
                                            Chichester College
                                        </a>",
                                ], [
                                    "date" => $site->getYearStarted(),
                                    "icon" => "coding",
                                    "text" => "Got introduced to coding",
                                ], [
                                    "date" => "2005 - 2009",
                                    "icon" => "football",
                                    "text" => "Playing competitive football with
                                        <a class='link-styled link-styled--orange' href='http://www.felphamcolts.com/' title='Link to Felpham Colts website.' target='_blank' rel='noopener noreferrer'>
                                            Felpham Colts
                                        </a>",
                                ], [
                                    "date" => "1996 - 2007",
                                    "icon" => "childhood",
                                    "text" => "Life before getting introduced to technology",
                                ], [
                                    "date" => "1996",
                                    "icon" => "baby",
                                    "text" => "Born",
                                ],
                            ];

                            foreach ($timelineItems as $timelineItem) {
                                $isActive = $timelineItem["isActive"] ?? false;
                                $activeClass = $isActive ? "timeline__item--active" : "";
                                echo "<div class='timeline__item {$activeClass}'>";

                                $date = $timelineItem["date"];
                                echo "<p class='timeline-item__date'>{$date}</p>";

                                $iconName = $timelineItem["icon"];
                                $iconClass = !empty($iconName) ? "timeline-item__content--{$iconName}" : "";
                                echo "<div class='timeline-item__content {$iconClass}'>";

                                echo "<p>" . $timelineItem["text"] . "</p>";
                                echo "</div>";
                                echo "</div>";
                            }
                            ?>
                        </div>
                    </div>
                </section>

<?php

$page->addJSGlobal("config", "googleMapStyles", json_decode(file_get_contents(ROOT . "/assets/map-styling.json"), true));
$page->addJSScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDMU8a7-Fl8_ozCH4y_ZAL6n5fdy1sLeJg", 1);

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
$page->renderFooter($similarLinks);
