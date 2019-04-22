<?php

class PageRenderer {

    public $site;
    private $pageData = [];

    private static $instance = null;

    public function __construct() {
        $this->site = Site::get();
        $this->addGlobalPageData();
    }

    public static function get(): PageRenderer {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function addGlobalPageData() {
        $pageId = "home";
        $url = "/";

        $filePath = dirname($_SERVER["SCRIPT_FILENAME"]);
        if ($filePath !== ROOT) {
            $pageId = basename($filePath);
            $url = dirname($_SERVER["SCRIPT_NAME"]);
        }

        $globalPageData =[
            "pageId" => $pageId,
            "currentURL" => $this->site->getURL($url, false),
        ];

        $this->addPageData($globalPageData);
    }

    public function addToPageData($field, $value) {
        if (is_string($value)) {
            $value = trim($value);
        }

        $this->pageData[$field] = $value;
    }

    public function addPageData($fields) {
        $this->pageData = array_merge($this->pageData, $fields);
    }

    public function getFromPageData($field, $defaultValue = "") {
        return $this->pageData[$field] ?? $defaultValue;
    }

    /**
     * Include the common html head for page/site
     */
    public function renderHTMLHead() {
        $pageId = $this->getFromPageData("pageId");
        $title = $this->pageData["headTitle"] ?? $this->pageData["title"] ?? "";
        $desc = $this->pageData["headDesc"] ?? $this->pageData["desc"] ?? "";

        include_once(ROOT . "/partials/head.php");
    }

    /**
     * Include the common canonical urls meta elements for page/site
     */
    public function renderCanonicalURLs() {
        $pagination = $this->getFromPageData("pagination", []);
        $currentURL = $this->getFromPageData("currentURL");

        include_once(ROOT . "/partials/canonical-urls.php");
    }

    /**
     * Include the common favicons content for page/site
     */
    public function renderFavicons() {
        include_once(ROOT . "/partials/favicons.php");
    }

    /**
     * Include the common html nav content for page/site
     */
    public function renderNav() {
        $pageId = $this->getFromPageData("pageId");
        $currentURL = $this->getFromPageData("currentURL");

        $defaultTint = "dark";

        $navTint = $this->getFromPageData("navTint", $defaultTint);
        $navTint = in_array($navTint, Site::VALID_NAV_TINTS) ? $navTint : $defaultTint;

        include_once(ROOT . "/partials/nav.php");
    }

    /**
     * Include the common html header content for page/site
     */
    public function renderHeader() {
        $pageId = $this->getFromPageData("pageId");
        $title = $this->pageData["headerTitle"] ?? $this->pageData["title"] ?? "";
        $desc = $this->pageData["headerDesc"] ?? $this->pageData["desc"] ?? "";

        include_once(ROOT . "/partials/header.php");
    }

    /**
     * Include the common footer content for page/site
     */
    public function renderFooter(array $similarLinks = []) {
        include_once(ROOT . "/partials/footer.php");
    }

    /**
     * Include the common cookie banner content for page/site
     */
    public function renderCookieBanner() {
        include_once(ROOT . "/partials/cookie-banner.php");
    }
}

PageRenderer::get();
