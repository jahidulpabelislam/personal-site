"use strict";

//send a image to API with the username and password of user
var sendImage = function(picture) {

        var form = new FormData();
        //add the picture
        form.append("picture", picture);
        //add the username of user
        form.append("username", adminUsername);
        //add the password of user
        form.append("password", adminPassword);

        //sends a object with necessary data to XHR
        sendRequest({
            method: "POST",
            url: "api/1/pictures/" + $("#projectID").val(),
            query: form,
            data: "file",
            load: projectImageUploaded
        });
    },

    //set image as failed upload div to display error
    renderFailedUpload = function(errorMessage) {
        var div = createElement($("#uploads")[0], "div", {className: "failedUpload"});

        createElement(div, "p", {innerHTML: errorMessage});

        delayExpand();
    },

    renderUploadPreview = function(file, picture) {
        //creates the element for dropped file
        var div = createElement($("#uploads")[0], "div", {className: "aUpload"});

        //shows the file name
        createElement(div, "p", {innerHTML: file.name});

        createElement(div, "img", {src: picture});

        //create button to set up upload
        var button = createElement(div, "button", {
            className: "btn btn-primary",
            innerHTML: "Upload This Picture"
        });

        //set up listener for when user wants to upload a picture
        button.addEventListener("click", function() {
            sendImage(file);
        });

        delayExpand();
    },

    checkFile = function(file) {
        var fileReader;

        //checks if file is a image
        if (file.type.includes("image/")) {

            //gets image
            fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = function(e) {
                renderUploadPreview(file, e.target.result);
            };

            fileReader.onerror = function() {
                renderFailedUpload("Error getting " + file.name);
            };

        }
        //else it isn't a image so show its failed
        else {
            renderFailedUpload(file.name + " isn't a image.");
        }
    },

    //read item dropped
    readItem = function(item) {
        //creates variable for later
        var directoryReader, i;

        //checks if item is file
        if (item.isFile) {

            //gets file
            item.file(function(file) {
                checkFile(file);
            });
        }
        //checks if its a directory
        else if (item.isDirectory) {

            //Get folder content
            directoryReader = item.createReader();
            directoryReader.readEntries(function(entries) {
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
    dragOver = function(e) {

        //stop default events
        e.preventDefault();
        e.stopPropagation();

        //make drop zone visible
        $("#dropZone")[0].style.zIndex = "10";
        $("#dropZone")[0].style.opacity = "1";

    },

    removeDropZone = function(e) {
        //stop default events
        e.preventDefault();
        e.stopPropagation();

        //make drop zone invisible
        $("#dropZone")[0].style.opacity = "0";
        setTimeout(function() {
            $("#dropZone")[0].style.zIndex = "-10";
        }, 1000);
    },

    //when drop of item (file/directory) has occurred
    drop = function(e) {

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
    dragNDropStop = function() {
        window.removeEventListener("dragover", dragOver);
        window.removeEventListener("drop", drop);
    },

    //this allows drag and drop to work, sets up all listeners needed
    dragNDropSetUp = function() {

        //sets up listener for when a drag occurs
        window.addEventListener("dragover", dragOver);

        //sets up listener for when a drop happens
        window.addEventListener("drop", drop);

        //when user leaves the area, make drop zone invisible
        $("#dropZone")[0].addEventListener("dragleave", removeDropZone);
    };