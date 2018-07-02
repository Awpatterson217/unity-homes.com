export default function propertiesCtrl($scope, $state, CacheService) {
  const { properties } = CacheService().get('data');

  console.log('properties: ', properties);

  $scope.data = {
    properties
  };

  $scope.viewDetails = function({ street }) {
    $state.go('root.admin.propertiesDetails', { street });
  }

  $scope.removeProperty = function({ street }) {
    console.log('street: ', street);
    // TODO
    // Use RestService
  }

  $scope.addProperty = function(prop) {
    console.log('prop: ', prop);
    // TODO
    // $state.go('root.admin.addProperty', { id });
  }
}

propertiesCtrl.$inject = ['$scope', '$state', 'CacheService'];
