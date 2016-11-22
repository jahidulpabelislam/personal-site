<?php
//title of page to use
$title = "Home";
//the description to use for page
$description = "Come and view our Website for our shop Bubbles Bargain World and the big range of products we have. We have Savings you'll love.";
//the keywords to use for pages
$keywords = "shop, savings, discount, bubbles, bargain, world, west, sussex, bognor, regis, local, cards, toys, sweets, character, merchandise, party, arts, craft, novelty, gifts, stationary, glassware, baby, plaque, sign, souvenirs";
//include the header for page
include "inc/header.php";
?>
    <!-- Start Dynamic content for page -->
    <!-- Container for slideShow -->
    <div id="slideShow">

        <!-- the slideShow navigation images -->
        <img class="slideShowNav" id="previous" src="images/previous.svg" alt="Click to View Previous Image">
        <img class="slideShowNav" id="next" src="images/next.svg" alt="Click to View Next Image">

        <!-- the images for slide show -->
        <img class="slideShow" id="1" src="images/store.jpg" alt="A image of a product" style="display:block;">
        <img class="slideShow" id="2" src="images/display1.jpg" alt="A image of a product" style="display:none;">
        <img class="slideShow" id="3" src="images/display2.jpg" alt="A image of a product" style="display:none;">
        <img class="slideShow" id="4" src="images/card1.jpg" alt="A image of a product" style="display:none;">
        <img class="slideShow" id="5" src="images/party1.jpg" alt="A image of a product" style="display:none;">
    </div>

    <!-- Script to make slideShow work -->
    <script type="text/javascript" src="/lib/slideShow.js"></script>

    <p>Welcome to Bubblesbargainworld.co.uk, one of the England's South Coast's leading retailer with a relentless drive
        to exceed expectations. We dedicate to provide you the best shopping experience at great discount prices.</p>

    <p>Trading 7 days a weeks, Bubbles Bargain World offers you the hottest bargain which means you do not have to
        travel far to make a bargain purchase. We stock a wide selection of goods ranging from cards, fancy dress, toys,
        party item, flowers and pet supplies.</p>

    <!-- The Facebook feed div -->
    <div class="fb-page" data-href="https://www.facebook.com/Bubbles-Bargain-World-1553944361587066"
         data-tabs="timeline" data-width="340" data-small-header="false" data-adapt-container-width="true"
         data-hide-cover="false" data-show-facepile="true"></div>

    <!-- Script for Facebook feed embed to set it up-->
    <div id="fb-root"></div>
    <script>(function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>

    <!-- The actual Twitter feed-->
    <a class="twitter-timeline" href="https://twitter.com/BubblesBognor" data-widget-id="710121628290699265">Tweets by
        @BubblesBognor</a>

    <!-- The script for Twitter feed-->
    <script>!function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + "://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, "script", "twitter-wjs");</script>
    <!-- End dynamic content -->
<?php
//include the footer for page
include "inc/footer.html";
?>