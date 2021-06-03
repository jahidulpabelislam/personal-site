<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/bootstrap.php");

$site = Site::get();
$page = Page::get();

$headDescription = "Portfolio of Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down in the South Coast of England.";

$pageData = [
    "headDescription" => $headDescription,
    "headerTitle" => "Jahidul Pabel Islam",
    "headerDescription" => "Full Stack Developer",
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();

// Work out the time since I started to today
$yearsSinceStarted = getTimeDifference($site->getDateStarted(), getNowDateTime(), "%r%y");
?>

                <section>
                    <div class="row home-hello">
                        <div class="container">
                            <h3 class="home-hello__text"><span class="home-hello__hello">Hello</span> there everyone!</h3>
                            <img class="home-hello__image" src="<?php echoWithAssetVersion("/assets/images/jahidul-pabel-islam-smart.jpg"); ?>" alt="Jahidul Pabel Islam Graduating" />
                            <img class="home-hello__image home-hello__logo" src="<?php echoWithAssetVersion("/assets/images/logos/jpi-inverted.png"); ?>" alt="Jahidul Pabel Islam's Logo" />
                        </div>
                    </div>

                    <div class="row home-intro">
                        <div class="container">
                            <p>Welcome to my portfolio, thanks for clicking on my website!</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="container">
                            <p>Most of my drive and passion lives in developing all kinds of software from websites to applications.</p>
                            <p>Always looking into new or upcoming languages and frameworks to learn how to improve ongoing projects while also expanding my knowledge.</p>
                            <p>
                                Currently working as a Web Developer at
                                <a class="link" href="https://d3r.com/" title="Link to D3R website." target="_blank" rel="noopener noreferrer">D3R</a>.
                            </p>
                            <p>
                                Reside in
                                <a class="link" href="https://goo.gl/maps/KEJgpYCxm6x" title="Link to map of Bognor Regis." target="_blank" rel="noopener noreferrer">West Sussex</a>, down in the south coast of England.
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="container">
                            <p>
                                Here you will be able to look at all the <a class="link" href="<?php $site->echoURL("projects"); ?>">work</a>
                                 I have completed over the last <?php echo $yearsSinceStarted; ?> years, <a class="link" href="<?php $site->echoURL("about"); ?>">learn about me</a> also
                                <a class="link" href="<?php $site->echoURL("contact"); ?>">contact me</a> for any enquiries or to just provide feedback.
                            </p>
                            <p>So, have a look around my ever-evolving portfolio, as I'm always looking to find different ways to improve my site by experimenting with new technologies and ideas here.</p>
                        </div>
                    </div>
                </section>

                <section class="row row--orange">
                    <div class="container">
                        <div class="workflow">
                            <?php
                            $workflowItems = [
                                [
                                    "heading" => "Design",
                                    "icon" => "design-icon.png",
                                    "imageAlt" => "A image of a paintbrush on a desktop computer",
                                    "description" => "<p>
                                        My work only starts after the designer hands over finished designs.<br />
                                        I mainly work from PSD's or flat image files designs.<br />
                                        This is where I turn designs into pixel perfect sites/apps.
                                    </p>",
                                ],
                                [
                                    "heading" => "Responsive",
                                    "icon" => "responsive-icon.png",
                                    "imageAlt" => "A image of various sized devices: Desktop computer, tablet &amp; mobile phone",
                                    "description" => "<p>
                                        Aim to make all sites/apps usable on many different sized devices.<br />
                                        By approach the styling form a mobile first point of view
                                    </p>",
                                ],
                                [
                                    "heading" => "Code",
                                    "icon" => "code-icon.png",
                                    "imageAlt" => "A image showing code",
                                    "description" => "<p>
                                        I tend to develop custom and bespoke systems.<br />
                                        But if the project requires I can use various frameworks or libraries to fulfill the necessary product.
                                    </p>",
                                ],
                            ];

                            foreach ($workflowItems as $workflowItem) {
                                ?>
                                <div class="workflow__item">
                                    <h3 class="row__heading"><?php echo $workflowItem["heading"]; ?></h3>
                                    <img class="workflow__image" src="<?php echoWithAssetVersion("/assets/images/" . $workflowItem["icon"]); ?>" alt="<?php echo $workflowItem["imageAlt"]; ?>" />
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

                <section class="row latest-projects">
                    <h3 class="row__heading">Latest Projects</h3>

                    <i class="latest-projects__loading fas fa-spinner fa-spin fa-3x"></i>

                    <div class="slide-show latest-projects__slide-show" id="latest-projects">
                        <div class="slide-show__viewport">
                            <button type="button" class="slide-show__nav" data-slide-show-id="#latest-projects" data-direction="previous" data-colour="">
                                <span class="screen-reader-text">Navigate to the previous slide/image.</span>
                                <?php renderFile("/assets/images/previous.svg"); ?>
                            </button>
                            <div class="slide-show__slides" data-slide-show-id="#latest-projects"></div>
                            <button type="button" class="slide-show__nav" data-slide-show-id="#latest-projects" data-direction="next" data-colour="">
                                <span class="screen-reader-text">Navigate to the next slide/image.</span>
                                <?php renderFile("/assets/images/next.svg"); ?>
                            </button>
                        </div>
                        <div class="slide-show__bullets"></div>
                    </div>

                    <p class="feedback feedback--error latest-projects__error"></p>

                    <a class="button" href="<?php $site->echoURL("projects"); ?>">View More Work</a>
                </section>

                <section class="row row--dark-green">
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
$page->addJSTemplate(
    "slide",
    <<<HTML
    <div class="slide-show__slide latest-project" id="slide-{{ id }}" data-slide-colour="{{ colour }}">
        <img class="slide-show__image latest-project__image" src="{{ images.0.url }}" alt="Screen shot of {{ name }} Project" />
        <div class="latest-project__info">
            <div class="latest-project__info-content latest-project__info-content--{{ colour }}">
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
    <button type="button" class="slide-show__bullet slide-show__bullet--{{ colour }}" data-slide-show-id="#latest-projects" data-slide-id="#slide-{{ id }}">
    </button>
    HTML
);

$page->addJSGlobal("config", "projectsPerPage", 3);
$page->addJSGlobal("config", "jpiAPIEndpoint", removeTrailingSlash($site::getAPIEndpoint()));

$similarLinks = [
    [
        "title" => "Projects",
        "url" => "projects",
        "text" => "View My Work",
        "colour" => "purple",
    ],
    [
        "title" => "About",
        "url" => "about",
        "text" => "Learn About Me",
        "colour" => "red",
    ],
];
$page->renderFooter($similarLinks);
