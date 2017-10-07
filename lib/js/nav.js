//Custom code to collapse mobile bootstrap menu when user clicks off it.
$(document).click(function(event) {
    if(!$(event.target).closest('.nav').length && $(".nav__links-container").hasClass("opened") && $(".nav__links__toggle").css("display") !== "none") {
        $(".nav__links-container, .nav__links__toggle").removeClass("opened");
    }
});

//sets the header to be positioned lower than fixed nav (to fix issue with Bootstrap fixed navs)
$('.jumbotron').css('margin-top', $('.nav').outerHeight(true) + 'px');

$(".nav__links__toggle").on("click", function() {
    $(".nav__links-container, .nav__links__toggle").toggleClass("opened");
});