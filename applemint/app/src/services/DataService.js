'use strict';

function DataService($http, $q){
    var DataService = {
        items: []
    };

    DataService.getAllItems = function(){
        var dfd = $q.defer();
        $http
            .get('app/assets/data/works.json')
            .then(function(response){
                DataService.items = response.data;
                dfd.resolve(DataService.items);
            });
        return dfd.promise;
    };

    return DataService;
};