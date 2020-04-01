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

class Renderer {

    private $page;

    public function __construct(Page $page) {
        $this->page = $page;
    }

    private static function trim(string $contents): string {
        return str_replace("\n", "", trim($contents));
    }

    /**
     * Include the common html head for page/site
     */
    public function renderHTMLHead() {
        $pageId = $this->page->id;
        $title = $this->page->headTitle ?? $this->page->title ?? "";
        $desc = $this->page->headDesc ?? $this->page->desc ?? "";

        include_once(ROOT . "/partials/head.php");
    }

    /**
     * Include the common canonical urls meta elements for page/site
     */
    public function renderCanonicalURLs() {
        $pagination = $this->page->pagination ?? [];
        $currentURL = $this->page->currentURL;

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
        $pageId = $this->page->id;
        $currentURL = $this->page->currentURL;

        $defaultTint = "dark";

        $navTint = $this->page->navTint ?? $defaultTint;
        $navTint = in_array($navTint, Site::VALID_NAV_TINTS) ? $navTint : $defaultTint;

        include_once(ROOT . "/partials/nav.php");
    }

    /**
     * Include the common html header content for page/site
     */
    public function renderHeader() {
        $pageId = $this->page->id;
        $title = $this->page->headerTitle ?? $this->page->title ?? "";
        $desc = $this->page->headerDesc ?? $this->page->desc ?? "";

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

    public function renderInlineJS() {
        $jsGlobals = $this->page->jsGlobals;
        $inlineJS = $this->page->inlineJS;
        $onLoadInlineJS = $this->page->onLoadInlineJS;

        $deferredStylesheets = $this->page->deferredStylesheets;
        if (count($deferredStylesheets)) {
            $deferredStylesheetsString = json_encode($deferredStylesheets);
            $onLoadInlineJS = "jpi.helpers.loadStylesheets({$deferredStylesheetsString});" . $onLoadInlineJS;
        }

        if (empty($jsGlobals) && empty($inlineJS) && empty($onLoadInlineJS)) {
            return;
        }

        $js = "";

        if (!empty($jsGlobals)) {
            $js .= "window.jpi = window.jpi || {};";
            foreach ($jsGlobals as $globalName => $vars) {
                $jsVars = json_encode($vars);
                $js .= "window.jpi.{$globalName} = {$jsVars};";
            }
        }

        if (!empty($inlineJS)) {
            $js .= $inlineJS;
        }

        if (!empty($onLoadInlineJS)) {
            $js .= "jQuery(document).on('ready', function() {{$onLoadInlineJS}});";
        }

        $js = self::trim($js);
        echo <<<HTML
            <script type="application/javascript">{$js}</script>
            HTML;
    }

    public function renderScripts() {
        $scripts = $this->page->scripts;

        if (empty($scripts)) {
            return;
        }

        foreach ($scripts as $script) {
            $src = addAssetVersion($script["src"], $script["version"]);
            echo "<script src='{$src}' type='application/javascript'></script>";
        }
    }

    public function renderJSTemplates() {
        $jsTemplates = $this->page->jsTemplates;

        if (empty($jsTemplates)) {
            return;
        }

        foreach ($jsTemplates as $name => $template) {
            $template = self::trim($template);
            echo <<<HTML
                <script type="text/template" id="{$name}-template">{$template}</script>
                HTML;
        }
    }

}
