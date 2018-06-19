export default function billingDetailsCtrl($scope, $stateParams) {
  console.log("billingsDetailsCtrl controller");

  // Will contain details about a particular billing transaction

  $scope.date = $stateParams.date;
  $scope.email = $stateParams.email;
}

billingDetailsCtrl.$inject = ['$scope', '$stateParams'];
