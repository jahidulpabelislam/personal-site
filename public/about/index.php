<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/../bootstrap.php");

$site = Site::get();
$page = Page::get();

$name = $site::NAME;
$job = $site::JOB;

$headDescription = "Information about $name, a $job based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "About",
    "headDescription" => $headDescription,
    "headerTitle" => "About Me",
    "headerDescription" => "Find Out About Me",
    "navTint" => "light",
];
$page->addPageData($pageData);

$page->renderHtmlStart();
$page->renderHead();
$page->renderPageStart();
$page->renderNav();
$page->renderHeader();
$page->renderContentStart();

$nowDateTime = getNowDateTime();

function renderSkillsOrInterests(string $heading, array $items, string $colour) {
    ?>
    <section class="row about-row">
        <div class="container">
            <h3 class="row__heading"><?php echo $heading; ?></h3>
            <ul class="skills-interests">
            <?php
            foreach ($items as $item) {
                $hasDescription = !empty($item["description"]);
                $expandClass = $hasDescription ? "skills-interests__item--expandable" : "";

                $descriptionHTML = "";
                if ($hasDescription) {
                    $descriptionHTML = <<<HTML
                        &nbsp;<span class="skills-interests__toggle fa fa-plus"></span>
                        <div class="skills-interests__description">
                            {$item["description"]}
                        </div>
                        HTML;
                }

                echo <<<HTML
                    <li class="skills-interests__item skills-interests__item--{$colour} {$expandClass}">
                        <p>{$item["text"]}</p>
                        {$descriptionHTML}
                    </li>
                    HTML;
            }
            ?>
            </ul>
        </div>
    </section>
    <?php
}
?>

<div class="row row--split about-row">
    <div class="container">
        <div class="row__column">
            <div class="images-of-me">
                <img class="images-of-me__image images-of-me__image--baby" src="<?php echo $site::asset("/assets/images/jahidul-pabel-islam-young.png"); ?>" alt="Image of <?php echo $name; ?> as a Child" />
                <img class="images-of-me__image images-of-me__image--grown" src="<?php echo $site::asset("/assets/images/jahidul-pabel-islam-casual.jpg"); ?>" alt="Image of <?php echo $name; ?> currently" />
            </div>
        </div>
        <div class="row__column">
            <p>My name is <?php echo $name; ?>.</p>

            <?php
            // Work out my age by the time difference from DOB to today
            $dob = "1996-02-22";
            $age = getTimeDifference($dob, $nowDateTime, "%r%y");
            ?>

            <p>I'm <?php echo $age; ?> years old.</p>
            <p>A <?php echo $site::JOB;?>.</p>
        </div>
    </div>
</div>

<div class="row row--split about-row">
    <div class="container">
        <div class="row__column">
            <a href="https://d3r.com/" title="Link to D3R website." target="_blank" rel="noopener noreferrer">
                <img class="row__column-image" src="<?php echo $site::asset("/assets/images/logos/d3r.svg"); ?>" alt="Logo of D3R" />
            </a>
        </div>
        <div class="row__column">
            <?php
            $durations = [];

            $workDuration = getTimeDifference("2019-09-23", $nowDateTime);

            $yearsSinceStarted = (int)$workDuration->format("%r%y");
            if ($yearsSinceStarted) {
                $durations[] = "{$yearsSinceStarted} year" . ($yearsSinceStarted !== 1 ? "s" : "");
            }

            $monthsSinceStarted = (int)$workDuration->format("%r%m");
            if ($monthsSinceStarted) {
                $durations[] = "{$monthsSinceStarted} month" . ($monthsSinceStarted !== 1 ? "s" : "");
            }

            if (count($durations)) {
                $durationAtWorkStr = " for the past " . implode(" and ", $durations);
            }
            ?>
            <p>
                Been working as a Web Developer at
                <a class="link link--light-blue" href="https://d3r.com/" title="Link to D3R website." target="_blank" rel="noopener noreferrer">D3R</a><?php echo $durationAtWorkStr ?? ""; ?>.
            </p>
        </div>
    </div>
</div>

<div class="row row--split about-row">
    <div class="container">
        <div class="row__column">
            <a href="https://www.port.ac.uk/" title="Link to University of Portsmouth website." target="_blank" rel="noopener noreferrer">
                <img class="row__column-image" src="<?php echo $site::asset("/assets/images/logos/uop.png"); ?>" alt="Logo of University of Portsmouth" />
            </a>
        </div>
        <div class="row__column">
            <p>
                Graduated in July 2017 from
                <a class="link link--purple" href="https://www.port.ac.uk/" title="Link to University of Portsmouth website." target="_blank" rel="noopener noreferrer">
                    University of Portsmouth
                </a>
                 with a 1st Class Honours degree in BSc Web Technologies.
            </p>
        </div>
    </div>
</div>

<div class="row row--split about-row">
    <div class="container">
        <div class="row__column">
            <a href="https://goo.gl/maps/KEJgpYCxm6x/" title="Link to map of Bognor Regis." target="_blank" rel="noopener noreferrer">
                <img class="row__column-image" src="<?php echo $site::asset("/assets/images/beach.jpg"); ?>" alt="Image of a Beach" />
            </a>
        </div>
        <div class="row__column">
            <p>
                Based in <a class="link link--dark-blue" href="https://goo.gl/maps/KEJgpYCxm6x/" title="Link to map of Bognor Regis." target="_blank" rel="noopener noreferrer">
                    Bognor Regis</a>,<a class="link link--dark-blue" href="https://goo.gl/maps/EopyB2gtqXF2" title="Link to Map of West Sussex." target="_blank" rel="noopener noreferrer">
                    West Sussex</a>, South East Coast of England.
            </p>
        </div>
    </div>
