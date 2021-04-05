<?php
$site = Site::get();
$page = Page::get();

$pageId = $page->id;
$currentURL = $page->currentURL;
?>

<nav class="nav">
    <div class="container nav__container">
        <div class="nav__header">
            <button type="button" class="nav__mobile-toggle">
                <span class="screen-reader-text">Toggle navigation</span>
                <span class="nav__menu-bar"></span>
                <span class="nav__menu-bar"></span>
                <span class="nav__menu-bar"></span>
            </button>
            <a class="nav__logo <?php if ($pageId === "home") {echo "nav__logo--active";} ?>" href="<?php echo $site->getURL(); ?>">
                <img src="<?php echo $site::asset("/assets/images/logo-v2.png"); ?>" alt="<?php echo $site::NAME; ?>'s Logo" />
            </a>
        </div>
        <div class="nav__links-container">
            <ul class="nav__links">
                <?php
                $links = [
                    [
                        "title" => "My Projects",
                        "url" => "/projects/",
                    ],
                    [
                        "title" => "Contact Me",
                        "url" => "/contact/",
                    ],
                    [
                        "title" => "About Me",
                        "url" => "/about/",
                    ],
                ];

                foreach ($links as $link) {
                    $linkTitle = $link["title"];

                    $url = $link["url"] ?? "/";
                    $fullURL = $site->getURL($url);

                    $classes = ["nav__link"];
                    if ($currentURL === $site->getURL($url, false)) {
                        $classes[] = "nav__link--active";
                    }

                    $class = implode(" ", $classes);
                    echo <<<HTML
                        <li class="nav__item">
                            <a class="{$class}" href="{$fullURL}" title="Link to {$linkTitle} Page">
                                {$linkTitle}
                            </a>
                        </li>
                        HTML;
                }
                ?>
            </ul>
        </div>
    </div>
</nav>
