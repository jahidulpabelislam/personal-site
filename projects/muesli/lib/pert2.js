var nodes = null;
var edges = null;
var network = null;

var DIR = 'img/refresh-cl/';
var LENGTH_MAIN = 150;
var LENGTH_SUB = 50;


var data = '<svg xmlns="http://www.w3.org/2000/svg">'+
    '<foreignobject x="10" y="10" width="100" height="150">'+
    '<body xmlns="http://www.w3.org/1999/xhtml">'+
    '<table class="pert">'+
    '<tr>'+
    '<td>earliestStart</td>'+
    '<td>estimatedDuration</td>'+
    '<td>earliestEnd</td>'+
    '</tr>'+
    '<tr>'+
    '<td colspan="3">description</td>'+
    '</tr>'+
    '<tr>'+
    '<td>latestStart</td>'+
    '<td>slack</td>'+
    '<td>latestEnd</td>'+
    '</tr>'+
    '</table>'+
    '</body>'+
    '</foreignobject>'+
    '</svg>'

var DOMURL = window.URL || window.webkitURL || window;

var img = new Image();
var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
var url = DOMURL.createObjectURL(svg);
console.log(url);

// Called when the Visualization API is loaded.
function draw() {
    // Create a data table with nodes.
    nodes = [];

    // Create a data table with links.
    edges = [];

    nodes.push({id: 1, label: 'Get HTML', image: url, shape: 'image'});
    nodes.push({id: 2, label: 'Using SVG', image: url, shape: 'image'});
    edges.push({from: 1, to: 2, length: 300});

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        physics: {stabilization: false},
        edges: {smooth: false}
    };
    network = new vis.Network(container, data, options);
}