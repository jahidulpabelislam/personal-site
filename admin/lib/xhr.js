window.portfolio = window.portfolio || {};
window.portfolio.xhr = (function () {

    "use strict";

    var //checks if feedback was provided by API
        checkFeedback = function (feedback, howtToRenderError, genericMessage) {

            //if there is feedback from PHP give error message using the feedback
            if (feedback) {
                howtToRenderError(feedback);
            }
            //else if generic error message is provided give it to user
            else if (genericMessage) {
                howtToRenderError(genericMessage);
            }
        },

        //loop through data to see if it exists
        loopThroughData = function (data, toRun, howtToRenderError, genericMessage) {
            var i;

            //check if data exists
            if (data.rows && data.rows.length > 0) {

                //loop through each row of data in rows
                for (i = 0; i < data.rows.length; i++) {

                    if (data.rows.hasOwnProperty(i)) {

                        //run the function provided as data exists and is valid
                        toRun(data.rows[i]);
                    }
                }
                return true;
            }
            //otherwise check feedback and show user and return false as data isn't there
            else {
                checkFeedback(data.meta.feedback, howtToRenderError, genericMessage);
                return false;
            }
        },

        /*
         Given a payload that is an object (containing name/value pairs), this function
         converts that array into a URLEncoded string.
         */
        encodePayload = function (x) {
            var i, payload = "";
            for (i in x) {
                if (x.hasOwnProperty(i)) {
                    payload += i + "=" + encodeURIComponent(x[i]) + "&";
                    payload = payload.replace("%20", "+");
                    payload = payload.replace("%3D", "=");
                }
            }
            payload = payload.slice(0, -1);
            return payload;
        },

        /**
         * Function for sending XHR requests
         * {"method": "HTTP METHOD",
         *     "url": "URL to load",
         *     "query": "object of payload",
         *     "load": function to run when XHR is loaded}
         ** @param ob object of data necessary needed to do a http request
         */
        sendRequests = function (ob) {

            //start a XHR
            var xhr = new XMLHttpRequest();

            //checks if there is query to send to payload and checks its not sending a file
            if (ob.query && ob.data != "file") {

                ob.query = encodePayload(ob.query);

                if (ob.method != "POST") {

                    ob.url += "?" + ob.query;
                }
            }

            //open a XHR
            xhr.open(ob.method, ob.url, true);

            //set request header for XHR
            xhr.setRequestHeader("Accept", "application/json");

            if (ob.query && ob.method == "POST" && ob.data != "file") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            //add listener for when XHR is loaded
            xhr.addEventListener("load", function () {

                // break the textblock into an array of lines
                var lines = this.responseText.split('\n');
                // remove one line, starting at the first position
                lines.splice(1, 3);
                // join the array back into a single string
                var newtext = lines.join('\n');

                ob.load(JSON.parse(newtext));
            });

            //add listener for when XHR has a error
            xhr.addEventListener("error", function () {
                ob.error("Error Loading Content.");
            });

            //send payload if any
            xhr.send(ob.query);
        };

    return {
        loopThroughData: loopThroughData,
        checkFeedback: checkFeedback,
        sendRequests: sendRequests
    };

}());