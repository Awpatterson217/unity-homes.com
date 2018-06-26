"use strict"

export default function StripeService(angularLoad, $window) {
  return function(STRIPE_URL = '') {
    function Service(STRIPE_URL) {
      this.STRIPE_URL = STRIPE_URL;
      this.stripe;
    }

    Service.prototype.init = async function(API_KEY) {
      let success = false;

      try {
        await angularLoad.loadScript(this.STRIPE_URL);
        this.stripe = $window.Stripe(API_KEY);

        success = true;
      } catch(error) {
        throw error;
      }

      return success;
    }

    return new Service(STRIPE_URL);
  }
}

StripeService.$inject = ['angularLoad', '$window'];
