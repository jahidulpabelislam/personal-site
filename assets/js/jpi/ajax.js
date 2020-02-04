;window.jpi = window.jpi || {};
window.jpi.ajax = (function() {

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
        renderRowsOrError: function(data, rowRenderer, errorRenderer, genericMessage) {
            // If data/rows exists, For each row run a function
            if (data && data.rows && data.rows.length) {
                for (var i = 0; i < data.rows.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(data.rows, i)) {
                        rowRenderer(data.rows[i]);
                    }
                }

                return true;
            }

            // Otherwise check feedback and show user and return false as data isn't there
            fn.checkAndRenderError(data, errorRenderer, genericMessage);
            return false;
        },

        /**
         * Convert the data/payload object (containing name/value pairs) into a URLEncoded string.
         */
        encodePayload: function(data) {
            var payload = [];

            for (var name in data) {
                if (data.hasOwnProperty(name)) {
                    payload.push(name + "=" + encodeURIComponent(data[name]));
                }
            }

            var payloadString = payload.join("&");
            payloadString = payloadString.replace("%20", "+");
            payloadString = payloadString.replace("%3D", "=");

            return payloadString;
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
            request.method = request.method.toUpperCase();

            // Checks if there is data to send to payload and checks it's not sending a file
            if (request.data && request.dataType !== "file") {
                request.data = fn.encodePayload(request.data);

                if (request.method !== "POST") {
                    request.url += "?" + request.data;
                    delete request.data;
                }
            }

            var xhr = new XMLHttpRequest();
            xhr.open(request.method, request.url, true);

            xhr.setRequestHeader("Accept", "application/json");

            if (request.method === "POST" && request.data && request.dataType !== "file") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            var errorText = "Error Loading Content.";

            xhr.addEventListener("load", function() {
                if (xhr && xhr.responseText !== "") {
                    try {
                        var jsonData = JSON.parse(xhr.responseText);
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

            xhr.send(request.data || null);
        },
    };

    return {
        renderRowsOrError: fn.renderRowsOrError,
        request: fn.request,
    };
})();
