<?php
$site = site();
$page = page();

$pageId = $page->id;
$currentURL = $page->currentURL;
?>

<nav class="nav">
    <div class="container nav__container">
        <div class="nav__logo-container">
            <a class="nav__logo <?php if ($pageId === "home") {echo "nav__logo--active";} ?>" href="<?php echo $site->makeURL(); ?>">
                <img src="<?php echo $site::asset("/assets/images/logo-v2-2.png"); ?>" alt="<?php echo $site::NAME; ?>'s Logo" />
            </a>
        </div>
        <ul class="nav__links">
            <?php
            $links = [
                [
                    "title" => "My Projects",
                    "url" => "/projects/",
                ],
            ];

            foreach ($links as $link) {
                $linkTitle = $link["title"];

                $url = $link["url"] ?? "/";
                $fullURL = $site->makeURL($url);

                $classes = ["nav__link"];
                if ($currentURL === $site->makeURL($url, false)) {
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
