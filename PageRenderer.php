<?php
/**
 * A helper class to use throughout the site.
 * To aid in including common partials for all pages.
 * And handles any page data associated with the page and passed to where needed
 *
 * Developed so it can be used in multiple sites.
 *
 * PHP version 7.1+
 *
 * @version 1.1.2
 * @since Class available since Release: v4.2.0
 * @author Jahidul Pabel Islam <me@jahidulpabelislam.com>
 * @copyright 2010-2019 JPI
 */

class PageRenderer {

    public $site;
    private $pageData = [];

    private static $instance;

    public function __construct() {
        $this->site = Site::get();
        $this->addGlobalPageData();
    }

    public static function get(): PageRenderer {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function addGlobalPageData() {
        $pageId = "home";
        $url = "/";

        $filePath = realpath(dirname($_SERVER["SCRIPT_FILENAME"]));
        if ($filePath !== ROOT) {
            $pageId = basename($filePath);

            $path = dirname($_SERVER["SCRIPT_NAME"]);
            $url = $this->site::turnPathToURL($path);
        }

        $globalPageData = [
            "pageId" => $pageId,
            "currentURL" => $this->site->getURL($url, false),
            "jsGlobals" => [],
            "jsScripts" => [],
        ];

        $this->addPageData($globalPageData);
    }

    public function addToPageData(string $field, $value) {
        if (is_string($value)) {
            $value = trim($value);
        }

        $this->pageData[$field] = $value;
    }

    public function addToJSGlobals(string $field, $value) {
        if (is_string($value)) {
            $value = trim($value);
        }

        $this->pageData['jsGlobals'][$field] = $value;
    }

    public function addJSScript(string $script) {
        if (is_string($script)) {
            $value = trim($script);
        }

        $this->pageData['jsScripts'][] = $script;
    }

    public function addPageData(array $fields) {
        $this->pageData = array_merge($this->pageData, $fields);
    }

    public function getFromPageData(string $field, $defaultValue = "") {
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

    /**
     * Include the common cookie banner content for page/site
     */
    public function renderJSGlobals() {
        $jsGlobalsArr = $this->getFromPageData("jsGlobals", []);

        if (empty($jsGlobalsArr)) {
            return;
        }

        $jsGlobals = json_encode($jsGlobalsArr);
        echo "
            <script>
                window.jpi = window.jpi || {};
                window.jpi.config = {$jsGlobals};
            </script>";
    }

    public function renderJSScripts() {
        $scripts = $this->getFromPageData("jsScripts", []);

        if (empty($scripts)) {
            return;
        }

        foreach ($scripts as $script) {
            // Commented out as it fails for Google Maps as it already has params.
            // TODO: But add this back in when figured out nice way to append to current params
            // $script = $this->site::addAssetVersion($script);
            echo "<script src='{$script}' type='text/javascript'></script>";
        }
    }

    public function getStylesheetForPage(): string {
        $cssDir = $this->site->isDebug() ? "assets/css/jpi" : "assets/css";
        $cssExtension = $this->site->isDebug() ? "css" : "min.css";

        $pageId = $this->getFromPageData("pageId");

        $cssSrc = "/{$cssDir}/main.{$cssExtension}";
        if (file_exists(ROOT . "/{$cssDir}/{$pageId}.{$cssExtension}")) {
            $cssSrc = "/{$cssDir}/{$pageId}.{$cssExtension}";
        }
        $cssSrc = $this->site::addAssetVersion($cssSrc);

        return $cssSrc;
    }
}

PageRenderer::get();
