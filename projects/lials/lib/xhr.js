window.lials = window.lials || {};
window.lials.xhr = (function () {

    "use strict";

    /**
     * Function for sending XHR requests
     * {
     *     "method": "HTTP METHOD",
     *     "url": "URL to load",
     *     "query": "URLEncoded string", 
     *     "load": function to run when XHR is loaded
     * }
     * @param ob object of data necessary needed to do a http request
     */
    var load = function (ob) {
        
        //start a XHR
        var xhr = new XMLHttpRequest();

        //open a XHR
        xhr.open(ob.method, "api/1/" + ob.url, true);

        //set request header for XHR
        xhr.setRequestHeader("Accept", "application/json");

        //checks if there is query to send to payload and checks its not sending a file
        if (ob.query && ob.data != "file") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }

        //add listener for when XHR is loaded
        xhr.addEventListener("load", function () {
            // break the textblock into an array of lines
            var lines = this.responseText.split('\n');
            // remove one line, starting at the first position
            lines.splice(1,3);
            // join the array back into a single string
            var newtext = lines.join('\n');
            ob.load(JSON.parse(newtext));
        });

        //add listener for when XHR has a error
        xhr.addEventListener("error", function () {
            // break the textblock into an array of lines
            var lines = this.responseText.split('\n');
            // remove one line, starting at the first position
            lines.splice(1,3);
            // join the array back into a single string
            var newtext = lines.join('\n');
            window.lials.main.renderError(JSON.parse(newtext));
        });

        //send payload if any
        xhr.send(ob.query);
    };

    return {
        "load": load
    };
    
}());			