"use strict"

let app = angular.module('ngAdmin', []);

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
app.service('readAdmin', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/property/read`);
}]);

app.service('readUnregUser', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/unregisteredUser/read`);
}]);

app.service('readRegUser', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/registeredUser/read`);
}]);

app.service('readProp', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/property/read`);
}]);

// CREATE
app.service('createAdmin', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/create`, data);
}]);
app.service('createUnregUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/unregisteredUser/create`, data);
}]);
app.service('createRegUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/registeredUser/create`, data);
}]);
app.service('createProp', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/create`, data);
}]);

// DELETE
app.service('deleteAdmin', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/delete`, data);
}]);

app.service('deleteUnregUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/unregisteredUser/delete`, data);
}]);

app.service('deleteRegUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/registeredUser/delete`, data);
}]);

app.service('deleteProp', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/delete`, data);
}]);

// UPDATE
app.service('updateAdmin', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/update`, data);
}]);

app.service('updateUnregUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/unregisteredUser/update`, data);
}]);

app.service('updateRegUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/registeredUser/update`, data);
}]);

app.service('updateProp', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/update`, data);
}]);

// GETS ALL DATA
app.service('initialize', ['$q', 'getRequest', function($q, getRequest) {
  const promises = [
    getRequest(`/api/unregisteredUsers/read`),
    getRequest(`/api/registeredUsers/read`),
    getRequest(`/api/administrators/read`),
    getRequest(`/api/properties/read`)
  ];

  return () => $q.all(promises);
}]);

app.controller('dashboardCtrl', ['$scope', 'initialize', function($scope, initialize) {
  initialize().then( data => {
    $scope.unregisteredUsers = data[0].data;
    $scope.registeredUsers = data[1].data;
    $scope.administrators = data[2].data;
    $scope.properties = data[3].data;
  })
  .catch( error => {
    console.log('Error: ' + error);
  });
}]);
