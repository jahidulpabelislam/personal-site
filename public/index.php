<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/../bootstrap.php");

$site = Site::get();
$page = Page::get();

$name = $site::NAME;
$job = $site::JOB;

$headDescription = "Portfolio of $name, a $job at Bognor Regis, West Sussex down in the South Coast of England.";

$pageData = [
    "headTitle" => "$name's Portfolio - $job",
    "headDescription" => $headDescription,
    "headerTitle" => $name,
    "headerDescription" => $job,
];
$page->addPageData($pageData);

$page->showSocialLinksHeader = true;

$page->renderHtmlStart();
$page->renderHead();
$page->renderPageStart();
$page->renderNav();
$page->renderHeader();
$page->renderContentStart();

// Work out the time since I started to today
$yearsSinceStarted = getTimeDifference($site->getDateStarted(), new DateTime(), "%r%y");
?>

<section>
    <div class="row row--grey home-hello">
        <div class="container">
            <h3 class="home-hello__hello"><span>Hello</span> there everyone!</h3>
            <div class="home-hello__images">
                <img class="home-hello__image" src="<?php echo $site::asset("/assets/images/jahidul-pabel-islam-smart.jpg"); ?>" alt="<?php echo $name; ?> Graduating" />
                <img class="home-hello__image home-hello__image--logo" src="<?php echo $site::asset("/assets/images/logo.png"); ?>" alt="<?php echo $name; ?>'s Logo" />
            </div>
            <p class="home-hello__welcome">Welcome and thanks for visiting me!</p>
        </div>
    </div>

    <div class="row">
        <div class="container">
            <p>
                Here you will be able to look at all the <a class="link" href="<?php $site->echoURL("projects"); ?>">work</a>
                 I have completed over the last <?php echo $yearsSinceStarted; ?> years, <a class="link" href="<?php $site->echoURL("about"); ?>">learn about me</a> also
                <a class="link" href="<?php $site->echoURL("contact"); ?>">contact me</a> for any enquiries or to just provide feedback.
            </p>
            <p>So, have a look around my ever-evolving portfolio, as I'm always looking to find different ways to improve my site by experimenting with new technologies, libraries & plugins and ideas here while also improving my skill set and expanding my knowledge then can bring them to projects at work.</p>
        </div>
    </div>
</section>

<section class="row row--dark-blue">
    <div class="container">
        <div class="workflow">
            <?php
            $workflowItems = [
                [
                    "heading" => "Design",
                    "icon" => "design-icon.png",
                    "imageAlt" => "A image of a paintbrush on a desktop computer",
                    "description" => "<p>
                        My work only starts when the PSD or flat image designs are handed over, then I can start to turning them into pixel perfect sites/apps.<br />
                    </p>",
                ],
                [
                    "heading" => "Responsive",
                    "icon" => "responsive-icon.png",
                    "imageAlt" => "A image of various sized devices: Desktop computer, tablet &amp; mobile phone",
                    "description" => "<p>
                        I approach styling from a mobile first point of view,
                        aiming to make all sites/apps usable on different sized devices.<br />
                    </p>",
                ],
                [
                    "heading" => "Code",
                    "icon" => "code-icon.png",
                    "imageAlt" => "A image showing code",
                    "description" => "<p>
                        I tend to develop custom and bespoke systems,
                        but I do use frameworks or libraries to fulfill the necessary requirements if needed.
                    </p>",
                ],
            ];

            foreach ($workflowItems as $workflowItem) {
                ?>
                <div class="workflow__item">
                    <h3 class="row__heading"><?php echo $workflowItem["heading"]; ?></h3>
                    <img class="workflow__image" src="<?php echo $site::asset("/assets/images/" . $workflowItem["icon"]); ?>" alt="<?php echo $workflowItem["imageAlt"]; ?>" />
                    <div class="workflow__description">
                        <?php echo $workflowItem["description"]; ?>
                    </div>
                </div>
                <?php
            }
            ?>
        </div>
    </div>
</section>

<section class="latest-projects row row--halves row--grey">
    <div class="container">
        <div class="row__column">
            <h3 class="row__heading">Latest Projects</h3>
            <p>
                These are the latest personal projects I have worked on.
            </p>
            <a class="latest-projects__view button" href="<?php $site->echoURL("projects"); ?>">
                View More Work
            </a>
        </div>
        <div class="row__column">
            <i class="latest-projects__loading fas fa-spinner fa-spin fa-3x"></i>

            <div class="slide-show latest-projects__slide-show" id="latest-projects">
                <div class="slide-show__viewport">
                    <div class="slide-show__slides" data-slide-show-id="#latest-projects"></div>
                    <div class="slide-show__bullets"></div>
                </div>
            </div>

            <p class="latest-projects__error"></p>
        </div>
    </div>
</section>

<section class="row row--dark-blue">
    <div class="container">
        <div class="stats js-counters">
            <?php
            $baseSpeed = 1600;

            $counts = (new File("/assets/counters.json"))->getArray();

            $counterItems = [
                [
                    "text" => "Years experience",
                    "number" => $yearsSinceStarted,
                    "speed" => $baseSpeed,
                ],
                [
                    "text" => "Projects",
                    "number" => $counts["projects"] ?? 60,
                    "speed" => $baseSpeed + 600,
                ],
                [
                    "text" => "Commits",
                    "number" => $counts["commits"] ?? 8500,
                    "speed" => $baseSpeed + 1000,
                ],
            ];

            foreach ($counterItems as $counterItem) {
                ?>
                <div class="stats__item">
                    <p class="row__heading stats__heading js-counter" data-to="<?php echo $counterItem["number"]; ?>" data-speed="<?php echo $counterItem["speed"]; ?>">
                        <?php echo $counterItem["number"]; ?>
                    </p>
                    <p class="stats__text"><?php echo $counterItem["text"]; ?></p>
                </div>
                <?php
            }
            ?>

            <div class="stats__item">
                <p class="row__heading stats__heading js-seconds-on-site" data-current-second="0">0</p>
                <p class="stats__text">Seconds on here</p>
            </div>
        </div>
    </div>
</section>

<?php
$projectImageURL = Site::getProjectImageURL("{{ images.0.file }}");

$page->addJSTemplate(
    "slide",
    <<<HTML
    <div class="slide-show__slide latest-project" id="slide-{{ id }}">
        <img class="slide-show__image latest-project__image" src="{$projectImageURL}" alt="Screen shot of {{ name }} Project" />
        <div class="latest-project__info">
            <div class="latest-project__info-content">
                <div class="latest-project__header">
                    <h4 class="latest-project__title">{{ name }}</h4>
                    <time class="latest-project__date">{{ date }}</time>
                </div>
                <div class="latest-project__description">{{ short_description }}</div>
                <div class="latest-project__links"></div>
            </div>
        </div>
    </div>
    HTML
);

$page->addJSTemplate(
    "slide-bullet",
    <<<HTML
    <button type="button" class="slide-show__bullet" data-slide-show-id="#latest-projects" data-slide-id="#slide-{{ id }}">
    </button>
    HTML
);

$page->addJSGlobal("config", "jpiAPIEndpoint", removeTrailingSlash($site::getAPIEndpoint()));

$page->renderContentEnd();
$page->renderFooter();
$page->renderCookieBanner();
$page->renderPageEnd();
$page->renderHtmlEnd();
