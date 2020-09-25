;window.jpi = window.jpi || {};
window.jpi.modal = (function(jQuery, jpi) {

    "use strict";

    var global = {
        body: null,
        page: null,
        selector: ".modal",
        activeModal: null,
        lastFocused: null,
        focusables: null,
        firstFocusable: null,
        lastFocusable: null,
    };

    var fn = {

        close: function() {
            if (!global.activeModal) {
                return;
            }

            global.body.removeClass("no-scroll");
            global.page.attr("aria-hidden", "false");

            global.activeModal.removeClass("is-open");
            global.activeModal.attr({
                "tabindex": -1,
                "aria-hidden": true,
                "hidden": "hidden",
            });

            if (global.lastFocused) {
                global.lastFocused.focus();
            }

            global.activeModal.trigger("closed");

            jpi.slideShow.resumeAll();

            global.activeModal = null;
            global.lastFocused = null;
            global.focusables = null;
            global.firstFocusable = null;
            global.lastFocusable = null;
        },

        triggerClose: function() {
            var closeButton = global.activeModal.find(".js-modal-close");
            if (closeButton.length) {
                closeButton.trigger("click");
                return;
            }

            fn.close();
        },

        open: function(modal) {
            if (global.activeModal) {
                fn.triggerClose();
            }

            jpi.slideShow.pauseAll();

            global.activeModal = jQuery(modal);

            global.lastFocused = document.activeElement;

            global.body.addClass("no-scroll");
            global.page.attr("aria-hidden", "true");

            global.activeModal.attr({
                "tabindex": 0,
                "aria-hidden": false,
                "hidden": false,
            });
            global.activeModal.addClass("is-open");

            global.focusables = jpi.helpers.getFocusableChildren(global.activeModal);
            var focusablesLength = global.focusables.length;
            if (focusablesLength) {
                global.firstFocusable = jQuery(global.focusables[0]);
                global.lastFocusable = jQuery(global.focusables[focusablesLength - 1]);

                global.firstFocusable.focus();
            }
            else {
                global.activeModal.focus();
            }

            global.activeModal.trigger("opened");
        },

        onModalClick: function(e) {
            // Only close if clicked outside of the modal content elem
            var clickedElem = jQuery(e.target);
            if (
                clickedElem.children(".modal__content").length &&
                !clickedElem.closest(".modal__content").length
            ) {
                fn.triggerClose();
            }
        },

        onBackwardTab: function(e) {
            if (document.activeElement === global.firstFocusable[0]) {
                e.preventDefault();
                global.lastFocusable.focus();
            }
        },

        onForwardTab: function(e) {
            if (document.activeElement === global.lastFocusable[0]) {
                e.preventDefault();
                global.firstFocusable.focus();
            }
        },

        onKeyDown: function(e) {
            switch (e.keyCode || e.key) {
                case 9:
                case "Tab":
                    if (global.focusables.length <= 1) {
                        e.preventDefault();
                        break;
                    }

                    if (e.shiftKey) {
                        fn.onBackwardTab(e);
                    }
                    else {
                        fn.onForwardTab(e);
                    }
                    break;
                case 27:
                case "Escape":
                    fn.triggerClose();
                    break;
            }
        },

        onClose: function(e) {
            if (global.activeModal && global.activeModal.has(jQuery(e.target))) {
                fn.close();
            }
        },

        init: function() {
            global.body = jQuery("body");
            global.page = jQuery(".page-container");

            /**
             * Due to the way the modal's are rendered
             * move all modal's after the page element for accessibility
             */
            jQuery(global.selector).insertAfter(global.page);

            global.body.on("click", global.selector, fn.onModalClick);
            global.body.on("click", ".js-modal-close", fn.onClose);
            global.body.on("keydown", global.selector, fn.onKeyDown);
        },

    };

    jQuery(document).on("ready", fn.init);

    return {
        open: fn.open,
        close: fn.close,
    };

})(jQuery, jpi);
