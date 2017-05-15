var generateIndex = (function () {
    return function () {
        var id = 1;
        return function(){
            return id++;
        }
    }();
})();