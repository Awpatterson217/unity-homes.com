export default function dashboardCtrl($scope) {
  console.log("dashboard controller");
  $scope.test = 'This is a test from dashboard';
}

dashboardCtrl.$inject = ['$scope'];
