//Custom code to collapse mobile bootstrap menu when user clicks off it.
$(document).click(function(event) {
    if(!$(event.target).closest('.nav').length && !$(".nav__links-container").hasClass("closed") && $(".nav__links__toggle").css("display") !== "none") {
        $(".nav__links__toggle").trigger("click");
    }
});

$(".nav__links__toggle").on("click", function() {
    var container = $(".nav__links-container");
    container.toggleClass("closed");
    container.toggleClass("opening");

    if (container[0].clientHeight) {
        container[0].style.height = 0;
    } else {
        var wrapper =  $(".nav__links")[0];
        container[0].style.height = wrapper.clientHeight + "px";
    }

     setTimeout(function() {
         container.toggleClass("opening");
    }, 670);

    $(".nav").toggleClass("opened");
});

$(window).on("orientationchange resize", function() {

    if ($(window).width() > 768)
    {
        var container = $(".nav__links-container");
        container[0].style.height = "";
        container.addClass("closed");
        $(".nav").removeClass("opened");
        container.removeClass("opening");
    }
});

$(window).on("scroll", function() {
    var nav_height = $(".nav").height();
    var scroll_pos = $(window).scrollTop() + nav_height;
    var win_height = $(window).height();

    if (scroll_pos >= win_height)
        $(".nav").addClass("scrolled");
    else
        $(".nav").removeClass("scrolled");
});

$(document).on("ready", function() {
    $(".js-scroll-to-content").on("click", function() {
        $('html, body').animate({
            scrollTop: jQuery("section").offset().top - jQuery(".nav").height()
        }, 1000);
    });
});