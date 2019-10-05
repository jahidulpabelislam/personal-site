<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/classes/init.php");

$site = Site::get();
$page = Page::get();

$site::echoConfig();

$projectsPerPage = 6;

$apiRequestParams = [
    "limit" => $projectsPerPage,
];

$search = $_GET["search"] ?? "";
$pageNum = $_GET["page"] ?? 1;

$headTitle = "Projects";

$search = trim($search);
if (strlen($search) > 0) {
    $headTitle .= " with {$search}";
    $apiRequestParams["search"] = $search;
}

$pageNum = (int)$pageNum;
if ($pageNum > 1) {
    $headTitle .= " - Page {$pageNum}";
    $apiRequestParams["page"] = $pageNum;
}

$headDesc = "Projects Jahidul Pabel Islam has developed, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$projectsURL = $site::getAPIEndpoint("/projects/");

$requestParamsString = "";
if (count($apiRequestParams) > 0) {
    $requestParamsString = "?" . http_build_query($apiRequestParams, "", "&");
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $projectsURL . $requestParamsString);
curl_setopt(
    $ch, CURLOPT_HTTPHEADER, [
           'Accept: application/json',
       ]
);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 4); // Seconds

$apiRes = json_decode(curl_exec($ch), true);
curl_close($ch);

$apiMeta = $apiRes["meta"] ?? [];

$projectsCount = $apiMeta["count"] ?? count($apiRes["rows"] ?? []);
if ($projectsCount === 0) {
    http_response_code(404);
    include(ROOT . "/error/404/index.php");
    exit;
}

