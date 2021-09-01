<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/../bootstrap.php");

$site = site();
$page = page();

$name = $site::NAME;
$job = $site::JOB;

$headDescription = "Information about $name, a $job based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "About",
    "headDescription" => $headDescription,
    "headerTitle" => "About Me",
    "headerDescription" => "Get To Know Me",
];
$page->addPageData($pageData);

$page->renderHtmlStart();
$page->renderHead();
$page->renderPageStart();
$page->renderNav();
$page->renderHeader();
$page->renderContentStart();
?>

<div class="row row--thirds about-row">
    <div class="container">
        <div class="row__column">
            <p>My name is <?php echo $name; ?>.</p>

            <?php
            // Work out my age by the time difference from DOB to today
            $age = getTimeDifference($site::DATE_OF_BIRTH, new DateTime(), "%r%y");
            ?>

            <p>I'm <?php echo $age; ?> years old.</p>
        </div>
        <div class="row__column">
            <div class="images-of-me">
                <img class="images-of-me__image images-of-me__image--baby" src="<?php echo $site::asset("/assets/images/jahidul-pabel-islam-young.png"); ?>" alt="Image of <?php echo $name; ?> as a Child" />
                <img class="images-of-me__image images-of-me__image--grown" src="<?php echo $site::asset("/assets/images/jahidul-pabel-islam.jpg"); ?>" alt="Image of <?php echo $name; ?> currently" />
            </div>
        </div>
        <div class="row__column">
            <p>A <?php echo $site::JOB;?>.</p>
            <p>I am Bilingual, I can speak English &amp; Bengali.</p>
        </div>
    </div>
</div>

<div class="row row--alt about-row">
    <div class="container">
        <div class="row__column">
            <p>
                Based in <a class="link link--dark-blue" href="https://goo.gl/maps/KEJgpYCxm6x/" title="Link to map of Bognor Regis." target="_blank" rel="noopener noreferrer">
                    Bognor Regis</a>,<a class="link link--dark-blue" href="https://goo.gl/maps/EopyB2gtqXF2" title="Link to Map of West Sussex." target="_blank" rel="noopener noreferrer">
                    West Sussex</a>, South East Coast of England.
            </p>
        </div>
    </div>
</div>

<div class="row row--flush">
    <div class="map js-bognor-regis-map"></div>
</div>

<div class="row row--thirds row--dark-blue about-row about-row--skills">
    <h2 class="row__heading">What I'm Best At</h2>
    <div class="container">
        <?php
        function renderSkills(string $title, array $skills) {
            ?>
            <div class="row__column">
                <h3 class="row__sub-heading"><?php echo $title; ?></h3>
                <ul class="skills">
                    <?php
                    foreach ($skills as $skill) {
                        $hasDescription = !empty($skill["description"]);
                        $expandClass = $hasDescription ? "skills__item--expandable" : "";

                        $descriptionHTML = "";
                        if ($hasDescription) {
                            $descriptionHTML = <<<HTML
                    &nbsp;<span class="skills__toggle fa fa-plus"></span>
                    <div class="skills__description">
                        {$skill["description"]}
                    </div>
                    HTML;
                        }

                        echo <<<HTML
                <li class="skills__item $expandClass">
                    <p>{$skill["text"]}</p>
                    $descriptionHTML
                </li>
                HTML;
                    }
                    ?>
                </ul>
            </div>
            <?php
        }

        $skills = [
            [
                "text" => "PHP",
                "description" => "<p>Wordpress, Laravel &amp; PDO</p>",
            ],
            [
                "text" => "Python",
                "description" => "<p>flask &amp; graphics.py</p>",
            ],
            [
                "text" => "SQL",
                "description" => "<p>MySQL</p>",
            ],
        ];
        renderSkills("Back-end", $skills);

        $skills = [
            [
                "text" => "JavaScript",
                "description" => "<p>Node.js (socket.io &amp; Express), JQuery &amp; AngularJS</p>",
            ],
            [
                "text" => "CSS",
                "description" => "<p>CSS3, SCSS &amp; Bootstrap3/4</p>",
            ],
            [
                "text" => "HTML",
            ],
        ];
        renderSkills("Front-end", $skills);

        $skills = [
            [
                "text" => "DVCS",
                "description" => "<p>Git (GitHub &amp; GitLab) &amp; Mercurial (Bitbucket)</p>",
            ],
            [
                "text" => "Team Player",
                "description" => "<p>Playing competitive football has meant being a good team player is instilled in me</p>",
            ],
            [
                "text" => "Communication",
                "description" => "<p>Written &amp; spoken communication skills from experience in customer focused environments</p>",
            ],
        ];
        renderSkills("Others", $skills);
        ?>
    </div>
</div>

