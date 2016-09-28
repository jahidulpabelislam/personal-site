// Specifies where the wbt goes in the document
var container = document.getElementById("wbt"),
    nodes,
    edges,
    data,
    options,
    network,
    importDataSets = function (nodeImports, edgeImports) {
        nodes = new vis.DataSet(nodeImports);
        edges = new vis.DataSet(edgeImports);
        // Specifies the edges/nodes to be used to make the wbt
        data = {
            nodes: nodes,
            edges: edges
        };

        // The various settings for the canvas
        options = {
            width: '100%', // canvas width
            height: '500px', //canvas height
            physics: {enabled: false}, // Turns off the bouncy node physics
            layout: {
                hierarchical: { // specifies the hierarchy shape
                    levelSeparation: 100, // the gap between each layer of nodes
                    enabled: true,
                    direction: 'UD', // specifies Up Down direction
                    sortMethod: 'directed', // Sorts the nodes by 'from' 'to', i.e. from 1 to 2, means 1 will be above 2.
                }
            },
            nodes: {
                shape: 'box', // specifies the box shaped nodes
            },
            edges: {
                smooth: {
                    type: "horizontal",
                    forceDirection: "none",
                    roundness: 0 // makes the edges have an arced shape
                }
            },
            interaction: {
                multiselect: false, // disables the ability to select multiple nodes. Disabled by default, but let's be sure.
            },
            manipulation: {
                // sets what the user can and can't edit
                enabled: true,
                initiallyActive: true,
                addNode: false,
                addEdge: false,
                editEdge: false,
                deleteNode: true,
                deleteEdge: false,
            },
        };

        // Let's make a network...
        network = new vis.Network(container, data, options);

        network.redraw();
    },


// Function to change the name of a node. If no node selected makes a new node with the specified name.
    changeName = function () {
        // makes an array of selected nodes. Only want first, hence selectedNode[0]
        var selectedNode = network.getSelectedNodes();
        if (selectedNode.length > 0) {
            var newName = document.getElementById("nodeName").value; // retrieves the name from the input box
            nodes.update({id: selectedNode[0], label: newName}); // updates the data set
            var errorDisplayed = document.getElementById("noNodeSelected").style.display;
            if (errorDisplayed == "block") {
                document.getElementById("noNodeSelected").style.display = "none";
            }
            loadXHR({
                "method": "POST",
                "url": "wbt/update.php",
                "query": "ID=" + selectedNode[0] + "&Text=" + newName
            });
        } else {
            var errorDisplayed = document.getElementById("noNodeSelected").style.display;
            if (errorDisplayed == "none") {
                document.getElementById("noNodeSelected").style.display = "block";
            }
        }
    },
    addNode = function () {
        var selectedNode = network.getSelectedNodes();
        if (selectedNode.length > 0) {
            var newName = document.getElementById("nodeName").value; // retrieves the name from the input box
            nodes.update({id: nodes.length + 1, label: newName}); // adds to the data set
            var nodeTo = nodes.length;
            console.log(nodeTo);
            edges.update({from: selectedNode[0], to: nodeTo});
            network.redraw();
            var errorDisplayed = document.getElementById("noNodeSelected").style.display;
            if (errorDisplayed == "block") {
                document.getElementById("noNodeSelected").style.display = "none";
            }
            loadXHR({
                "method": "POST",
                "url": "wbt/add.php",
                "query": "ID=" + nodeTo + "&Text=" + newName + "&PrecedingID=" + selectedNode[0]
            });
        } else {
            var errorDisplayed = document.getElementById("noNodeSelected").style.display;
            if (errorDisplayed == "none") {
                document.getElementById("noNodeSelected").style.display = "block";
            }
        }
    },
    errors = function (response) {

    },
    display = function (response) {
        // break the textblock into an array of lines
        var lines = response.target.responseText.split('\n');
        // remove one line, starting at the first position
        lines.splice(1,3);
        // join the array back into a single string
        var newtext = lines.join('\n');
        var i, result = JSON.parse(newtext),
            nodes2 = [],
            edges2 = [];
        if (result.rows && result.rows.length > 0) {
            for (i = 0; i < result.rows.length; i++) {
                if (result.rows.hasOwnProperty(i)) {
                    nodes2.push({id: result.rows[i].ID, label: result.rows[i].Text});
                    if (result.rows[i].PrecedingID) {
                        edges2.push({from: result.rows[i].PrecedingID, to: result.rows[i].ID});
                    }
                }
            }
        }
        else {
            nodes2.push({id: 1, label: "Text"});
            loadXHR({
                "method": "POST",
                "url": "wbt/add.php",
                "query": "ID=" + 1 + "&Text=Text"
            });
        }
        importDataSets(nodes2, edges2);
    },
    load = function () {
        loadXHR({
            "method": "GET",
            "url": "get.php",
            "callbacks": {
                "load": display,
                "error": errors
            }
        });
    }();