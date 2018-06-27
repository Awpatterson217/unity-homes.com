export default function propertiesCtrl($scope, $state, CacheService) {
  const { properties } = CacheService().get('data');

  console.log('properties: ', properties);

  $scope.data = {
    properties
  };

  $scope.viewDetails = function({ id }) {
    $state.go('root.admin.propertiesDetails', { id });
  }

  $scope.removeProperty = function({ email }) {
    // TODO
    // Use RestService
  }

  $scope.addProperty = function({ email }) {
    // TODO
    // $state.go('root.admin.addProperty', { id });
  }

  $scope.data = {
    properties
  };
}

propertiesCtrl.$inject = ['$scope', '$state', 'CacheService'];
