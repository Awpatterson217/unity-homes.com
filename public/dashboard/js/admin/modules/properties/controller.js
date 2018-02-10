export default function propertiesCtrl($scope) {
  console.log("properties controller");
  $scope.test = 'This is a test from properties';
}

propertiesCtrl.$inject = ['$scope'];
