
var pentaClusterConfig = [
    [2, 3, 4],
    [1, 5, 9],
    [1, 5, 6, 7, 8],
    [1, 6, 10],
    [2, 3, 7, 6, 8],
    [3, 4, 5, 7, 8],
    [9, 5, 8, 6, 3],
    [7, 5, 3, 6, 10],
    [2, 7, 10],
    [8, 4, 9]
];

var config18 = [
    [2, 4, 6, 3],
    [4, 5],
    [2, 5, 8, 1],
    [1, 2, 6, 7],
    [2, 7, 3, 8],
    [1, 4, 7, 8],
    [4, 5],
    [7, 5, 3, 6]
];

var config17 = [
    [2, 4, 3, 8],
    [1, 3, 4, 9],
    [1, 5, 2],
    [1, 5, 2],
    [3, 4, 6, 7],
    [5, 8, 9],
    [5, 9, 8],
    [1, 6, 7, 9],
    [2, 7, 6, 8]
];

var config35 = [
    [2, 4, 8],
    [1, 5, 7],
    [4, 6, 8],
    [1, 3, 5],
    [2, 4, 6, 8],
    [5, 3],
    [2, 8],
    [3, 1, 7, 5]
];


var circleTopologyConfig = [
    [1, 2],
    [2, 1]
//    [2, 4]
//    [3, 5],
//    [4, 6],
//    [5, 1]
];

var lineTopologyConfig = [
    [2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
    [5]
];

/*var map = new Map();
//var circleTopology = new CircleTopology(circleTopologyConfig, config17, map);
//var lineTopology = new LineTopology(lineTopologyConfig, config18, map);
var treeTopology = new TreeTopology(config35, map);
treeTopology.scaleUp(config35);
treeTopology.scaleUp(config35);

console.error(map);

createAdjacencyMatrix(map.list);
createWeightedAdjacencyMatrix(map);*/

var treeExperiment = new Experiment(config35, "tree", 3);
treeExperiment.scale();

console.error(treeExperiment);
