<?php

use JPI\Site;

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

namespace App;

class Renderer {

    private static function trim(string $contents): string {
        return str_replace("\n", "", trim($contents));
    }

    /**
     * @var Page
     */
    private $page;

    public function __construct(Page $page) {
        $this->page = $page;
    }

    /**
     * @param string $method
     * @param array $arguments
     * @throws Exception
     */
    public function __call(string $method, array $arguments) {
        $partial = substr($method, 6); // Remove 'render'
        $partial = preg_replace("/\B([A-Z])/", "-$1", $partial); // Convert 'CanonicalUrls' to 'Canonical-Urls'
        $partial = strtolower($partial); // Convert 'Canonical-Urls' to 'canonical-urls'
        $file = new File(ROOT . "/partials/$partial.php", false);
        if ($file->exists()) {
            $file->include();
            return;
        }

        throw new Exception("No method found for $method");
    }

    public function renderHtmlStart(): void {
        echo <<<HTML
<!DOCTYPE html>
<html lang="en-GB">
HTML;
    }

    public function renderHtmlEnd(): void {
        echo <<<HTML
</html>
HTML;
    }

    public function renderPageStart(): void {
        echo <<<HTML
<body>
    <div class="page-container">
HTML;
    }

    public function renderPageEnd(): void {
        echo "</div>";
        $this->page->renderJSTemplates();
        $this->page->renderScripts();
        $this->page->renderInlineJS();
        echo "</body>";
    }

    public function renderContentStart(): void {
        echo <<<HTML
<main class="main-content">
    <div class="main-content__inner">
HTML;
    }

    public function renderContentEnd(): void {
        echo <<<HTML
    </div>
</main>
HTML;
    }

    public function renderInlineJS(): void {
        $jsGlobals = $this->page->jsGlobals;
        $inlineJS = $this->page->inlineJS;
        $onLoadInlineJS = $this->page->onLoadInlineJS;

        $deferredStylesheets = $this->page->deferredStylesheets;
        if (count($deferredStylesheets)) {
            $deferredStylesheetsString = json_encode($deferredStylesheets);
            $onLoadInlineJS = "jpi.helpers.loadStylesheets($deferredStylesheetsString);" . $onLoadInlineJS;
        }

        if (empty($jsGlobals) && empty($inlineJS) && empty($onLoadInlineJS)) {
            return;
        }

        $js = "";

        if (!empty($jsGlobals)) {
            $js .= "window.jpi = window.jpi || {};";
            foreach ($jsGlobals as $globalName => $vars) {
                $jsVars = json_encode($vars);
                $js .= "window.jpi.$globalName = $jsVars;";
            }
        }

        if (!empty($inlineJS)) {
            $js .= $inlineJS;
        }

        if (!empty($onLoadInlineJS)) {
            $js .= "jQuery(function() {{$onLoadInlineJS}});";
        }

        $js = self::trim($js);
        echo <<<HTML
            <script type="application/javascript">$js</script>
            HTML;
    }

    public function renderScripts(): void {
        $scripts = $this->page->scripts;

        if (empty($scripts)) {
            return;
        }

        foreach ($scripts as $script) {
            $src = Site::asset($script["src"], $script["version"]);
            echo <<<HTML
                <script src="$src" type="application/javascript"></script>
                HTML;
        }
    }

    public function renderJSTemplates(): void {
        $jsTemplates = $this->page->jsTemplates;

        if (empty($jsTemplates)) {
            return;
        }

        foreach ($jsTemplates as $name => $template) {
            $template = self::trim($template);
            echo <<<HTML
                <script type="text/template" id="$name-template">$template</script>
                HTML;
        }
    }

}
