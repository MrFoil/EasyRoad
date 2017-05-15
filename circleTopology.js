function CircleTopology(topologyConfig, clusterConfig, numberOfNodes){
    this.TOPOLOGY_NODE_INDEX = 1;
    this.numberOfNodes = numberOfNodes;
    this.topologyNodes = [];

    this.init(topologyConfig, clusterConfig);
    this.scaleUp();
}

CircleTopology.prototype.init = function(topologyConfig, clusterConfig){
    var me = this,
        currentNode;

    for (var i=0; i < me.numberOfNodes; i++) {
        currentNode = new TopologyNode(topologyConfig, clusterConfig);
        currentNode.processHeaderNodes();
        
        me.topologyNodes.push(currentNode);
    }
};

CircleTopology.prototype.scaleUp = function(){
    var me = this,
        first, second;

    for (var i=1; i < me.topologyNodes.length; i++) {
        first  = me.topologyNodes[i-1].headerNodes[me.TOPOLOGY_NODE_INDEX];
        second = me.topologyNodes[i].headerNodes[me.TOPOLOGY_NODE_INDEX];

        map.bidirectioncalConnect(first.index, second.index);
    }
    
};