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


// unregisteredUser
app.service('readUnregUser', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/unregisteredUser`);
}]);
app.service('createUnregUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/unregisteredUser`, data);
}]);
app.service('updateUnregUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/unregisteredUser`, data);
}]);
app.service('deleteUnregUser', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/unregisteredUser`, data);
}]);

// tenant
app.service('readRegUser', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/tenant`);
}]);
app.service('createTenant', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/tenant`, data);
}]);
app.service('updateTenant', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/tenant`, data);
}]);
app.service('deleteTenant', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/tenant`, data);
}]);

// property
app.service('readProp', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/property/read`);
}]);
app.service('createProp', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/create`, data);
}]);
app.service('updateProp', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/update`, data);
}]);
app.service('deleteProp', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property/delete`, data);
}]);

// administrator
app.service('readAdmin', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/administrator/read`);
}]);
app.service('createAdmin', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/administrator/create`, data);
}]);
app.service('updateAdmin', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/administrator/update`, data);
}]);
app.service('deleteAdmin', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/administrator/delete`, data);
}]);

// GETS ALL DATA
app.service('initialize', ['$q', 'getRequest', function($q, getRequest) {
  const promises = [
    getRequest(`/api/unregisteredUser`),
    getRequest(`/api/tenant`),
    getRequest(`/api/administrator`),
    getRequest(`/api/property`)
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
