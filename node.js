function Node(){
    this.index = generateIndex();
    this.isHeader = false;
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

