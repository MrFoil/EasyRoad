function CircleTopology(topologyConfig, clusterConfig){
    this.headerNodesList = [];
    this.initClusters(topologyConfig, clusterConfig);
}

CircleTopology.prototype.initClusters = function(topologyConfig, clusterConfig){
    for (var i=0; i < topologyConfig.length; i++) {
        map.addCluster(clusterConfig);
    }
    this.processHeaderNodes();
};

CircleTopology.prototype.addNode = function(clusterConfig){
    map.addCluster(clusterConfig);

    this.storeHeaderNodes();
    this.cleanUpHeaderConnections();
    this.interconnectHeaders();
};

CircleTopology.prototype.processHeaderNodes = function(){
    this.storeHeaderNodes();
    this.interconnectHeaders();
};

CircleTopology.prototype.storeHeaderNodes = function(){
    var me = this,
        keys = Object.keys(map.list);

    me.headerNodesList = [];

    for (var i=0; i < keys.length; i++) {
        var currentIndex = keys[i],
            currentNode = map.list[currentIndex];

        if (currentNode.isHeader) {
            me.headerNodesList.push(currentNode);
        }
    }
};

CircleTopology.prototype.cleanUpHeaderConnections = function(){
    var me = this;
    
    for (var i=0; i < me.headerNodesList.length; i++) {
        var currentHeaderNodeIndex = me.headerNodesList[i].index,
            currentHeaderNode = map.list[currentHeaderNodeIndex],
            connectedHeadersList = currentHeaderNode.findHeaders();

        for (var j=0; j < connectedHeadersList.length; j++) {
            var index = connectedHeadersList[j].index;

            currentHeaderNode.disconnect(index);
        }
    }
};

CircleTopology.prototype.interconnectHeaders = function(){
    var me = this,
        first, second;
    
    for (var i=1; i < me.headerNodesList.length; i++) {
        first = me.headerNodesList[i-1];
        second = me.headerNodesList[i];
        
        map.bidirectioncalConnect(first.index, second.index);
    }
    
    first = me.headerNodesList[me.headerNodesList.length-1];
    second = me.headerNodesList[0];

    map.bidirectioncalConnect(first.index, second.index);
};

