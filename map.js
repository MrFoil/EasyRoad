function Map(){
    this.list = {};
    this.clusterCounter = 1;
}

Map.prototype.initCluster = function(config){
    for (var i=0; i < config.length; i++) {
        var currentNode = new Node();

        for (var j=0; j < config[i].length; j++) {
            if ((i === 0) && (j === 0)) {
                currentNode.isHeader = true;
            }
            currentNode.connectTo(config[i][j]);
        }
        this.list[currentNode.index] = currentNode;
    }
};

Map.prototype.addCluster = function(config){
    var me = this;
    
    if (me.clusterCounter === 1) {
        me.initCluster(config);
    } else {
        for (var i=0; i < config.length; i++) {
            var currentNode = new Node();

            for (var j=0; j < config[i].length; j++) {
                if ((i === 0) && (j === 0)) {
                    currentNode.isHeader = true;
                }
                currentNode.connectTo(config[i][j] + me.getLastNode().index-i);
            }
            me.list[currentNode.index] = currentNode;
        }
    }

    me.clusterCounter++;
};

Map.prototype.getLastNode = function(){
    var keys = Object.keys(this.list);

    return this.list[keys[keys.length-1]];
};

Map.prototype.bidirectioncalConnect = function(firstNode, secondNode){
    this.list[firstNode].connectTo(secondNode);
    this.list[secondNode].connectTo(firstNode);
};