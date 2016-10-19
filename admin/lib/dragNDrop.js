window.portfolio = window.portfolio || {};
window.portfolio.admin = window.portfolio.admin || {};
window.portfolio.admin.dragNDrop = (function () {

    "use strict";

    //send a image to API with the username and password of user
    var projectID = document.getElementById("projectID"),
        uploads = document.getElementById("uploads"),
        dropZone = document.getElementById("dropZone"),

        sendImage = function (picture) {

            var form = new FormData();
            //add the picture
            form.append("picture", picture);
            //add the username of user
            form.append("username", window.portfolio.admin.ui.adminUsername);
            //add the password of user
            form.append("password", window.portfolio.admin.ui.adminPassword);

            //sends a object with necessary data to XHR
            window.portfolio.xhr.sendRequests({
                "method": "POST",
                "url": "pictures/" + projectID.value,
                "query": form,
                "data": "file",
                "load": window.portfolio.admin.ui.projectImageUploaded
            });
        },

        //set image as failed upload div to display error
        renderFailedUpload = function (errorMessage) {
            var div = window.portfolio.helperFunctions.createElement(uploads, "div", {className: "failedUpload"}),

                p = window.portfolio.helperFunctions.createElement(div, "p", {innerHTML: "errorMessage"});

            window.portfolio.height.delayExpand();
        },

        renderUploadPreview = function (file, picture) {
            //creates the element for dropped file
            var div = window.portfolio.helperFunctions.createElement(uploads, "div", {className: "aUpload"}),

                //shows the file name
                p = window.portfolio.helperFunctions.createElement(div, "p", {innerHTML: file.name}),

                img = window.portfolio.helperFunctions.createElement(div, "img", {src: picture}),
                //create button to set up upload
                button = window.portfolio.helperFunctions.createElement(div, "button", {className: "btn btn-primary", innerHTML: "Upload This Picture"});

            //set up listener for when user wants to upload a picture
            button.addEventListener("click", function () {
                sendImage(file);
            });

            window.portfolio.height.delayExpand();
        },

        checkFile = function (file) {
            var fileReader;

            //checks if file is a image
            if (file.type.includes("image/")) {

                //gets image
                fileReader = new FileReader();

                fileReader.readAsDataURL(file);

                fileReader.onload = function (e) {
                    renderUploadPreview(file, e.target.result);
                };

                fileReader.onerror = function (e) {
                    renderFailedUpload("Error getting " + file.name);
                };

            }
            //else it isn't a image so show its failed
            else {
                renderFailedUpload(file.name + " isn't a image.");
            }
        },

        //read item dropped
        readItem = function (item) {
            //creates variable for later
            var directoryReader, i;

            //checks if item is file
            if (item.isFile) {

                //gets file
                item.file(function (file) {
                    checkFile(file);
                });
            }
            //checks if its a directory
            else if (item.isDirectory) {

                //Get folder content
                directoryReader = item.createReader();
                directoryReader.readEntries(function (entries) {
                    //loop through each directory item
                    for (i = 0; i < entries.length; i++) {
                        readItem(entries[i]);
                    }
                });

            }
            //else drop of item has failed therefore show its failed
            else {
                renderFailedUpload("Error processing upload - " + item.name);
            }
        },

        //when a drag over starts
        dragOver = function (e) {

            //stop default events
            e.preventDefault();
            e.stopPropagation();

            //make drop zone visible
            dropZone.style.zIndex = "10";
            dropZone.style.opacity = "1";

        },

        removeDropZone = function (e) {
            //stop default events
            e.preventDefault();
            e.stopPropagation();

            //make drop zone invisible
            dropZone.style.opacity = "0";
            setTimeout(function () {
                dropZone.style.zIndex = "-10";
            }, 1000);
        },

        //when drop of item (file/directory) has occurred
        drop = function (e) {

            var items, i;

            removeDropZone(e);

            //gets the items (files/directories) dropped
            items = e.dataTransfer.items;

            //loop through each item (file/directory) dropped
            for (i = 0; i < items.length; i++) {
                //send a item (file/directory) to be read
                readItem(items[i].webkitGetAsEntry());
            }
        },

        //stop drag and drop to work
        stop = function (target) {
            target.removeEventListener("dragover", dragOver);
            target.removeEventListener("drop", drop);
        },

        //this allows drag and drop to work, sets up all listeners needed
        setUp = function (target) {

            //sets up listener for when a drag occurs
            target.addEventListener("dragover", dragOver);

            //sets up listener for when a drop happens
            target.addEventListener("drop", drop);

            //when user leaves the area, make drop zone invisible
            dropZone.addEventListener("dragleave", function (e) {
                removeDropZone(e);
            });
        };

    return {
        "setup": setUp,
        "stop": stop,
        "checkFile": checkFile
    };

}());