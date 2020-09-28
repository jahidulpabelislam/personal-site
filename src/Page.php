<?php

class Page {

    private $site;
    private $data;

    private $renderer;

    private static $instance;

    private function __construct() {
        $this->site = Site::get();

        $this->data = $this->getGlobalPageData();
        $this->addScripts($this->getScriptsForPage($this->data["id"]));

        $this->renderer = new Renderer($this);
    }

    public static function get(): Page {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * @param $method string
     * @param $arguments array
     * @return mixed
     * @throws Exception
     */
    public function __call(string $method, array $arguments) {
        if (strpos($method, "render") === 0 && method_exists($this->renderer, $method)) {
            return call_user_func_array([$this->renderer, $method], $arguments);
        }

        throw new Exception("No method found for {$method}");
    }

    public function __get(string $field) {
        return $this->getFromPageData($field);
    }

    public function __set(string $field, $value) {
        $this->data[$field] = $value;
    }

    public function __isset(string $field): bool {
        if (array_key_exists($field, $this->data)) {
            $value = $this->getFromPageData($field);
            return isset($value);
        }

        return false;
    }

    private function getInlineStylesheetsForPage(string $pageId): array {
        if ($pageId === "links") {
            return [];
        }

        return [
            "/assets/css/above-the-fold." . ($this->site->getIsDebug() ? "css" : "min.css"),
        ];
    }

    private function getStylesheetsForPage(string $pageId): array  {
        if ($pageId === "links") {
            return [
                "/assets/css/links." . ($this->site->getIsDebug() ? "css" : "min.css"),
            ];
        }

        return [];
    }

    /**
     * Get the page specific stylesheet/css or the default
     * @param $pageId string
     * @return string
     */
    private function getDeferredPageStylesheet(string $pageId): string {
        $cssDir = "/assets/css";
        $cssExtension = $this->site->getIsDebug() ? "css" : "min.css";

        // Some pages (like `Links`) may use its own css file
        // so figure out if one exists to use, else use the main one
        $cssSrc = "{$cssDir}/{$pageId}.{$cssExtension}";
        if (!(new File($cssSrc))->exists()) {
            $cssSrc = "{$cssDir}/main.{$cssExtension}";
        }

        return addAssetVersion($cssSrc);
    }

    public function getDeferredStylesheetsForPage(string $pageId): array {
        if ($pageId === "links") {
            return [];
        }

        $stylesheets = [
            $this->getDeferredPageStylesheet($pageId)
        ];

        // Only some pages use Font Awesome, so only add if it uses it
        $pagesUsingFA = [
            "home", "projects", "about", "contact",
        ];
        if (in_array($pageId, $pagesUsingFA)) {
            $stylesheets[] = addAssetVersion("/assets/css/font-awesome.min.css", "5.10.0");
        }

        return $stylesheets;
    }

    private function getScriptsForPage(string $pageId): array {
        $directory = "/assets/js";
        $extension = $this->site->getIsDebug() ? "js" : "min.js";

        // Some pages (like `Links`) may use its own JS file
        // so figure out if one exists to use, else use the main one
        $path = "{$directory}/{$pageId}.{$extension}";
        if (!(new File($path))->exists()) {
            $path = "{$directory}/main.{$extension}";
        }

        return [["src" => $path]];
    }

    private function getGlobalPageData(): array {
        $pageId = "home";
        $url = "/";

        $filePath = realpath(dirname($_SERVER["SCRIPT_FILENAME"]));
        if ($filePath !== ROOT) {
            $pageId = basename($filePath);

            $path = dirname($_SERVER["SCRIPT_NAME"]);
            $url = turnPathToURL($path);
        }

        return [
            "id" => $pageId,
            "currentURL" => $this->site->getURL($url, false),
            "inlineStylesheets" => $this->getInlineStylesheetsForPage($pageId),
            "stylesheets" => $this->getStylesheetsForPage($pageId),
            "deferredStylesheets" => $this->getDeferredStylesheetsForPage($pageId),
            "jsGlobals" => [
                "css" => ["tabletWidth" => 768],
            ],
            "scripts" => [],
            "inlineJS" => "",
            "onLoadInlineJS" => "",
            "jsTemplates" => [],
        ];
    }

    public function addPageData(array $newPageData) {
        $this->data = array_replace_recursive($this->data, $newPageData);
    }

    public function getFromPageData(string $field) {
        return $this->data[$field] ?? null;
    }

    public function addJSGlobal(string $global, string $key, $value) {
        $this->data["jsGlobals"][$global][$key] = $value;
    }

    public function addInlineJS(string $code, bool $isOnLoad = false) {
        $code = trim($code);
        if ($isOnLoad) {
            $this->data["onLoadInlineJS"] .= $code;
        }
        else {
            $this->data["inlineJS"] .= $code;
        }
    }

    public function addScript($src, $version = false) {
        $this->data["scripts"][] = ["src" => $src, "version" => $version];
    }

    public function addScripts(array $scripts) {
        foreach ($scripts as $script) {
            $src = $script["src"];
            $version = $script["ver"] ?? false;
            $this->addScript($src, $version);
        }
    }

    public function addJSTemplate(string $name, string $template) {
        $this->data["jsTemplates"][$name] = $template;
    }

}
