"use strict"

let app = angular.module('ngAdmin', []);

app.controller('dashboardCtrl', function($scope) {
    $scope.data = {
      test: "this is a test"
    }
});
