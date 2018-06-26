export default function applicantsCtrl($scope, $state) {
  $scope.viewApp = function({ email }) {
    $state.go('root.admin.applicantsApplication', { email });
  }

  $scope.downloadApp = function({ email }) {
    // TODO
  }

  $scope.approveApp = function({ email }) {
    // TODO
  }

  $scope.denyApp = function({ email }) {
    // TODO
  }

  $scope.data = {
    applicants: [{
      firstName: 'Adam',
      lastName: 'Patterson',
      email: 'fakeEmail@mail.com',
      timestamp: '1517351875',
      application: {}
    },{
      firstName: 'Bob',
      lastName: 'Fake',
      email: 'fakeEmail@mail.com',
      timestamp: '1518051875',
      application: {}
    },{
      firstName: 'Frank',
      lastName: 'Jackson',
      email: 'fakeEmail@mail.com',
      timestamp: '1517351875',
      application: {}
    },{
      firstName: 'Bob',
      lastName: 'Saget',
      email: 'fakeEmail@mail.com',
      timestamp: '1518051875',
      application: {}
    },{
      firstName: 'Mark',
      lastName: 'Zuckerberg',
      email: 'fakeEmail@mail.com',
      timestamp: '1517351875',
      application: {}
    },{
      firstName: 'Donald',
      lastName: 'Trump',
      email: 'fakeEmail@mail.com',
      timestamp: '1517351875',
      application: {}
    },{
      firstName: 'Hugo',
      lastName: 'Boss',
      email: 'fakeEmail@mail.com',
      timestamp: '1517351875',
      application: {}
    },{
      firstName: 'Jennifer',
      lastName: 'Lawrence',
      email: 'fakeEmail@mail.com',
      timestamp: '1517351875',
      application: {}
    },{
      firstName: 'Scott',
      lastName: 'Hamilton',
      email: 'fakeEmail@mail.com',
      timestamp: '1518051875',
      application: {}
    },{
      firstName: 'Tom',
      lastName: 'Brady',
      email: 'fakeEmail@mail.com',
      timestamp: '1517351875',
      application: {}
    },{
      firstName: 'Chip',
      lastName: 'Munk',
      email: 'fakeEmail@mail.com',
      timestamp: '1517351875',
      application: {}
    }]
  };
  $scope.isNew = function(timestamp) {
    const age = Date.now() / 1000 - timestamp;
    if (age < 604800) {
      return ['success'];
    }
    return 'default';
  }
}

applicantsCtrl.$inject = ['$scope', '$state'];
