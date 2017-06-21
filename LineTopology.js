function LineTopology(topologyConfig, clusterConfig, map) {
    this.map = map;
    this.headerNodesList = [];
    this.initClusters(topologyConfig, clusterConfig);
}

LineTopology.prototype.initClusters = function(topologyConfig, clusterConfig){
    for (var i=0; i < topologyConfig.length; i++) {
        this.map.addCluster(clusterConfig);
    }
    this.processHeaderNodes();
};

LineTopology.prototype.scaleUp = function(clusterConfig, map){
    this.map.addCluster(clusterConfig);

    this.storeHeaderNodes();
    this.cleanUpHeaderConnections(map);
    this.interconnectHeaders();
};

LineTopology.prototype.processHeaderNodes = function(){
    this.storeHeaderNodes();
    this.interconnectHeaders();
};

LineTopology.prototype.storeHeaderNodes = function(){
    var me = this,
        keys = Object.keys(this.map.list);

    me.headerNodesList = [];

    for (var i=0; i < keys.length; i++) {
        var currentIndex = keys[i],
            currentNode = this.map.list[currentIndex];

        if (currentNode.isHeader) {
            me.headerNodesList.push(currentNode);
        }
    }
};

LineTopology.prototype.cleanUpHeaderConnections = function(){
    var me = this;

    for (var i=0; i < me.headerNodesList.length; i++) {
        var currentHeaderNodeIndex = me.headerNodesList[i].index,
            currentHeaderNode = this.map.list[currentHeaderNodeIndex],
            connectedHeadersList = currentHeaderNode.findHeaders(this.map);

        for (var j=0; j < connectedHeadersList.length; j++) {
            var index = connectedHeadersList[j].index;

            currentHeaderNode.disconnect(index);
        }
    }
};

LineTopology.prototype.interconnectHeaders = function(){
    var me = this,
        first, second;

    for (var i=1; i < me.headerNodesList.length; i++) {
        first = me.headerNodesList[i-1];
        second = me.headerNodesList[i];

        this.map.bidirectioncalConnect(first.index, second.index);
    }
};

