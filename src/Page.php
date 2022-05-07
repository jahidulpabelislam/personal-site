<?php

namespace App;

use Exception;

class Page {

    /**
     * @var Site
     */
    private $site;

    /**
     * @var Renderer
     */
    private $renderer;

    private $data = [];

    private static $instance;

    private function __construct() {
        $this->site = Site::get();
        $this->renderer = new Renderer($this);

        $filePath = realpath(dirname($_SERVER["SCRIPT_FILENAME"]));
        if ($filePath !== realpath(PUBLIC_ROOT)) {
            $this->id = basename($filePath);
        } else {
            $this->id = "home";
        }
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
     * @throws \Exception
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
        $oldValue = $this->data[$field] ?? null;

        $this->data[$field] = $value;

        if ($field === "id" && $oldValue !== $value) {
            $this->setUpGlobalPageData();
            $this->addScripts($this->getScriptsForPage($value));
        }
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

    private function getStylesheetsForPage(string $pageId): array {
        return [];
    }

    public function getDeferredStylesheetsForPage(string $pageId): array {
        $extension = $this->site->useDevAssets() ? "css" : "min.css";

        $stylesheets = [
            ["src" => "/assets/css/global.$extension"],
        ];

        $pageScript = new File("/assets/css/$pageId.$extension");
        if ($pageScript->exists()) {
            $stylesheets[] = ["src" => $pageScript->getPath()];
        }

        // Only some pages use Font Awesome, so only add if it uses it
        $pagesUsingFA = [
            "home", "portfolio", "about", "contact",
        ];
        if (in_array($pageId, $pagesUsingFA)) {
            $stylesheets[] = [
                "src" => "/assets/css/third-party/font-awesome.min.css",
                "version" => "5.10.0",
            ];
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

    private function setUpGlobalPageData(): void {
        $pageId = $this->data["id"];
        $url = "/";

        $filePath = realpath(dirname($_SERVER["SCRIPT_FILENAME"]));
        if ($filePath !== realpath(PUBLIC_ROOT)) {
            $url = dirname($_SERVER["SCRIPT_NAME"]);
        }

        $this->data["indexed"] = $this->site->isProduction();
        $this->data["currentURL"] = $this->site->makeURL($url, false);
        $this->data["inlineStylesheets"] = $this->getInlineStylesheetsForPage($pageId);
        $this->data["stylesheets"] = $this->getStylesheetsForPage($pageId);
        $this->data["deferredStylesheets"] = $this->getDeferredStylesheetsForPage($pageId);
        $this->data["jsGlobals"] = [
            "breakpoints" => load(JPI_SITE_ROOT . "/config/breakpoints.json", false)->getArray(),
        ];
        $this->data["scripts"] = [];
        $this->data["inlineJS"] = "";
        $this->data["onLoadInlineJS"] = "";
        $this->data["jsTemplates"] = [];
    }

    public function addPageData(array $newPageData): void {
        $this->data = array_replace_recursive($this->data, $newPageData);
    }

    public function getFromPageData(string $field) {
        return $this->data[$field] ?? null;
    }

    public function addJSGlobal(string $global, ?string $key, $value): void {
        if ($key) {
            $this->data["jsGlobals"][$global][$key] = $value;
        }
        else {
            $this->data["jsGlobals"][$global] = $value;
        }
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