<section class="row row--alt">
    <h3 class="row__heading">My Journey So Far</h3>
    <div class="timeline">
        <div class="timeline__viewport">
            <div class="timeline__navs">
                <button type="button" class="timeline__nav button button--white" data-direction="previous">
                    <span class="screen-reader-text">Navigate to the previous slide/image.</span>
                    <?php renderFile("/assets/images/previous.svg"); ?>
                </button>
                <button type="button" class="timeline__nav button button--white" data-direction="next">
                    <span class="screen-reader-text">Navigate to the next slide/image.</span>
                    <?php renderFile("/assets/images/next.svg"); ?>
                </button>
            </div>

            <div class="timeline__items">
                <?php
                $timelineItems = [
                    [
                        "date" => "1996",
                        "icon" => "baby",
                        "text" => "Born",
                    ],
                    [
                        "date" => "1996 - 2007",
                        "icon" => "childhood",
                        "text" => "Life before getting introduced to technology",
                    ],
                    [
                        "date" => "2005 - 2009",
                        "icon" => "football",
                        "text" => "Playing competitive football with
                            <a class='link link--dark-blue' href='http://www.felphamcolts.com/' title='Link to Felpham Colts website.' target='_blank' rel='noopener noreferrer'>
                                Felpham Colts
                            </a>",
                    ],
                    [
                        "date" => 2010,
                        "icon" => "coding",
                        "text" => "Got introduced to coding",
                    ],
                    [
                        "date" => "2012 - 2014",
                        "icon" => "school",
                        "text" => "IT Student @
                            <a class='link link--dark-blue' href='https://chichester.ac.uk/' title='Link to Chichester College website.' target='_blank' rel='noopener noreferrer'>
                                Chichester College
                            </a>",
                    ],
                    [
                        "date" => "2014",
                        "icon" => "food",
                        "text" => "Working Part Time @
                            <a class='link link--dark-blue' href='https://www.kfc.co.uk/' title='Link to KFC website.' target='_blank' rel='noopener noreferrer'>
                                KFC
                            </a>
                             as a Team Member",
                    ],
                    [
                        "date" => "2014 - 2017",
                        "icon" => "film",
                        "text" => "Working Part Time @
                            <a class='link link--dark-blue' href='https://uk.webuy.com/' title='Link to CeX website.' target='_blank' rel='noopener noreferrer'>
                                CeX
                            </a>
                             as a Sales Assistant",
                    ],
                    [
                        "date" => "2014 - 2017",
                        "icon" => "school",
                        "text" => "Web Technologies Student @
                            <a class='link link--dark-blue' href='https://www.port.ac.uk/' title='Link to University of Portsmouth website.' target='_blank' rel='noopener noreferrer'>
                                University of Portsmouth
                            </a>",
                    ],
                    [
                        "date" => "2017 - 2019",
                        "icon" => "work",
                        "text" => "Software Developer @
                            <a class='link link--dark-blue' href='https://brightminded.com/' title='Link to BrightMinded website.' target='_blank' rel='noopener noreferrer'>
                                BrightMinded
                            </a>",
                    ],
                    [
                        "date" => "2019 - Present",
                        "icon" => "work",
                        "text" => "Web Developer @
                            <a class='link link--dark-blue' href='https://d3r.com/' title='Link to D3R website.' target='_blank' rel='noopener noreferrer'>
                                D3R
                            </a>",
                        "isActive" => true,
                    ],
                ];

                foreach ($timelineItems as $timelineItem) {
                    $isActive = $timelineItem["isActive"] ?? false;
                    $activeClass = $isActive ? "timeline__item--present" : "";

                    $iconName = $timelineItem["icon"];
                    $iconClass = !empty($iconName) ? "timeline__item--{$iconName}" : "";

                    echo <<<HTML
                        <div class="timeline__item $iconClass $activeClass">
                            <div>
                                <p class="timeline__date">{$timelineItem["date"]}</p>
                                <div class="timeline__content">
                                    <p>{$timelineItem["text"]}</p>
                                </div>
                            </div>
                        </div>
                        HTML;
                }
                ?>
            </div>
        </div>
    </div>
</section>

<?php
$page->addJSGlobal("config", "googleMapStyles", load(ROOT. "/assets/map-styling.json", false)->getArray());
$page->addScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDMU8a7-Fl8_ozCH4y_ZAL6n5fdy1sLeJg", "");

$similarLinks = [
    [
        "title" => "Projects",
        "url" => "/projects/",
        "text" => "View My Work",
        "colour" => "dark-blue",
    ],
    [
        "title" => "Contact",
        "url" => "/contact/",
        "text" => "Get in Touch",
        "colour" => "dark-blue",
    ],
];
$page->similarLinks = $similarLinks;
$page->renderSimilarLinks();
$page->renderSocialLinks();
$page->renderContentEnd();
$page->renderFooter();
$page->renderCookieBanner();
$page->renderPageEnd();
$page->renderHtmlEnd();
