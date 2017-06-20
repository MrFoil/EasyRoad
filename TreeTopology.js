function TreeTopology(clusterConfig, map){
    this.map = map;
    this.lastLevelList = [];
    this.levelCounter = 0;
    this.initClusters(clusterConfig);
}

TreeTopology.prototype.initClusters = function(clusterConfig){
    var header = this.map.addCluster(clusterConfig);

    this.levelCounter++;
    this.lastLevelList.push(header);
};

TreeTopology.prototype.scaleUp = function (clusterConfig) {
    var newLastLevelList = [];

    for (var i=0; i < this.lastLevelList.length; i++) {
        var currentNode = this.lastLevelList[i],
            freshClusterHeader1 = this.map.addCluster(clusterConfig),
            freshClusterHeader2 = this.map.addCluster(clusterConfig);

        this.map.bidirectioncalConnect(currentNode, freshClusterHeader1);
        this.map.bidirectioncalConnect(currentNode, freshClusterHeader2);

        newLastLevelList.push(freshClusterHeader1);
        newLastLevelList.push(freshClusterHeader2);
    }

    this.lastLevelList = newLastLevelList;
};
