<?php
//title of page to use
$title = "Cookie Policy";
//the description to use for page
$description = "Cookie Policy for the website for our shop Bubbles Bargain World.";
//the keywords to use for pages
$keywords = "shop, savings, discount, bubbles, bargain, world, west, sussex, bognor, regis, local, cards, toys, sweets, character, merchandise, party, arts, craft, novelty, gifts, stationary, glassware, baby, plaque, sign, souvenirs";
//include the header for page
include '../../inc/header.php';
?>
    <!-- Start Dynamic content for page -->
    <!-- text explaining cookies -->
    <p>Our website uses cookies to collect information. We’ll assume you're OK with this as by viewing our website you
        agree to use cookies.</p>
    <p>Cookies are files stored on your device when you come on a website which is using them. Information collected is
        about how you browse the site.</p>
    <h2>Cookies we use</h2>
    <p>Google Analytics</p>
    <!-- table of the different cookies site uses -->
    <table>
        <tr>
            <th>Cookie Name</th>
            <th>Expiration Time</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>_ga</td>
            <td>2 years</td>
            <td>Used to distinguish users.</td>
        </tr>
        <tr>
            <td>_gat</td>
            <td>10 minutes</td>
            <td>Used to throttle request rate.</td>
        </tr>
        <tr>
            <td>cookiesBanner</td>
            <td>30 days</td>
            <td>Used to store that you've clicked ok on the cookie banner.</td>
        </tr>

    </table>
    <p>To stop cookies you will need to go to your browser settings.</p>
    <!-- End dynamic content -->
<?php
//include the footer for page
include '../../inc/footer.html';
?>