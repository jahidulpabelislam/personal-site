window.jpi = window.jpi || {};
window.jpi.dnd = (function (jQuery) {

	"use strict";

	var global = {
		dropZone: jQuery(".drop-zone")[0]
	};

	//read item dropped
	var readItem = function (item) {
				//creates variable for later
				var directoryReader, i;

				//checks if item is file
				if (item.isFile) {

					//gets file
					item.file(function (file) {
						window.jpi.admin.checkFile(file);
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
				global.dropZone.style.zIndex = "10";
				global.dropZone.style.opacity = "1";
			},

			removeDropZone = function (e) {
				//stop default events
				e.preventDefault();
				e.stopPropagation();

				//make drop zone invisible
				global.dropZone.style.opacity = "0";
				setTimeout(function () {
					global.dropZone.style.zIndex = "-10";
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
			stop = function () {
				window.removeEventListener("dragover", dragOver);
				window.removeEventListener("drop", drop);
			},

			//this allows drag and drop to work, sets up all listeners needed
			setUp = function () {

				//sets up listener for when a drag occurs
				window.addEventListener("dragover", dragOver);

				//sets up listener for when a drop happens
				window.addEventListener("drop", drop);

				//when user leaves the area, make drop zone invisible
				global.dropZone.addEventListener("dragleave", removeDropZone);
			};

	return {
		"setUp": setUp,
		"stop": stop
	};

}(jQuery));