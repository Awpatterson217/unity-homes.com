export default function accountCtrl($scope) {
  console.log("settings controller");
  $scope.test = 'This is a test from settings';
}

accountCtrl.$inject = ['$scope'];
