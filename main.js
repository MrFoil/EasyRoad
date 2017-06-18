function searchAlgorithm(start, destination, map) {
    var startNode = map[start],
        queue = [];

    queue.push(start);
    startNode.visited = true;

    while (queue.length !== 0) {
        var index = queue.splice(0, 1)[0],
            currentNode = map[index];

        if (index === destination) {
            return reconstructPath(start, destination, map);
        }

        for (var i=0; i < currentNode.connectedTo.length; i++) {
            if (!map[currentNode.connectedTo[i]].visited) {
                queue.push(currentNode.connectedTo[i]);
                map[currentNode.connectedTo[i]].visited = true;
                map[currentNode.connectedTo[i]].previous = currentNode.index;
            }
        }
    }

    return false;
}

function breadthFirstSearch(start, destination, map){
    var result = searchAlgorithm(start, destination, map.list);

    map.resetVisited();

    return result;
}

function reconstructPath(start, destination, map) {
    var current = destination,
        path = [];

    while (current !== start) {
        path.push(map[current].previous);
        current = map[current].previous;
    }

    return path;
}

function createAdjacencyMatrix(mapList) {
    var table = {},
        keys = Object.keys(mapList);

    for (var i=0; i < keys.length; i++) {
        var raw = {};

        for (var j=0; j < keys.length; j++) {
            raw[j] = 0;
        }

        table[i] = raw;
    }

    for (var k=0; k < keys.length; k++) {
        var node = mapList[keys[k]];

        for (var l=0; l < node.connectedTo.length; l++) {
            table[node.index-1][node.connectedTo[l]-1] = 1;
        }
    }
    console.table(table);

    return table;
}

function createWeightedAdjacencyMatrix(map){
    var table = {},
        keys = Object.keys(map.list);

    for (var i=1; i < keys.length+1; i++) {
        var raw = {};

        for (var j=1; j < keys.length+1; j++) {
            raw[j] = 0;
        }

        table[i] = raw;
    }

    for (var k=0; k < keys.length; k++) {
        var node = map.list[keys[k]];

        for (var l=0; l < keys.length; l++) {
            var nextNode = map.list[keys[l]],
                path = breadthFirstSearch(node.index, nextNode.index, map),
                distance = Array.isArray(path) ? path.length : 0;

            table[node.index][nextNode.index] = distance;
        }
    }
    console.table(table);

    return table;
}

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

var map = new Map();
var circleTopology = new CircleTopology(circleTopologyConfig, config17);

console.error(map, circleTopology);

createAdjacencyMatrix(map.list);
createWeightedAdjacencyMatrix(map);
