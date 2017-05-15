var pentaClusterConfig = [
    [2, 3, 4],
    [1, 5, 9],
    [1, 5, 6, 7, 8],
    [1, 6, 10],
    [2, 3, 7, 6, 8],
    [3, 4, 5, 7, 8],
    [9, 5, 8, 6, 3],
    [7, 5, 3, 6, 10],
    [2, 7, 10],
    [8, 4, 9]
];

/*var starConfig = [
    [2, 3, 4, 5],
    [1, 3, 4, 5],
    [1, 2, 4, 5],
    [1, 2, 3, 5],
    [1, 2, 3, 4]
];

var trianglesConfig = [
    [2, 5, 6],
    [1, 3, 4],
    [2, 4, 5],
    [2, 3, 6],
    [1, 6, 3],
    [4, 1, 5]
];*/

var circleTopologyConfig = [
    [2, 6],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
    [5, 1]
];

var map = new Map();
var circleTopology = new CircleTopology(circleTopologyConfig, pentaClusterConfig, 1);


/*map.addCluster(pentaConf);
map.addCluster(pentaConf);
map.addCluster(pentaConf);
map.addCluster(pentaConf);
map.addCluster(pentaConf);
map.addCluster(pentaConf);


map.bidirectioncalConnect(1, 11);
map.bidirectioncalConnect(11, 16);
map.bidirectioncalConnect(16, 26);
map.bidirectioncalConnect(26, 31);
map.bidirectioncalConnect(31, 41);
map.bidirectioncalConnect(41, 46);
map.bidirectioncalConnect(46, 52);*/



console.error(map, circleTopology);
