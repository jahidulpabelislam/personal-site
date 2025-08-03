<?php
$app = app();
$page = page();
?>

<nav class="nav">
    <div class="container nav__container">
        <div class="nav__logo-container">
            <a class="nav__logo<?php echo $page->id === "home" ? " nav__logo--active" : "" ?>" href="<?php echo $app->makeURL("/"); ?>">
                <img src="<?php echo $app::asset("/logo.png", null, JPI_CORE_ROOT . "/assets"); ?>" alt="<?php echo $app::NAME; ?>'s Logo" />
            </a>
        </div>
        <ul class="nav__links">
            <?php
            $currentURL = $page->currentURL;

            $links = [
                [
                    "title" => "Portfolio",
                    "url" => "/portfolio/",
                ],
            ];

            foreach ($links as $link) {
                $linkTitle = $link["title"];

                $url = $link["url"] ?? "/";
                $fullURL = $app->makeURL($url);

                $classes = ["nav__link"];
                if ($currentURL == $app->makeURL($url)) {
                    $classes[] = "nav__link--active";
                }

                $class = implode(" ", $classes);
                echo <<<HTML
                    <li class="nav__item">
                        <a class="$class" href="$fullURL" title="Link to $linkTitle Page">
                            $linkTitle
                        </a>
                    </li>
                    HTML;
            }
            ?>
        </ul>
    </div>
</nav>
