<?php

namespace App;

class Page {

    /**
     * @var Site
     */
    private $site;

    /**
     * @var Renderer
     */
    private $renderer;

    private $data;

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
        if (strpos($method, "render") === 0 && is_callable([$this->renderer, $method])) {
            return call_user_func_array([$this->renderer, $method], $arguments);
        }

        throw new Exception("No method found for $method");
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
        return [
            "/assets/css/above-the-fold." . ($this->site->useDevAssets() ? "css" : "min.css"),
        ];
    }

    private function getStylesheetsForPage(string $pageId): array  {
        return [];
    }

    /**
     * Get the page specific stylesheet/css or the default
     * @param $pageId string
     * @return string
     */
    private function getDeferredPageStylesheet(string $pageId): string {
        $cssExtension = $this->site->useDevAssets() ? "css" : "min.css";

        return Site::asset("/assets/css/main.$cssExtension");
    }

    public function getDeferredStylesheetsForPage(string $pageId): array {
        $stylesheets = [
            $this->getDeferredPageStylesheet($pageId),
        ];

        // Only some pages use Font Awesome, so only add if it uses it
        $pagesUsingFA = [
            "home", "projects", "about", "contact",
        ];
        if (in_array($pageId, $pagesUsingFA)) {
            $stylesheets[] = Site::asset("/assets/css/font-awesome.min.css", "5.10.0");
        }

        return $stylesheets;
    }

    private function getScriptsForPage(string $pageId): array {
        $extension = $this->site->useDevAssets() ? "js" : "min.js";

        $scripts = [
            ["src" => "/assets/js/global.$extension"],
        ];

        $pageScript = new File("/assets/js/$pageId.$extension");
        if ($pageScript->exists()) {
            $scripts[] = ["src" => $pageScript->getPath()];
        }

        return $scripts;
    }

    private function getGlobalPageData(): array {
        $pageId = "home";
        $url = "/";

        $filePath = realpath(dirname($_SERVER["SCRIPT_FILENAME"]));
        if ($filePath !== realpath(PUBLIC_ROOT)) {
            $pageId = basename($filePath);

            $url = dirname($_SERVER["SCRIPT_NAME"]);
        }

        return [
            "id" => $pageId,
            "currentURL" => $this->site->makeURL($url, false),
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

    public function addPageData(array $newPageData): void {
        $this->data = array_replace_recursive($this->data, $newPageData);
    }

    public function getFromPageData(string $field) {
        return $this->data[$field] ?? null;
    }

    public function addJSGlobal(string $global, string $key, $value): void {
        $this->data["jsGlobals"][$global][$key] = $value;
    }

    public function addInlineJS(string $code, bool $isOnLoad = false): void {
        $code = trim($code);
        if ($isOnLoad) {
            $this->data["onLoadInlineJS"] .= $code;
        }
        else {
            $this->data["inlineJS"] .= $code;
        }
    }

    public function addScript(string $src, string $version = null): void {
        $this->data["scripts"][] = ["src" => $src, "version" => $version];
    }

    public function addScripts(array $scripts): void {
        foreach ($scripts as $script) {
            $src = $script["src"];
            $version = $script["ver"] ?? null;
            $this->addScript($src, $version);
        }
    }

    public function addJSTemplate(string $name, string $template): void {
        $this->data["jsTemplates"][$name] = $template;
    }
}
