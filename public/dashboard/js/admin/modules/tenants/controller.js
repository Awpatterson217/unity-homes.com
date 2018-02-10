export default function tenantsCtrl($scope) {
  console.log("tenants controller");
  $scope.data = {
    tenants: [{
      firstName: 'Adam',
      lastName: 'Patterson',
      registered: true
    },{
      firstName: 'Lane',
      lastName: 'Wilson',
      registered: true
    },{
      firstName: 'Frank',
      lastName: 'Jackson',
      registered: false
    },{
      firstName: 'Bob',
      lastName: 'Saget',
      registered: true
    },{
      firstName: 'Mark',
      lastName: 'Zuckerberg',
      registered: true
    },{
      firstName: 'Donald',
      lastName: 'Trump',
      registered: false
    },{
      firstName: 'Hugo',
      lastName: 'Boss',
      registered: true
    },{
      firstName: 'Jennifer',
      lastName: 'Lawrence',
      registered: true
    },{
      firstName: 'Scott',
      lastName: 'Hamilton',
      registered: false
    },{
      firstName: 'Tom',
      lastName: 'Brady',
      registered: true
    },{
      firstName: 'Chip',
      lastName: 'Munk',
      registered: true
    }]
  };
  // For test condition of important events
  // e.g. rent not paid
  $scope.getClass = function(bool) {
    if(!bool)
      return 'warning';
    return 'default';
  }
}

tenantsCtrl.$inject = ['$scope'];
