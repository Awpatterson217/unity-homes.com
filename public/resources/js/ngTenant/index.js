"use strict"

let app = angular.module('ngTenant', []);

app.service('getRequest', ['$http', function($http) {
  return function(url) {
    return $http({
      method: 'GET',
      url,
    });
  } 
}]);

app.service('postRequest', ['$http', function($http) {
  return function(url, data) {
    return $http({
      method: 'POST',
      url,
      data
    });
  } 
}]);

// READ
app.service('readProp', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/property/read`);
}]);

// UPDATE
app.service('updateRegUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/registeredUser/update`, data);
}]);



app.controller('dashboardCtrl', ['$scope', function($scope) {
  console.log("ngTenant initialized");
}]);
