"use strict"

export default function StripeService(CrudService) {
  return function(key = '') {
    function Service(key) {
      this.key = key;
    }

    Service.prototype.get = function({ path }) {

    }
  
    const stripeService = new Service(key)
    
    return stripeService;
  }
}

StripeService.$inject = ['CrudService'];