export default function tenantBillingCtrl($scope, $state) {
  console.log("billing controller");

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
      email: 'test@main.com',
      date: '12/56/2019',
    }
  });
}

tenantBillingCtrl.$inject = ['$scope', '$state'];
