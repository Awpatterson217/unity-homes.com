export default function tenantBillingsDetailsCtrl($scope, $stateParams) {
  console.log("billingsDetailsCtrl controller");

  $scope.date = $stateParams.date;
}

tenantBillingsDetailsCtrl.$inject = ['$scope', '$stateParams'];
