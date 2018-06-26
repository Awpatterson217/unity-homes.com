export default function tenantsCtrl($scope, $state) {
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

  const data = {
    tenants: [{
      firstName: 'Adam',
      lastName: 'Patterson',
      registered: 'true'
    },{
      firstName: 'Lane',
      lastName: 'Wilson',
      registered: 'true'
    },{
      firstName: 'Frank',
      lastName: 'Jackson',
      registered: 'false'
    },{
      firstName: 'Bob',
      lastName: 'Saget',
      registered: 'true'
    },{
      firstName: 'Mark',
      lastName: 'Zuckerberg',
      registered: 'true'
    },{
      firstName: 'Donald',
      lastName: 'Trump',
      registered: 'false'
    },{
      firstName: 'Hugo',
      lastName: 'Boss',
      registered: 'true'
    },{
      firstName: 'Jennifer',
      lastName: 'Lawrence',
      registered: 'true'
    },{
      firstName: 'Scott',
      lastName: 'Hamilton',
      registered: 'false'
    },{
      firstName: 'Tom',
      lastName: 'Brady',
      registered: 'true'
    },{
      firstName: 'Chip',
      lastName: 'Munk',
      registered: 'true'
    }]
  };
  $scope.data = {
    tenants: data.tenants.map(({ firstName, lastName, registered }) => {
      const isRegistered = registered === 'true'
        ? true
        : false;

      return {
        firstName,
        lastName,
        email: 'test@mail.com',
        registered: isRegistered,
        street: '123 Main St.',
        city: 'Champaign',
        state: 'IL',
        zip: '61820'
      }
    })
  }
  // For test condition of important events
  // e.g. rent not paid
  $scope.getClass = function(bool) {
    if(!bool)
      return 'warning';
    return 'default';
  }
}

tenantsCtrl.$inject = ['$scope', '$state'];
