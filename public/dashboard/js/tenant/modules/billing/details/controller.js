export default function tenantBillingsDetailsCtrl($scope, $stateParams) {
  $scope.date = $stateParams.date;
}

tenantBillingsDetailsCtrl.$inject = ['$scope', '$stateParams'];
