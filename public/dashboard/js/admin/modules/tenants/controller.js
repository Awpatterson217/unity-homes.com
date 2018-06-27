export default function tenantsCtrl($scope, $state, CacheService) {
  const { tenants } = CacheService().get('data');

  console.log('Tenants: ', tenants);

  $scope.data = {
    tenants
  };

  $scope.viewDetails = function({ email }) {
    $state.go('root.admin.tenantDetails', { email });
  }

  $scope.sendCode = function({ email }) {
    console.log('sendCode: ', email);
    // TODO
  }

  $scope.removeTenant = function({ email }) {
    console.log('removeTenant: ', email);
    // TODO
  }

  // For test condition of important events
  // e.g. rent not paid
  $scope.getClass = function(bool) {
    if(!bool)
      return 'warning';
    return 'default';
  }
}

tenantsCtrl.$inject = ['$scope', '$state', 'CacheService'];
