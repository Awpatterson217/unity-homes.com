export default function tenantBillingCtrl($scope, $state) {
  $scope.viewDetails = function({ date }) {
    $state.go('root.tenant.billingsDetails', { date });
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
      amount: '1080',
    },{
      status: 'pending',
      amount: '1080',
    },{
      status: 'pending',
      amount: '1080',
    },{
      status: 'success',
      amount: '1080',
    },{
      status: 'success',
      amount: '1080',
    },{
      status: 'failed',
      amount: '1080',
    }]
  };

  $scope.data.billings = $scope.data.billings.map( ({ status, amount }) => {
    return {
      status,
      amount,
      date: '12/56/2019',
    }
  });
}

tenantBillingCtrl.$inject = ['$scope', '$state'];
