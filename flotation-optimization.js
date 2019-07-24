var app = angular.module('floatation-optimization-app',['dataGrid','pagination','ngMaterial']);
var data = { 
    "parameters" : [
        { "name": "Fatty Acid", "units": "#/Ton", "current": 10 },

        {"name": "KPI # 2", "units": "ABC", "current": 20 },
        {"name": "KPI # 3", "units": "ABC", "current": 30 },
        {"name": "KPI # 4", "units": "ABC", "current": 40 },
        {"name": "KPI # 5", "units": "ABC", "current": 50 },
        {"name": "KPI # 6", "units": "ABC", "current": 60 },
        {"name": "KPI # 7", "units": "ABC", "current": 70 },
        {"name": "KPI # 8", "units": "ABC", "current": 80 },
        {"name": "KPI # 9", "units": "ABC", "current": 90 },
        {"name": "KPI # 10", "units": "ABC", "current":  100}
    ] 
};

app.controller('flotation-optimiztion', ['$scope', '$http', function ($scope, $http) {
    $scope.gridOptions = {
        data: []
    };
    $scope.gridOptions.data = data;

}]);

