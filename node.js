function Node(){
    this.index = generateIndex();
    this.isHeader = false;
    this.visited = false;
    this.previous = null;
    this.connectedTo = [];
    
}

Node.prototype.connectTo = function(index){
    var me = this;

    if (me.index === 11 && index === 11) {
        console.error("wAHAED");
        debugger;
    }

    if (me.connectedTo.indexOf(index) === -1) {
        me.connectedTo.push(index);
    } else {
        console.error("Hello, this node", me, " is already connected to node", index);
    }
    
};

Node.prototype.findHeaders = function(map){
    var headers = [];

    for (var j=0; j < this.connectedTo.length; j++) {
        var hypotheticalHeaderNode = map.getNode(this.connectedTo[j]);

        if (hypotheticalHeaderNode.isHeader) {
            headers.push(hypotheticalHeaderNode)
        }
    }
    
    return headers;
}

Node.prototype.disconnect = function(nodeToRemove){
    var me = this,
        index = me.connectedTo.indexOf(nodeToRemove);

    if (index === -1) {
        console.error("Hello, I can't find such node, so I can't disconnect it")
    } else {
        return me.connectedTo.splice(index, 1);
    }
}

Node.prototype.reset = function(){
    this.visited = false;
    this.previous = null;
}
