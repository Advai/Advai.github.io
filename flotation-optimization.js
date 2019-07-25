agGrid.initialiseAgGridWithAngular1(angular);

var app = angular.module('floatation-optimization-app',['agGrid','pagination','ngMaterial']);

var data =  {
    "currentRecovery":89.2,
    "modelAccuracy": 95,
    "parameters": 
    [
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
    var columnDefs = [
        {headerName: 'Name', width: 100, field:'name'},
        {headerName: 'Units', width:100, field:'units'},
        {headerName:'Current', widh:100, field:'current'}
    ]
    $scope.gridOptions = {
        angularCompileRows: true,
        columnDefs: columnDefs,
        rowData: null,
        onGridReady: function() {
            $scope.gridOptions.api.setRowData(data);
            console.log($scope.gridOptions.rowData);
        }
    };

    $scope.Load = function() {
        $scope.currentRecovery = data.currentRecovery;
    $scope.modelAccuracy = data.modelAccuracy;
    $scope.simRecovery = null;
    $scope.params = data.parameters;
    $scope.params.forEach(function(res) {
        res.newVal = angular.copy(res.current);
    });
    };

    $scope.Simulate = function() {
        console.log("Simulation sent to RapidMiner");
    };
    


}]);









