function Experiment(clusterConfig, topology, scales) {
    this.scaleFactor = scales;
    this.map = new Map();
    this.topology = null;

    this.S = [];
    this.D = [];
    this._D = [];
    this.C = [];
    this.T = [];

    var circleTopologyConfig = [
        [1, 2],
        [2, 1],
        [2, 4],
        [3, 5],
        [4, 6],
        [5, 1]
    ];

    var lineTopologyConfig = [
        [2],
        [1, 3],
        [2, 4],
        [3, 5],
        [4, 6],
        [5]
    ];

    if (topology === "circle") {
        this.topology = new CircleTopology(circleTopologyConfig, clusterConfig, this.map);
    } else if (topology === "line") {
        this.topology = new LineTopology(lineTopologyConfig, clusterConfig, this.map);
    } else if (topology === "tree") {
        this.topology = new TreeTopology(clusterConfig, this.map);
    }

    console.error(this.map, this.scaleFactor);
}


Experiment.prototype = {
    scale: function () {
        for (var i=0; i < this.scaleFactor; i++) {

        }
    },

    searchAlgorithm: function (start, destination) {
        var startNode = this.map[start],
            queue = [];

        queue.push(start);
        startNode.visited = true;

        while (queue.length !== 0) {
            var index = queue.splice(0, 1)[0],
                currentNode = this.map[index];

            if (index === destination) {
                return reconstructPath(start, destination);
            }

            for (var i=0; i < currentNode.connectedTo.length; i++) {
                if (!this.map[currentNode.connectedTo[i]].visited) {
                    queue.push(currentNode.connectedTo[i]);
                    this.map[currentNode.connectedTo[i]].visited = true;
                    this.map[currentNode.connectedTo[i]].previous = currentNode.index;
                }
            }
        }

        return false;
    },

    breadthFirstSearch: function(start, destination){
        var result = searchAlgorithm(start, destination, this.map.list);

        this.map.resetVisited();

        return result;
    },

    reconstructPath: function(start, destination) {
        var current = destination,
            path = [];

        while (current !== start) {
            path.push(this.map[current].previous);
            current = this.map[current].previous;
        }

        return path;
    },
    
    initArray: function(dim){
        var arr = [];

        for (var i=0; i < dim; i++) {
            var row = [];

            for (var j=0; j < dim; j++) {
                row.push(0);
            }

            arr.push(row);
        }
        
        return arr;
    },

    createAdjacencyMatrix: function() {
        var table = {},
            mapList = this.map.list,
            keys = Object.keys(mapList),
            array = this.initArray(keys.length);

        for (var i=1; i < keys.length+1; i++) {
            var raw = {};

            for (var j=1; j < keys.length+1; j++) {
                raw[j] = 0;
            }

            table[i] = raw;
        }

        for (var k=0; k < keys.length; k++) {
            var node = mapList[keys[k]];

            for (var l=0; l < node.connectedTo.length; l++) {
                table[node.index][node.connectedTo[l]] = 1;
            }
        }

        for (var m=0; m < array.length; m++) {
            for (var n=0; n < array[m].length; n++) {
                if (ma) {

                }
            }
        }
        //console.table(table);

        return table;
    },

    createWeightedAdjacencyMatrix: function(){
        var table = {},
            keys = Object.keys(this.map.list);

        for (var i=1; i < keys.length+1; i++) {
            var raw = {};

            for (var j=1; j < keys.length+1; j++) {
                raw[j] = 0;
            }

            table[i] = raw;
        }

        for (var k=0; k < keys.length; k++) {
            var node = this.map.list[keys[k]];

            for (var l=0; l < keys.length; l++) {
                var nextNode = this.map.list[keys[l]],
                    path = breadthFirstSearch(node.index, nextNode.index),
                    distance = Array.isArray(path) ? path.length : 0;

                table[node.index][nextNode.index] = distance;
            }
        }
        //console.table(table);

        return table;
    },

    calculateS: function(){
        var table = createAdjacencyMatrix(this.map.list),
            rowsKeys = Object.keys(table),
            max = 0;

        for (var i=0; i < rowsKeys.length; i++) {
            var rowKey = rowsKeys[i],
                columnsKeys = Object.keys(table[rowKey]),
                currentValue = 0;

            for (var j=0; j < columnsKeys.length; j++) {
                var columnKey = columnsKeys[j];
                currentValue += table[rowKey][columnKey];
            }

            if (currentValue > max) {
                max = currentValue;
            }
        }

        for (var i=0; i < rowsKeys.length; i++) {
            var rowKey = rowsKeys[i],
                columnsKeys = Object.keys(table[rowKey]),
                currentValue = 0;

            for (var j=0; j < columnsKeys.length; j++) {
                var columnKey = columnsKeys[j];
                currentValue += table[rowKey][columnKey];
            }

            if (currentValue > max) {
                max = currentValue;
            }
        }
    }
}