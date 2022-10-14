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
                        <span class="nav__menu-bar"></span>
                        <span class="nav__menu-bar"></span>
                        <span class="nav__menu-bar"></span>
                    </button>
                    <a class="nav__logo-container" href="<?php $site->echoURL(); ?>">
                        <img class="nav__logo <?php if ($pageId === "home") {echo "nav__logo--active";} ?>" src="<?php echoWithAssetVersion("/assets/images/logos/jpi.png"); ?>" alt="Jahidul Pabel Islam Logo" />
                    </a>
                </div>
                <div class="nav__links-container">
                    <ul class="nav__links">
                        <?php
                        $links = [
                            [
                                "title" => "Home",
                            ],
                            [
                                "title" => "Projects",
                                "url" => "/projects/",
                            ],
                            [
                                "title" => "Contact",
                                "url" => "/contact/",
                            ],
                            [
                                "title" => "About",
                                "url" => "/about/",
                            ],
                        ];

                        foreach ($links as $link) {
                            $linkTitle = $link["title"];

                            $url = $link["url"] ?? "/";
                            $fullURL = $site->getURL($url);

                            $classes = ["nav__link"];
                            if ((string)$currentURL === (string)$site->getURL($url, false)) {
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
                <div class="nav__social-links-container">
                    <ul class="nav__social-links">
                        <li class="nav__item">
                            <a class="social-link social-link--linkedin" href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                                <img class="social-link__image" src="<?php echoWithAssetVersion("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" />
                            </a>
                        </li>
                        <li class="nav__item">
                            <a class="social-link social-link--github" href="https://github.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                                <img class="social-link__image" src="<?php echoWithAssetVersion("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" />
                            </a>
                        </li>
                        <li class="nav__item">
                            <a class="social-link social-link--instagram" href="https://www.instagram.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                                <span class="social-link__image"><i></i></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
