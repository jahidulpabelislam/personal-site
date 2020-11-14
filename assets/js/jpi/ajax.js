;window.jpi = window.jpi || {};
window.jpi.ajax = (function(jQuery) {

    "use strict";

    var fn = {

        // Display feedback from server if there is one otherwise output generic message
        checkAndRenderError: function(data, errorRenderer, genericMessage) {
            var message = (data && data.meta && data.meta.feedback) ? data.meta.feedback : genericMessage;
            if (message) {
                errorRenderer(message);
            }
        },

        // Loop through data to see if it exists and if it does run a function on each row
        renderRowsOrError: function(response, rowRenderer, errorRenderer, genericMessage) {
            // If data/rows exists, For each row run a function
            if (response && response.data && response.data.length) {
                for (var i = 0; i < response.data.length; i++) {
                    if ({}.hasOwnProperty.call(response.data, i)) {
                        rowRenderer(response.data[i]);
                    }
                }

                return true;
            }

            // Otherwise check feedback and show user and return false as data isn't there
            fn.checkAndRenderError(response, errorRenderer, genericMessage);
            return false;
        },

        /**
         * Function for sending XHR requests
         *
         * @param request Object of necessary data needed to do a HTTP request
         * {
         *     "method": HTTP Method (string),
         *     "url": URL to load (string),
         *     "data": object of payload,
         *     "onSuccess": function to run when XHR request is successful
         *     "onError": function to run when there's an error
         * }
         */
        request: function(request) {
            return jQuery.ajax({
                url: request.url,
                method: request.method.toUpperCase(),
                data: request.data,
                dataType: "json",
                success: request.onSuccess,
                error: function () {
                    request.onError("Error Loading Content.");
                },
            });
        },
    };

    return {
        renderRowsOrError: fn.renderRowsOrError,
        request: fn.request,
    };
})(jQuery);
