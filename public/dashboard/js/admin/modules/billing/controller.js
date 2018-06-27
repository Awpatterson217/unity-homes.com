export default function billingCtrl($scope, $state, CacheService) {
  $scope.viewDetails = function({ date, email }) {
    $state.go('root.admin.billingDetails', { date, email });
  }

  $scope.adjustPayment = function({ email }) {
    // TODO
  }

  $scope.downloadInvoice = function({ email }) {
    // TODO
  }

  $scope.data = {
    billings: [{
      status: 'pending',
      amount: '1500',
    },{
      status: 'pending',
      amount: '1400',
    },{
      status: 'pending',
      amount: '1650.40',
    },{
      status: 'success',
      amount: '850',
    },{
      status: 'success',
      amount: '450',
    },{
      status: 'failed',
      amount: '1080',
    },{
      status: 'success',
      amount: '1080',
    },{
      status: 'success',
      amount: '1400',
    },{
      status: 'failed',
      amount: '1080',
    },{
      status: 'success',
      amount: '1400',
    },{
      status: 'success',
      amount: '1080',
    }]
  };
  $scope.data.billings = $scope.data.billings.map( ({ status, amount }) => {
    return {
      status,
      amount,
      date: '1264533',
      email: 'testing123@mail.com',
      street: '123 Main St.',
      city: 'Champaign',
      state: 'IL',
      zip: '61820'
    }
  });
}

billingCtrl.$inject = ['$scope', '$state', 'CacheService'];
