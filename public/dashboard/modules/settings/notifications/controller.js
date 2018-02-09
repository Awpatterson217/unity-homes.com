export default function notificationsCtrl($scope) {
  console.log("settings controller");
  $scope.test = 'This is a test from settings';
}

notificationsCtrl.$inject = ['$scope'];
