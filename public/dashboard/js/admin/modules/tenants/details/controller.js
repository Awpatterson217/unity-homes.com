export default function tenantsDetailsCtrl($scope, $stateParams, CacheService) {
  console.log("Tenant Details Controller");

  $scope.email = $stateParams.email;
}

tenantsDetailsCtrl.$inject = ['$scope', '$stateParams', 'CacheService'];
