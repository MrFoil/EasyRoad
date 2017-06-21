function Experiment(clusterConfig, topology, scales) {
    this.scaleFactor = scales;
    this.map = new Map();
    this.topology = null;
    this.clusterConfig = clusterConfig;

    this.S = [];
    this.D = [];
    this._D = [];
    this.C = [];
    this.T = [];

    var circleTopologyConfig = [
        [2]
//    [2, 4]
//    [3, 5],
//    [4, 6],
//    [5, 1]
    ];

    var lineTopologyConfig = [
        [2]
    ];

    if (topology === "circle") {
        this.topology = new CircleTopology(circleTopologyConfig, clusterConfig, this.map);
    } else if (topology === "line") {
        this.topology = new LineTopology(lineTopologyConfig, clusterConfig, this.map);
    } else if (topology === "tree") {
        this.topology = new TreeTopology(clusterConfig, this.map);
    }

    this.S.push(this.calculateS());
    this.D.push(this.calculateD());
    this._D.push(this.calculate_D());
    this.C.push(this.calculateC(0));
    this.T.push(this.calculateT(0));
}


Experiment.prototype = {
    scale: function () {
        for (var i=1; i < this.scaleFactor+1; i++) {
            this.topology.scaleUp(this.clusterConfig, this.map);

            this.S.push(this.calculateS());
            this.D.push(this.calculateD());
            this._D.push(this.calculate_D());
            this.C.push(this.calculateC(i));
            this.T.push(this.calculateT(i));
        }
    },

    searchAlgorithm: function (start, destination, mapList) {
        var startNode = mapList[start],
            queue = [];

        queue.push(start);
        startNode.visited = true;

        while (queue.length !== 0) {
            var index = queue.splice(0, 1)[0],
                currentNode = mapList[index];

            if (index === destination) {
                return this.reconstructPath(start, destination, mapList);
            }

            for (var i=0; i < currentNode.connectedTo.length; i++) {
                if (!mapList[currentNode.connectedTo[i]].visited) {
                    queue.push(currentNode.connectedTo[i]);
                    mapList[currentNode.connectedTo[i]].visited = true;
                    mapList[currentNode.connectedTo[i]].previous = currentNode.index;
                }
            }
        }

        return false;
    },

    breadthFirstSearch: function(start, destination, map){
        var result = this.searchAlgorithm(start, destination, map.list);

        map.resetVisited();

        return result;
    },

    reconstructPath: function(start, destination, mapList) {
        var current = destination,
            path = [];

        while (current !== start) {
            path.push(mapList[current].previous);
            current = mapList[current].previous;
        }

        return path;
    },

    createAdjacencyMatrix: function(mapList) {
        var table = {},
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
                array[k][node.connectedTo[l]] = 1;
            }
        }
        //console.table(table);

        return array;
    },

    initArray: function (dim) {
        var arr = [];

        for (var i=0; i < dim; i++) {
            var temp = [];
            for (var j=0; j < dim; j++) {
                temp.push(0);
            }

            arr.push(temp);
        }

        return arr;
    },

    createWeightedAdjacencyMatrix: function(map){
        var table = {},
            keys = Object.keys(map.list),
            array = this.initArray(keys.length);

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
                    path = this.breadthFirstSearch(node.index, nextNode.index, map),
                    distance = Array.isArray(path) ? path.length : 0;

                table[node.index][nextNode.index] = distance;
                array[k][l] = distance;
            }
        }
        //console.table(table);

        return array;
    },

    calculateS: function(){
        var table = this.createAdjacencyMatrix(this.map.list),
            dim = table.length,
            max = 0;

        for (var i=0; i < dim; i++) {
            var rowSum = 0;
            for (var j=0; j < dim; j++) {
                rowSum += table[i][j];
            }

            if (rowSum > max) {
                max = rowSum;
            }
        }

        for (var k=0; k < dim; k++) {
            var columnSum = 0;
            for (var l=0; l < dim; l++) {
                columnSum += table[l][k];
            }

            if (columnSum > max) {
                max = columnSum;
            }
        }

        return max;
    },

    calculateD: function(){
        var table = this.createWeightedAdjacencyMatrix(this.map),
            dim = table.length,
            max = 0;

        for (var i=0; i < dim; i++) {
            for (var j=0; j < dim; j++) {
                if (table[i][j] > max) {
                    max = table[i][j];
                }
            }
        }

        return max;
    },

    calculate_D: function(){
        var table = this.createWeightedAdjacencyMatrix(this.map),
            dim = table.length,
            sum = 0;

        for (var i=0; i < dim; i++) {
            for (var j=0; j < dim; j++) {
                sum += table[i][j];
            }
        }

        return sum/(dim*(dim-1));
    },

    calculateC: function(index){
        var D = this.D[index],
            S = this.S[index],
            n = Object.keys(this.map.list).length;

        return D*n*S;
    },

    calculateT: function(index){
        var _D = this._D[index],
            S = this.S[index];

        return (2*_D)/S;
    }
};