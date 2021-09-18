<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/../bootstrap.php");

$site = site();
$page = page();

$name = $site::NAME;
$job = $site::JOB;

$projectsPerPage = 6;

$apiRequestParams = [
    "limit" => $projectsPerPage,
];

$search = $_GET["search"] ?? "";
$pageNum = $_GET["page"] ?? 1;

$headTitle = "Projects";

$page->addJSGlobal("projects", "titleStart", $headTitle);

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

$headDescription = "Projects $name has developed, a $job based at Bognor Regis, West Sussex down by the South Coast of England.";

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

if (!count($apiRes["data"] ?? [])) {
    http_response_code(404);
    include(PUBLIC_ROOT . "/error/index.php");
    exit();
}

$page->addJSGlobal("projects", "apiResponse", $apiRes);

$pageData = [
    "headTitle" => $headTitle,
    "headDescription" => $headDescription,
    "headerTitle" => "My Projects",
    "headerDescription" => "See My Skills In Action",
    "pagination" => [
        "page" => $apiMeta["page"] ?? 1,
        "hasPreviousPage" => $apiMeta["has_previous_page"] ?? false,
        "hasNextPage" => $apiMeta["has_next_page"] ?? false,
    ],
];
$page->addPageData($pageData);

$page->renderHtmlStart();
$page->renderHead();
$page->renderPageStart();
$page->renderNav();
$page->renderHeader();
$page->renderContentStart();
?>

<section class="row row--alt projects">
    <div class="container">
        <p>Here you can find pieces of work I have completed throughout my years as a developer.</p>

        <form class="search-form">
            <div class="search-form__inner">
                <label for="search" class="screen-reader-text">Search for projects.</label>
                <input type="text" class="input search-form__input" id="search" value="<?php echo $search; ?>" placeholder="Search for projects..." />
                <button type="submit" class="button search-form__submit">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </form>

        <p class="projects__error"></p>
        <i class="projects__loading fas fa-spinner fa-spin fa-3x"></i>
        <div class="projects__items"></div>
        <ul class="pagination projects__pagination"></ul>

        <input type="hidden" class="js-page" value="<?php echo $pageNum; ?>" />
    </div>
</section>

<div class="modal expanded-slide-show" role="dialog" aria-modal="true" aria-hidden="true" hidden="hidden">
    <button type="button" class="button expanded-slide-show__close js-modal-close" aria-label="Close">X</button>

    <div class="expanded-slide-show__image-container">
        <img class="expanded-slide-show__image expanded-slide-show__image--active" src="<?php echo $site::asset("/assets/images/blank.svg"); ?>" alt="Expanded Image of slide" />
    </div>

    <div class="expanded-slide-show__image-container">
        <img class="expanded-slide-show__image" src="<?php echo $site::asset("/assets/images/blank.svg"); ?>" alt="Expanded Image of slide" />
    </div>

    <div class="expanded-slide-show__controls">
        <div class="expanded-slide-show__navigations">
            <button type="button" class="expanded-slide-show__nav" data-direction="previous">
                <span class="screen-reader-text">Navigate to the previous slide/image.</span>
                <?php renderFile("/assets/images/previous.svg"); ?>
            </button>
            <button type="button" class="expanded-slide-show__nav" data-direction="next">
                <span class="screen-reader-text">Navigate to the next slide/image.</span>
                <?php renderFile("/assets/images/next.svg"); ?>
            </button>
        </div>

        <div class="expanded-slide-show__bullets"></div>

        <p class="expanded-slide-show__counter">
            <span class="expanded-slide-show__current-count"></span>/<span class="expanded-slide-show__total-count"></span>
        </p>
    </div>
</div>

<div class="modal detailed-project" role="dialog" aria-modal="true" aria-labelledby="detailed-project-title" aria-describedby="detailed-project-description" aria-hidden="true" hidden="hidden">
    <div class="modal__content">
        <button type="button" class="button modal__close js-modal-close" aria-label="Close">X</button>

        <h1 class="modal__heading" id="detailed-project-title"></h1>

        <div class="project__skills"></div>

        <div class="project__meta">
            <p class="project__type project__type--"></p>
            <time class="project__date">
                <?php echo date("Y"); ?>
            </time>
        </div>

        <div class="project__description" id="detailed-project-description"></div>
        <div class="project__links"></div>

        <div class="slide-show project__slide-show" id="detailed-project-slide-show">
            <div class="slide-show__viewport">
                <button type="button" class="slide-show__nav" data-slide-show-id="#detailed-project-slide-show" data-direction="previous">
                    <span class="screen-reader-text">Navigate to the previous slide/image.</span>
                    <?php renderFile("/assets/images/previous.svg"); ?>
                </button>
                <div class="slide-show__slides js-expandable-image-group" data-slide-show-id="#detailed-project-slide-show"></div>
                <button type="button" class="slide-show__nav" data-slide-show-id="#detailed-project-slide-show" data-direction="next">
                    <span class="screen-reader-text">Navigate to the next slide/image.</span>
                    <?php renderFile("/assets/images/next.svg"); ?>
                </button>
            </div>
            <div class="slide-show__bullets"></div>
        </div>
    </div>
</div>

<?php
$page->addJSTemplate(
    "project",
    <<<HTML
    <article class="project" id="project-{{ id }}">
        <div class="project__slide-show slide-show" id="slide-show-{{ id }}">
            <div class="slide-show__viewport">
                <div class="slide-show__slides js-expandable-image-group" data-slide-show-id="#slide-show-{{ id }}"></div>
            </div>
        </div>
    
        <p class="project__type">{{ type }}</p>
    
        <div class="project__header">
            <h3 class="project__title">{{ name }}</h3>
            <time class="project__date">{{ date }}</time>
        </div>
    
        <div class="project__description">{{ short_description }}</div>
    
        <div class="project__footer">
            <div class="project__links"></div>
            <button type="button" class="button project__read-more" data-project-id="{{ id }}">
                Read More
            </button>
        </div>
    </article>
    HTML
);

$page->addJSTemplate(
    "slide",
    <<<HTML
    <div class="slide-show__slide" id="slide-{{ id }}">
        <img class="slide-show__image js-expandable-image" src="{{ url }}" alt="Screen shot of project" data-slide-show-id="#slide-show-{{ project_id }}" data-slide-colour="{{ colour }}" />
    </div>
    HTML
);

$page->addJSTemplate(
    "slide-bullet",
    <<<HTML
    <button type="button" class="slide-show__bullet" data-slide-show-id="{{ slideShowId }}" data-slide-id="#slide-{{ id }}">
    </button>
    HTML
);

$page->addJSGlobal("projects", "perPage", $projectsPerPage);
$page->addJSGlobal("projects", "apiEndpoint", $site::removeTrailingSlash($site::getAPIEndpoint()));

$similarLinks = [
    [
        "title" => "Contact",
        "url" => "/contact/",
        "text" => "Get in Touch",
    ],
    [
        "title" => "About",
        "url" => "/about/",
        "text" => "Learn About Me",
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
