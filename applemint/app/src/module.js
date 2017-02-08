'use strict';

(function(){
    angular.module('applemint', []);

    angular.module('applemint')
        .controller('MainCtrl', MainCtrl)
        .factory('DataService', DataService);
})();