$pageData = [
    "headTitle" => $headTitle,
    "headDesc" => $headDesc,
    "headerTitle" => "My Projects",
    "headerDesc" => "See My Skills in Action in My Projects",
    "pagination" => [
        "page" => $apiMeta["page"] ?? 1,
        "has_previous_page" => $apiMeta["has_previous_page"] ?? false,
        "has_next_page" => $apiMeta["has_next_page"] ?? false,
    ],
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();
?>

                <section class="article">
                    <div class="container">

                        <p>Here you can find some pieces of work I have completed throughout my years as a developer.</p>
                        <p>
                            You can use the input below to find projects you want to have a look at.<br />
                            For example you can use names of technologies, frameworks or projects.
                        </p>

                        <form class="search-form">
                            <label for="search" class="screen-reader-text">Search for projects.</label>
                            <input type="text" class="input search-form__input" id="search" value="<?php echo $search; ?>" placeholder="Search for projects..." />
                            <button type="submit" class="btn btn--dark-blue search-form__submit">
                                <i class="fa fa-search"></i>
                            </button>
                        </form>

                        <p class="feedback feedback--error"></p>
                        <i class="projects__loading-img fas fa-spinner fa-spin fa-3x"></i>
                        <div class="projects js-all-projects"></div>
                        <ul class="pagination pagination--projects"></ul>

                        <input type="hidden" class="js-projects-page" value="<?php echo $pageNum; ?>" />
                    </div>
                </section>

                <div class="expanded-slide-show">
                    <div class="expanded-slide-show__image-container">
                        <img class="expanded-slide-show__image current" src="<?php echoWithAssetVersion("/assets/images/blank.svg"); ?>" alt="Expanded Image of slide" />
                    </div>

                    <div class="expanded-slide-show__image-container">
                        <img class="expanded-slide-show__image" src="<?php echoWithAssetVersion("/assets/images/blank.svg"); ?>" alt="Expanded Image of slide" />
                    </div>

                    <div class="expanded-slide-show__controls">
                        <div class="expanded-slide-show__navs">
                            <button type="button" class="js-expanded-slide-show-previous">
                                <img class="expanded-slide-show__nav" src="<?php echoWithAssetVersion("/assets/images/previous-white.svg"); ?>" alt="Arrow pointing to the right" aria-label="Click to View Previous Image" />
                            </button>
                            <button type="button" class="js-expanded-slide-show-next">
                                <img class="expanded-slide-show__nav" src="<?php echoWithAssetVersion("/assets/images/next-white.svg"); ?>" alt="Arrow pointing to the left" aria-label="Click to View Next Image" />
                            </button>
                        </div>

                        <div class="expanded-slide-show__bullets"></div>

                        <p class="expanded-slide-show__counter">
                            <span class="js-expanded-slide-show-current-count"></span>
                            <span>/</span>
                            <span class="js-expanded-slide-show-total-count"></span>
                        </p>
                    </div>

                    <button type="button" class="btn btn--red expanded-slide-show__close">X</button>
                </div>

                <div class="modal detailed-project">
                    <div class="modal__content">
                        <h4 class="modal__heading"></h4>

                        <div class="project__skills"></div>

                        <div class="project__meta">
                            <p class="project__type project__type--"></p>
                            <time class="project__date">
                                <?php echo date("Y"); ?>
                            </time>
                        </div>

                        <div class="project__description"></div>
                        <div class="project__links"></div>

                        <div class="project__slide-show slide-show" id="detailed-project__slide-show">
                            <div class="slide-show__viewpoint" data-slide-show-id="#detailed-project__slide-show">
                                <div class="slide-show__slides-container"></div>
                                <button type="button" class="js-move-slide slide-show__nav-button slide-show__nav--prev-button" data-slide-show-id="#detailed-project__slide-show" data-nav-direction="previous">
                                    <img class="slide-show__nav slide-show__nav--blue slide-show__nav-previous" src="<?php echoWithAssetVersion("/assets/images/previous-inverted.svg"); ?>" alt="Arrow pointing to the right" aria-label="Click to View Previous Image" />
                                </button>
                                <button type="button" class="js-move-slide slide-show__nav-button slide-show__nav--next-button" data-slide-show-id="#detailed-project__slide-show" data-nav-direction="next">
                                    <img class="slide-show__nav slide-show__nav--blue slide-show__nav-next" src="<?php echoWithAssetVersion("/assets/images/next-inverted.svg"); ?>" alt="Arrow pointing to the left" aria-label="Click to View Next Image" />
                                </button>
                            </div>
                            <div class="slide-show__bullets"></div>
                        </div>

                    </div>
                </div>

                <script type="text/template" id="tmpl-project-template">
                    <article class="project" id="project--{{ id }}">
                        <div class="project__slide-show slide-show" id="slide-show--{{ id }}">
                            <div class="slide-show__viewpoint" data-slide-show-id="#slide-show--{{ id }}">
                                <div class="slide-show__slides-container"></div>
                            </div>
                        </div>

                        <p class="project__type project__type--{{ colour }}">{{ type }}</p>

                        <div class="project__header">
                            <h4 class="project__title">{{ name }}</h4>
                            <time class="project__date">{{ date }}</time>
                        </div>

                        <div class="project__description">{{ short_description }}</div>

                        <div class="project__footer">
                            <div class="project__links"></div>
                            <button type="button" class="btn btn--{{ colour }} js-open-modal project__read-more project__read-more--{{ colour }}" data-project-id="{{ id }}">
                                Read More
                            </button>
                        </div>
                    </article>
                </script>

                <script type="text/template" id="tmpl-slide-template">
                    <div class="slide-show__slide" id="slide-{{ id }}">
                        <img class="slide-show__img js-expandable-image" src="<?php $site::echoProjectImageURL("{{ file }}"); ?>" alt="Screen shot of project" data-slide-show-id="#slide-show--{{project_id}}" data-slide-colour="{{colour}}" />
                    </div>
                </script>

                <script type="text/template" id="tmpl-slide-bullet-template">
                    <button type="button" class="slide-show__bullet slide-show__bullet--{{ colour }} js-slide-show-bullet" data-slide-show-id="{{ slide-show-id }}" data-slide-id="slide-{{ id }}">
                    </button>
                </script>

<?php
$page->addToJSGlobals("projectsPerPage", $projectsPerPage);
$page->addToJSGlobals("jpiAPIEndpoint", removeTrailingSlash($site::getAPIEndpoint()));

$similarLinks = [
    [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
        "colour" => "purple",
    ], [
        "title" => "About",
        "url" => "about",
        "text" => "Learn About Me",
        "colour" => "dark-green",
    ],
];
$page->renderFooter($similarLinks);
