"use strict"

const angular = require('angular');

let app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.data = {
      test: "this is a test"
    }
});