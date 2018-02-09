"use strict"

// applicant
app.service('readAllApplicant', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/applicant`);
}]);
app.service('readApplicant', ['getRequest', function(getRequest) {
  return email => getRequest(`/api/applicant/${email}`);
}]);
app.service('createApplicant', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/applicant`, data);
}]);
app.service('updateApplicant', ['putRequest', function(putRequest) {
  return (email, data) => putRequest(`/api/applicant/${email}`, data);
}]);
app.service('deleteApplicant', ['deleteRequest', function(deleteRequest) {
  return email => deleteRequest(`/api/applicant/${email}`);
}]);

// tenant
app.service('readAllTenant', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/tenant`);
}]);
app.service('readTenant', ['getRequest', function(getRequest) {
  return email => getRequest(`/api/tenant/${email}`);
}]);
app.service('createTenant', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/tenant`, data);
}]);
app.service('updateTenant', ['putRequest', function(putRequest) {
  return (email, data) => putRequest(`/api/tenant/${email}`, data);
}]);
app.service('deleteTenant', ['deleteRequest', function(deleteRequest) {
  return email => deleteRequest(`/api/tenant/${email}`);
}]);

// property
app.service('readAllProperty', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/property`);
}]);
app.service('readProperty', ['getRequest', function(getRequest) {
  return id => getRequest(`/api/property/${id}`);
}]);
app.service('createProperty', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/property`, data);
}]);
app.service('updateProperty', ['putRequest', function(putRequest) {
  return (id, data) => putRequest(`/api/property/${id}`, data);
}]);
app.service('deleteProperty', ['deleteRequest', function(deleteRequest) {
  return id => deleteRequest(`/api/property/${id}`);
}]);

// administrator
app.service('readAllAdmin', ['getRequest', function(getRequest) {
  return () => getRequest(`/api/administrator`);
}]);
app.service('readAdmin', ['getRequest', function(getRequest) {
  return email => getRequest(`/api/administrator/${email}`);
}]);
app.service('createAdmin', ['postRequest', function(postRequest) {
  return data => postRequest(`/api/administrator`, data);
}]);
app.service('updateAdmin', ['putRequest', function(putRequest) {
  return (email, data) => putRequest(`/api/administrator/${email}`, data);
}]);
app.service('deleteAdmin', ['deleteRequest', function(deleteRequest) {
  return email => deleteRequest(`/api/administrator/${email}`);
}]);

// GETS ALL DATA
app.service('initialize', ['$q', 'getRequest', function($q, getRequest) {
  const promises = [
    getRequest(`/api/applicant`),
    getRequest(`/api/tenant`),
    getRequest(`/api/administrator`),
    getRequest(`/api/property`),
  ];

  return () => $q.all(promises);
}]);

app.controller('dashboardCtrl', ['$scope', 'initialize', function($scope, initialize) {
  initialize().then( data => {
    $scope.applicants = data[0].data;
    $scope.tenants = data[1].data;
    $scope.administrators = data[2].data;
    $scope.properties = data[3].data;
  })
  .catch( error => {
    console.log('Error: ' + error);
  });
}]);
