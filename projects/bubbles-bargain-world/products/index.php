<?php
//title of page to use
$title = "Products";
//the description to use for page
$description = "Come and view our range of products for our shop Bubbles Bargain World.";
//the keywords to use for pages
$keywords = "shop, savings, discount, bubbles, bargain, world, west, sussex, bognor, regis, local, cards, toys, sweets, character, merchandise, party, arts, craft, novelty, gifts, stationary, glassware, baby, plaque, sign, souvenirs";
//include the header for page
include '../inc/header.php';
?>
    <!-- Start Dynamic content for page -->
    <p> These are the different category's of products we have. Click on a category image and view more product of that
        category.</p>

    <!-- Next 11 divs are containers for each category of products -->
    <div class="categoryArea">
        <a href="cards">
            <img class="category" src="../images/card1(1).jpg" alt="Card">
            <p>Cards</p></a>
    </div>

    <div class="categoryArea">
        <a href="character-merchandise">
            <img class="category" src="../images/character-merchandise1.jpg" alt="Character Merchandise">
            <p>Character Merchandise</p></a>
    </div>

    <div class="categoryArea">
        <a href="party">
            <img class="category" src="../images/party1(1).jpg" alt="Party">
            <p>Party</p></a>
    </div>

    <div class="categoryArea">
        <a href="arts-and-craft">
            <img class="category" src="../images/arts-and-craft1.jpg" alt="Arts &amp; Craft">
            <p>Arts &amp; Craft</p></a>
    </div>

    <div class="categoryArea">
        <a href="gifts">
            <img class="category" src="../images/gift1.jpg" alt="Gifts">
            <p>Gifts</p></a>
    </div>

    <div class="categoryArea">
        <a href="stationary">
            <img class="category" src="../images/stationary1.jpg" alt="Stationary">
            <p>Stationary</p></a>
    </div>

    <div class="categoryArea">
        <a href="toys">
            <img class="category" src="../images/toy1.jpg" alt="Toys">
            <p>Toys</p></a>
    </div>

    <div class="categoryArea">
        <a href="baby">
            <img class="category" src="../images/baby1.jpg" alt="Baby">
            <p>Baby</p></a>
    </div>

    <div class="categoryArea">
        <a href="plaque-signs">
            <img class="category" src="../images/plaque-sign1.jpg" alt="Plaque Signs">
            <p>Plaque Signs</p></a>
    </div>

    <div class="categoryArea">
        <a href="sweets">
            <img class="category" src="../images/sweet1.jpg" alt="Sweets">
            <p>Sweets</p></a>
    </div>

    <div class="categoryArea">
        <a href="souvenirs">
            <img class="category" src="../images/souvenir1.jpg" alt="Souvenirs">
            <p>Souvenirs</p></a>
    </div>
    <!-- End dynamic content -->
<?php
//include the footer for page
include '../inc/footer.html';
?>