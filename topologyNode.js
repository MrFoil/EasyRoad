function TopologyNode(topologyConfig, clusterConfig){
    this.headerNodes = [];
    this.initClusters(topologyConfig, clusterConfig);
}

TopologyNode.prototype.initClusters = function(topologyConfig, clusterConfig){
    for (var i=0; i < topologyConfig.length; i++) {
        map.addCluster(clusterConfig);
    }
};

TopologyNode.prototype.processHeaderNodes = function(){
    this.storeHeaderNodes();
    this.interconnectHeaders();
};

TopologyNode.prototype.storeHeaderNodes = function(){
    var me = this,
        keys = Object.keys(map.list);

    for (var i=0; i < keys.length; i++) {
        var currentIndex = keys[i],
            currentNode = map.list[currentIndex];

        if (currentNode.isHeader) {
            me.headerNodes.push(currentNode);
        }
    }
};

TopologyNode.prototype.interconnectHeaders = function(){
    var me = this,
        first, second;
    
    for (var i=1; i < me.headerNodes.length; i++) {
        first = me.headerNodes[i-1];
        second = me.headerNodes[i];
        
        map.bidirectioncalConnect(first.index, second.index);
    }
    
    first = me.headerNodes[me.headerNodes.length-1];
    second = me.headerNodes[0];

    map.bidirectioncalConnect(first.index, second.index);
};

