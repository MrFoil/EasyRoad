var _INDEX = 1;
/*
var generateIndex = (function () {
    return function () {
        var id = 1;
        return function(){
            return id++;
        }
    }();
})();*/

var generateIndex = function () {
    return _INDEX++;
};

var zeroUpIndex = function () {
    _INDEX=1;
};

function isDefined(o){
    return typeof o !== "undefined"; 
}