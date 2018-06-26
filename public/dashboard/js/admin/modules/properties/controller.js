export default function propertiesCtrl($scope, $state) {
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
    properties: [{
      occupied: 'true'
    },{
      occupied: 'true'
    },{
      occupied: 'false'
    },{
      occupied: 'true'
    },{
      occupied: 'true'
    },{
      occupied: 'true'
    },{
      occupied: 'true'
    },{
      occupied: 'true'
    },{
      occupied: 'false'
    },{
      occupied: 'true'
    }]
  };
  $scope.data.properties = $scope.data.properties.map( ({ occupied }) => {
    const isOccupied = occupied === 'true'
      ? true
      : false;

    return {
      id: 'testId',
      occupied: isOccupied,
      street: '123 Main St.',
      city: 'Champaign',
      state: 'IL',
      zip: '61820'
    }
  });
}

propertiesCtrl.$inject = ['$scope', '$state'];
