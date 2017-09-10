//Custom code to collapse mobile bootstrap menu when user clicks off it.
$(document).click(function(event) {
    if(!$(event.target).closest('.navbar').length && !$(".navbar-toggle").hasClass("collapsed") && $(".navbar-toggle").css("display") !== "none") {
        $('.navbar-toggle').click();
    }
});