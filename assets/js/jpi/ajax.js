;window.jpi = window.jpi || {};
window.jpi.ajax = (function(jQuery) {

    "use strict";

    var fn = {

        // If there is feedback from Server give error message using the it otherwise output generic message
        checkAndRenderFeedback: function(data, renderErrorFunc, genericMessage) {
            var message = (data && data.meta && data.meta.feedback) ? data.meta.feedback : genericMessage;
            if (message) {
                renderErrorFunc(message);
            }
        },

        // Loop through data to see if it exists and if it does run a function on each row
        renderRowsOrFeedback: function(data, funcToRun, renderErrorFunc, genericMessage) {
            // If data/rows exists, For each row run a function
            if (data && data.rows && data.rows.length) {
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows.hasOwnProperty(i)) {
                        funcToRun(data.rows[i]);
                    }
                }

                return true;
            }
            // Otherwise check feedback and show user and return false as data isn't there
            else {
                fn.checkAndRenderFeedback(data, renderErrorFunc, genericMessage);
                return false;
            }
        },

        /*
         * Given a payload that is an object (containing name/value pairs), this function
         * converts that array into a URLEncoded string.
         */
        encodePayload: function(params) {
            var name,
                payload = [];
            for (name in params) {
                if (params.hasOwnProperty(name)) {
                    payload.push(name + "=" + encodeURIComponent(params[name]));
                }
            }

            var payloadString = payload.join("&");
            payloadString = payloadString.replace("%20", "+");
            payloadString = payloadString.replace("%3D", "=");

            return payloadString;
        },

        /**
         * Function for sending XHR requests
         * {
         *     "method": "HTTP METHOD",
         *     "url": "URL to load",
         *     "params": {"object of payload"},
         *     "onSuccess": function to run when XHR request is successful
         *     "onError": function to run when there's an error
         * }
         ** @param request object of params necessary needed to do a http request
         */
        sendRequest: function(request) {
            var xhr = new XMLHttpRequest();
            var errorText = "Error Loading Content.";

            // Checks if there is params to send to payload and checks its not sending a file
            if (request.params && request.data !== "file") {
                request.params = fn.encodePayload(request.params);

                if (request.method !== "POST") {
                    request.url += "?" + request.params;
                }
            }

            xhr.open(request.method, request.url, true);

            xhr.setRequestHeader("Accept", "application/json");

            if (request.params && request.method === "POST" && request.data !== "file") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            xhr.addEventListener("load", function() {
                if (this && this.responseText !== "") {
                    try {
                        var jsonData = JSON.parse(this.responseText);
                        request.onSuccess(jsonData);
                        return;
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                request.onError(errorText);
            });

            xhr.addEventListener("error", function() {
                request.onError(errorText);
            });

            xhr.send(request.params);
        },
    };

    return {
        renderRowsOrFeedback: fn.renderRowsOrFeedback,
        sendRequest: fn.sendRequest,
    };

})(jQuery);
