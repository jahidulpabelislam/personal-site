<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
?>

        <!-- Navigation for site -->
        <nav class="nav nav--<?php echo $navTint; ?>">
            <div class="container nav__container">
                <div class="nav__header">
                    <button type="button" class="nav__mobile-toggle">
                        <span class="screen-reader-text">Toggle navigation</span>
                        <span class="menu-bar menu-bar--top"></span>
                        <span class="menu-bar menu-bar--middle"></span>
                        <span class="menu-bar menu-bar--bottom"></span>
                    </button>
                    <a href="<?php $site->echoURL(); ?>" class="nav__logo-container">
                        <img class="nav__logo <?php if ($pageId == "home") echo "current"; ?>" src="<?php $site->echoWithAssetVersion("/assets/images/logo.png"); ?>" alt="Jahidul Pabel Islam Logo" />
                    </a>
                </div>
                <div class="nav__links-container">
                    <ul class="nav__links">
                        <?php
                        $links = [
                            [
                                "title" => "Home",
                            ], [
                                "title" => "Projects",
                                "url" => "/projects/",
                            ], [
                                "title" => "Contact",
                                "url" => "/contact/",
                            ], [
                                "title" => "About",
                                "url" => "/about/",
                            ],
                        ];

                        foreach ($links as $link) {
                            $linkTitle = $link["title"];

                            $url = $link["url"] ?? "/";
                            $url = strtolower($url);
                            $fullURL = $site->getURL($url);

                            $classes = "nav-item__link";
                            if ($currentURL === $site->getURL($url, false)) {
                                $classes .= " active";
                            }

                            echo "<li class='nav-link__item'>";
                            echo "<a href='{$fullURL}' class='{$classes}' title='Link to {$linkTitle} Page'>{$linkTitle}</a>";
                            echo "</li>";
                        }
                        ?>
                    </ul>
                </div>
                <div class="nav__social-links-container">
                    <ul class="nav__social-links">
                        <li class="nav-link__item">
                            <a href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" class="social-link">
                                <img src="<?php $site->echoWithAssetVersion("/assets/images/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" class="social-link__img social-link__img--linkedin" />
                            </a>
                        </li>
                        <li class="nav-link__item">
                            <a href="https://github.com/jahidulpabelislam/" target="_blank" class="social-link">
                                <img src="<?php $site->echoWithAssetVersion("/assets/images/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github" />
                            </a>
                        </li>
                        <li class="nav-link__item">
                            <a href="https://www.instagram.com/jpi.dev/" target="_blank" class="social-link">
                                <span class="social-link__img social-link__img--instagram"><i></i></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
