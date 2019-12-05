<?php

class Page {

    private $site;
    private $data;

    private static $instance;

    public function __construct() {
        $this->site = Site::get();

        $this->data = $this->getGlobalPageData();
    }

    public static function get(): Page {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function getStylesheetsForPage(string $pageId): array {
        $stylesheets = [];

        // Only some pages use Font Awesome, so only add if it uses it
        $pagesUsingFA = [
            "home", "projects", "about", "contact",
        ];
        if (in_array($pageId, $pagesUsingFA)) {
            $stylesheets[] = addAssetVersion("/assets/css/third-party/font-awesome.min.css", "5.10.0");
        }

        $cssDir = $this->site->getIsDebug() ? "assets/css/jpi" : "assets/css";
        $cssExtension = $this->site->getIsDebug() ? "css" : "min.css";

        // Some pages (like `Links`) may use its own css file
        // so figure out if one exists to use, else use the main one
        $cssSrc = "/{$cssDir}/main.{$cssExtension}";
        if (file_exists(ROOT . "/{$cssDir}/{$pageId}.{$cssExtension}")) {
            $cssSrc = "/{$cssDir}/{$pageId}.{$cssExtension}";
        }
        $stylesheets[] = addAssetVersion($cssSrc);

        return $stylesheets;
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

        $globalPageData = [
            "id" => $pageId,
            "currentURL" => $this->site->getURL($url, false),
            "jsGlobals" => [
                "css" => ["tabletWidth" => 768],
            ],
            "jsScripts" => [],
            "stylesheets" => $this->getStylesheetsForPage($pageId),
        ];

        return $globalPageData;
    }

    public function addPageData(array $newPageData) {
        $this->data = array_merge($this->data, $newPageData);
    }

    public function getFromPageData(string $field) {
        return $this->data[$field] ?? null;
    }

    public function addJSGlobal(string $global, string $key, $value) {
        $this->data["jsGlobals"][$global][$key] = $value;
    }

    public function addJSScript($script, $ver = false) {
        $script = addAssetVersion($script, $ver);
        $this->data["jsScripts"][] = $script;
    }

    public function addJSScripts(array $scripts) {
        foreach ($scripts as $script) {
            $file = $script["file"];
            $ver = $script["ver"] ?? false;
            $this->addJSScript($file, $ver);
        }
    }

    public function __call($method, $arguments) {
        if (strpos($method, "render") === 0) {

            $renderer = new Renderer($this);
            if (method_exists($renderer, $method)) {
                return call_user_func_array([$renderer, $method], $arguments);
            }
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

}