</div>

<div class="row row--full-width">
    <div class="map js-bognor-regis-map"></div>
</div>

<div class="row row--split about-row">
    <div class="container">
        <div class="row__column">
            <img class="row__column-image" src="<?php echo $site::asset("/assets/images/languages.png"); ?>" alt="Image of 'hello' in different languages" />
        </div>
        <div class="row__column">
            <p>I am Bilingual, I can speak English &amp; Bengali.</p>
        </div>
    </div>
</div>

<?php
$techSkills = [
    [
        "text" => "PHP",
        "description" => "<p>Wordpress, Laravel &amp; PDO</p>",
    ],
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
    [
        "text" => "Python",
        "description" => "<p>flask &amp; graphics.py</p>",
    ],
    [
        "text" => "SQL",
        "description" => "<p>MySQL</p>",
    ],
    [
        "text" => "NoSQL",
        "description" => "<p>Amazon DynamoDB &amp; MongoDB</p>",
    ],
    [
        "text" => "Java",
        "description" => "<p>Java EE 7, JSF 2, AWT &amp; Swing</p>",
    ],
    [
        "text" => "DVCS",
        "description" => "<p>Git (GitHub &amp; GitLab) &amp; Mercurial (Bitbucket)</p>",
    ],
    [
        "text" => "Microsoft Office",
        "description" => "<p>Excel, Word &amp; Powerpoint</p>",
    ],
];
renderSkillsOrInterests("Technical Skills", $techSkills, "dark-blue");
?>

<?php
$otherSkills = [
    [
        "text" => "Team Player",
        "description" => "<p>Playing competitive football has meant being a good team player is instilled in me</p>",
    ],
    [
        "text" => "Communication",
        "description" => "<p>Written &amp; spoken communication skills from experience in customer focused environments</p>",
    ],
    [
        "text" => "Hard Worker",
    ],
];
renderSkillsOrInterests("Other Skills", $otherSkills, "dark-blue");
?>

<?php
$interests = [
    ["text" => "Sports"],
    ["text" => "Music"],
    ["text" => "Photography"],
    ["text" => "Fashion"],
    ["text" => "Programming"],
    ["text" => "Gaming"],
];
renderSkillsOrInterests("Interests", $interests, "dark-blue");
?>

<section class="row">
    <div class="container">
        <h3 class="row__heading">What I've Been Up To</h3>
        <div class="timeline">
            <?php
            $timelineItems = [
                [
                    "date" => "2019 - Present",
                    "icon" => "work",
                    "text" => "Web Developer @
                        <a class='link link--dark-blue' href='https://d3r.com/' title='Link to D3R website.' target='_blank' rel='noopener noreferrer'>
                            D3R
                        </a>",
                    "isActive" => true,
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
                    "date" => "2014 - 2017",
                    "icon" => "school",
                    "text" => "Web Technologies Student @
                        <a class='link link--dark-blue' href='https://www.port.ac.uk/' title='Link to University of Portsmouth website.' target='_blank' rel='noopener noreferrer'>
                            University of Portsmouth
                        </a>",
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
                    "date" => "2014",
                    "icon" => "food",
                    "text" => "Working Part Time @
                        <a class='link link--dark-blue' href='https://www.kfc.co.uk/' title='Link to KFC website.' target='_blank' rel='noopener noreferrer'>
                            KFC
                        </a>
                         as a Team Member",
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
                    "date" => $site->getYearStarted(),
                    "icon" => "coding",
                    "text" => "Got introduced to coding",
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
                    "date" => "1996 - 2007",
                    "icon" => "childhood",
                    "text" => "Life before getting introduced to technology",
                ],
                [
                    "date" => "1996",
                    "icon" => "baby",
                    "text" => "Born",
                ],
            ];

            foreach ($timelineItems as $timelineItem) {
                $isActive = $timelineItem["isActive"] ?? false;
                $activeClass = $isActive ? "timeline__item--present" : "";

                $iconName = $timelineItem["icon"];
                $iconClass = !empty($iconName) ? "timeline__content--{$iconName}" : "";

                echo <<<HTML
                    <div class="timeline__item {$activeClass}">
                        <p class="timeline__date">{$timelineItem["date"]}</p>
                        <div class="timeline__content {$iconClass}">
                            <p>{$timelineItem["text"]}</p>
                        </div>
                    </div>
                    HTML;
            }
            ?>
        </div>
    </div>
</section>

<?php
$page->addJSGlobal("config", "googleMapStyles", (new File("/assets/map-styling.json"))->getArray());
$page->addScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDMU8a7-Fl8_ozCH4y_ZAL6n5fdy1sLeJg", "");

$similarLinks = [
    [
        "title" => "Projects",
        "url" => "projects",
        "text" => "View My Work",
        "colour" => "dark-blue",
    ],
    [
        "title" => "Contact",
        "url" => "contact",
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
