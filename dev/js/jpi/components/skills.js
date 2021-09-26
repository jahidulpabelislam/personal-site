;(new (function() {

    "use strict";

    this.$items = jQuery(".skills__item--expandable");
    this.$expandableContents = jQuery(".skills__description");
    this.$expandableIcons = jQuery(".skills__toggle");

    this.toggleContent = function(e) {
        var $item = jQuery(e.target);

        // Get the new item elems that was clicked
        var $selected = $item.find(".skills__description");
        var $selectedIcon = $item.find(".skills__toggle");

        // Reset all other item to closed
        this.$expandableContents.not($selected).slideUp();
        this.$expandableIcons.not($selectedIcon).addClass("fa-plus").removeClass("fa-minus");

        // Toggle the clicked item
        $selectedIcon.toggleClass("fa-plus");
        $selectedIcon.toggleClass("fa-minus");
        $selected.slideToggle();
    };

    this.$items.on("click", this.toggleContent.bind(this));
}));
