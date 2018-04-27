<!DOCTYPE html>
<html lang="en-gb">

    <head>
        <title>Social Media Links | Jahidul Pabel Islam - Full Stack Web & Software Developer</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Jahidul Pabel Islam">
        <!-- Dynamically insert the description for a page -->
        <meta name="description" content="Social Media Links for Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.">
        <!-- Dynamically insert the keywords for a page -->
        <meta name="keywords" content="">

        <?php
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 'https' : 'http';
        $url = $protocol . '://' .$_SERVER["SERVER_NAME"] . "/";
        $page_url = $url . "links/";
        ?>
        <meta property="og:title" content="Social Media Links | Jahidul Pabel Islam - Full Stack Developer"/>
        <meta property="og:url" content="<?php echo $page_url; ?>"/>
        <meta property="og:description" content="Social Media Links for Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England."/>

        <?php
        $image_url = $url . "images/portfolio-links-preview.png";
        ?>
        <meta property="og:image" content="<?php echo $image_url; ?>"/>

        <meta name="twitter:card" content="summary_large_image"/>

        <!-- Custom stylesheet for site -->
        <link href="/lib/css/main.min.css" rel="stylesheet" title="style" media="all" type="text/css">

        <!-- Favicons/Icons for devices -->
        <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-touch-icon-57x57.png?v=1">
        <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-touch-icon-60x60.png?v=1">
        <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-touch-icon-72x72.png?v=1">
        <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-touch-icon-76x76.png?v=1">
        <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-touch-icon-114x114.png?v=1">
        <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-touch-icon-120x120.png?v=1">
        <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-touch-icon-144x144.png?v=1">
        <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-touch-icon-152x152.png?v=1">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-180x180.png?v=1">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png?v=1">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png?v=1">
        <link rel="manifest" href="/images/site.webmanifest?v=1">
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg?v=1" color="#0375b4">
        <link rel="shortcut icon" href="/images/favicon.ico?v=1">
        <meta name="msapplication-TileColor" content="#f5f5f5">
        <meta name="msapplication-TileImage" content="/images/mstile-144x144.png?v=1">
        <meta name="msapplication-config" content="/images/browserconfig.xml?v=1">
        <meta name="theme-color" content="#337ab7">
    </head>

    <body>

    <section id="socialMediaPage">

        <div class="container">

            <div>
                <a href="http://facebook.com/jahidulpabelislam/" target="_blank" id="facebook">
                    <img src="/images/facebook.svg" alt="Add Me facebook.com/jahidulpabelislam" class="socialMediaImg" id="facebookImg">
                    <p class="socialMediaText" id="facebookAt"> /jahidulpabelislam</p>
                </a>
            </div>

            <div>
                <a href="http://twitter.com/itsjahidulislam/" target="_blank" id="twitter">
                    <img src="/images/twitter.png" alt="Follow Me @ItsJahidulIslam" class="socialMediaImg" id="twitterImg">
                    <p class="socialMediaText" id="twitterAt"> @ItsJahidulIslam</p>
                </a>
            </div>

            <div>
                <a href="http://instagram.com/jahidulpabelislam/" target="_blank" id="instagram">
                    <img src="/images/instagram-black-white.png" alt="Follow Me @jahidulpabelislam" class="socialMediaImg" id="instagramImg">
                    <p class="socialMediaText" id="instagramAt"> @jahidulpabelislam</p>
                </a>
            </div>

            <div id="snapchatDiv">
                <!--Snapcode-->
                <a id="snapchat" href="http://snapchat.com/add/jahidulpislam/" target="_blank"><object data="https://feelinsonice-hrd.appspot.com/web/deeplink/snapcode?username=jahidulpislam&amp;type=PNG" type="image/png" id="snapcode">
                </object><p id="snapchatName">jahidulpislam</p></a>

            </div>

            <div>
                <a href="https://account.xbox.com/en-us/profile?gamerTag=xXx%20I%20MADBOMB3R" target="_blank" id="xbox">
                    <img src="../images/xbox.svg" alt="Add Me xXx I MADBOMB3" class="socialMediaImg" id="xboxImg">
                    <p class="socialMediaText" id="gamertag"> xXx I MADBOMB3R</p>
                </a>
            </div>

            <div>
                <a href="http://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="linkedinLink">
                    <img src="/images/linkedin.svg" alt="Find me on Linkedin /jahidulpabelislam" class="socialMediaImg linkedinImg">
                    <p class="socialMediaText" id="linkedinAt"> /jahidulpabelislam</p>
                </a>
            </div>

            <div>
                <a href="https://github.com/jahidulpabelislam" target="_blank" class="githubLink">
                    <img src="/images/github.svg" alt="Find me on GitHub /jahidulpabelislam" class="socialMediaImg githubImg">
                    <p class="socialMediaText" id="githubAt"> /jahidulpabelislam</p>
                </a>
            </div>

        </div>

    </section>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/lib/js/main.min.js"></script>

    </body>
</html>