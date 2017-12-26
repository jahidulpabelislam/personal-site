<!DOCTYPE html>
<html lang="en-gb">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Jahidul Pabel Islam">
        <!-- Dynamically insert the description for a page -->
        <meta name="description" content="Social Media Links for Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.">
        <!-- Dynamically insert the keywords for a page -->
        <meta name="keywords" content="">
        <!-- Custom stylesheet for site -->
        <?php if (!isset($_GET["debug"])):?>
            <link href="/lib/css/main.min.css" rel="stylesheet" title="style" media="all" type="text/css">
        <?php else: ?>
            <link href="/lib/css/style.css" rel="stylesheet" title="style" media="all" type="text/css">
        <?php endif; ?>
        <!-- the favicon for browsers -->
        <link rel="icon" href="/images/favicon.png">
        <title>Social Media Links | Jahidul Pabel Islam</title>
    </head>

    <body>

    <section class="social-links-page">

        <div class="container">

            <div class="social-link-container">
                <a href="http://facebook.com/jahidulpabelislam/" target="_blank" class="social-link">
                    <img src="/images/facebook.svg" alt="Add Me facebook.com/jahidulpabelislam" class="social-link__img social-link__img--facebook">
                    <p class="social-link__text social-link__text--facebook"> /jahidulpabelislam</p>
                </a>
            </div>

            <div class="social-link-container">
                <a href="http://twitter.com/itsjahidulislam/" target="_blank" class="social-link">
                    <img src="/images/twitter.png" alt="Follow Me @ItsJahidulIslam" class="social-link__img social-link__img--twitter">
                    <p class="social-link__text social-link__text--twitter"> @ItsJahidulIslam</p>
                </a>
            </div>

            <div class="social-link-container">
                <a href="http://instagram.com/jahidulpabelislam/" target="_blank" class="social-link">
                    <img src="/images/instagram-black-white.png" alt="Follow Me @jahidulpabelislam" class="social-link__img social-link__img--instagram">
                    <p class="social-link__text social-link__text--instagram"> @jahidulpabelislam</p>
                </a>
            </div>

            <div class="social-link-container social-link-container--snapchat">
                <!--Snapcode-->
                <a class="social-link" href="http://snapchat.com/add/jahidulpislam/" target="_blank">
                    <object data="https://feelinsonice-hrd.appspot.com/web/deeplink/snapcode?username=jahidulpislam&amp;type=PNG" type="image/png" class="social-link__img social-link__img--snapchat"></object>
                    <p class="social-link__text social-link__text--snapchat">jahidulpislam</p>
                </a>
            </div>

            <div class="social-link-container">
                <a href="https://account.xbox.com/en-us/profile?gamerTag=xXx%20I%20MADBOMB3R" target="_blank" class="social-link">
                    <img src="../images/xbox.svg" alt="Add Me xXx I MADBOMB3" class="social-link__img social-link__img--xbox">
                    <p class="social-link__text social-link__text--xbox"> xXx I MADBOMB3R</p>
                </a>
            </div>

            <div class="social-link-container">
                <a href="http://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="social-link">
                    <img src="/images/linkedin.svg" alt="Find me on Linkedin /jahidulpabelislam" class="social-link__img social-link__img--linkedin">
                    <p class="social-link__text social-link__text--linkedin"> /jahidulpabelislam</p>
                </a>
            </div>

            <div class="social-link-container">
                <a href="https://github.com/jahidulpabelislam" target="_blank" class="social-link">
                    <img src="/images/github.svg" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github">
                    <p class="social-link__text social-link__text--github"> /jahidulpabelislam</p>
                </a>
            </div>

        </div>

    </section>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <?php if (!isset($_GET["debug"])):?>
        <script src="/lib/js/main.min.js" type="text/javascript"></script>
    <?php else: ?>
        <script src="/lib/js/stickyFooter.js" type="text/javascript"></script>
    <?php endif; ?>

    </body>
</html>