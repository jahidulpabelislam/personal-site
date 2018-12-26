window.jpi = window.jpi || {};
window.jpi.ajax = (function(jQuery) {

    "use strict";

    var fn = {

        // Checks if feedback was provided by API
        checkFeedback: function(feedback, howToRenderError, genericMessage) {

            //if there is feedback from Server give error message using the it otherwise output generic message
            if (feedback || genericMessage) {
                howToRenderError(feedback || genericMessage);
            }
        },

        // Loop through data to see if it exists
        loopThroughData: function(data, toRun, howToRenderError, genericMessage) {
            var i;

            // Check if data exists
            if (data.rows && data.rows.length > 0) {

                // Loop through each row of data in rows
                for (i = 0; i < data.rows.length; i++) {

                    if (data.rows.hasOwnProperty(i)) {

                        // Run the function provided as data exists and is valid
                        toRun(data.rows[i]);
                    }
                }
                return true;
            }
            // Otherwise check feedback and show user and return false as data isn't there
            else {
                fn.checkFeedback(data.meta.feedback, howToRenderError, genericMessage);
                return false;
            }
        },

        /*
         Given a payload that is an object (containing name/value pairs), this function
         converts that array into a URLEncoded string.
         */
        encodePayload: function(x) {
            var i, payload = "";
            for (i in x) {
                if (x.hasOwnProperty(i)) {
                    payload += i + "=" + encodeURIComponent(x[i]) + "&";
                    payload = payload.replace("%20", "+");
                    payload = payload.replace("%3D", "=");
                }
            }
            return payload.slice(0, -1);
        },

        /**
         * Function for sending XHR requests
         * {
         *     "method": "HTTP METHOD",
         *     "url": "URL to load",
         *     "query": "object of payload",
         *     "load": function to run when XHR is loaded
         * }
         ** @param request object of data necessary needed to do a http request
         */
        sendRequest: function(request) {

            //start a XHR
            var xhr = new XMLHttpRequest();

            // Checks if there is query to send to payload and checks its not sending a file
            if (request.query && request.data !== "file") {

                request.query = fn.encodePayload(request.query);

                if (request.method !== "POST") {

                    request.url += "?" + request.query;
                }
            }

            // Open a XHR
            xhr.open(request.method, request.url, true);

            // Set request header for XHR
            xhr.setRequestHeader("Accept", "application/json");

            if (request.query && request.method === "POST" && request.data !== "file") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            // Add listener for when XHR is loaded
            xhr.addEventListener("load", function() {
                if ((this && this.responseText !== "")) {
                    try {
                        var jsonData = JSON.parse(this.responseText);
                        request.load(jsonData);
                    }
                    catch (e) {
                        request.error("Error Loading Content.");
                        console.log(e);
                    }
                }
                else {
                    request.error("Error Loading Content.");
                }
            });

            // Add listener for when XHR has a error
            xhr.addEventListener("error", function() {
                request.error("Error Loading Content.");
            });

            // Send payload if any
            xhr.send(request.query);
        }
    };

    return {
        "loopThroughData": fn.loopThroughData,
        "sendRequest": fn.sendRequest
    };

}(jQuery));