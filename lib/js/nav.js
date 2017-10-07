//Custom code to collapse mobile bootstrap menu when user clicks off it.
$(document).click(function(event) {
    if(!$(event.target).closest('.navbar').length && !$(".navbar-toggle").hasClass("collapsed") && $(".navbar-toggle").css("display") !== "none") {
        $('.navbar-toggle').click();
    }
});

//sets the header to be positioned lower than fixed nav (to fix issue with Bootstrap fixed navs)
$('.jumbotron').css('margin-top', $('.nav').outerHeight(true) + 'px');