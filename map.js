function Map(){
    this.list = {};
    this.clusterCounter = 1;
    zeroUpIndex();
}

Map.prototype.initCluster = function(config){
    for (var i=0; i < config.length; i++) {
        var currentNode = new Node(),
            headerOfCluster;

        for (var j=0; j < config[i].length; j++) {
            if ((i === 0) && (j === 0)) {
                currentNode.isHeader = true;
                headerOfCluster = currentNode.index;
            }
            currentNode.connectTo(config[i][j]);
        }
        this.list[currentNode.index] = currentNode;
    }

    return headerOfCluster;
};

Map.prototype.addCluster = function(config){
    var me = this,
        headOfCluster;
    
    if (me.clusterCounter === 1) {
        headOfCluster = me.initCluster(config);
    } else {
        for (var i=0; i < config.length; i++) {
            var currentNode = new Node();

            for (var j=0; j < config[i].length; j++) {
                if ((i === 0) && (j === 0)) {
                    currentNode.isHeader = true;
                    headOfCluster = currentNode.index;
                }
                currentNode.connectTo(config[i][j] + me.getLastNode().index-i);
            }
            me.list[currentNode.index] = currentNode;
        }
    }

    me.clusterCounter++;

    return headOfCluster;
};

Map.prototype.getLastNode = function(){
    var keys = Object.keys(this.list);

    return this.list[keys[keys.length-1]];
};

Map.prototype.getNode = function(index){
    return this.list[index];
};

Map.prototype.bidirectioncalConnect = function(firstNode, secondNode){
    this.list[firstNode].connectTo(secondNode);
    this.list[secondNode].connectTo(firstNode);
};

Map.prototype.resetVisited = function(){
    var me = this,
        keys = Object.keys(me.list);

    for (var i=0; i < keys.length; i++) {
        var key = keys[i];

        me.list[key].reset();
    }
};
