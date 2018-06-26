"use strict"

export default function InitService(CrudService, PathService, StripeService) {
  const {
    stripeUrl,
    // billing,
    administrator,
    tenant,
    // property,
    // application,
    // setting,
    // help,
  } = PathService();

  const stripeService = StripeService(stripeUrl);

  // const billingProvider  = CrudService(billing);
  const adminProvider    = CrudService(administrator);
  const tenantProvider   = CrudService(tenant);
  // const propProvider     = CrudService(property);
  // const appProvider      = CrudService(application);
  // const settingsProvider = CrudService(setting);
  // const helpProvider     = CrudService(help);

  return function() {
    function Service() {}
    Service.prototype.init = async function(type, STRIPE_API_KEY) {
      let data;
      let stripeSuccess;

      try {
        stripeSuccess = await stripeService.init(STRIPE_API_KEY);

        if (type === 'tenant') {
          data = await this.getTenantData();
        }

        if (type === 'admin') {
          data = await this.getAdminData();
        }
      } catch (error) {
        throw error;
      }
      
      return {
        data,
        stripeSuccess
      }
    }

    Service.prototype.getTenantData = async function() {
      // let settings;
      // let billings;

      try {
        // billings       = await billingProvider.getAll();
        // settings       = await settingsProvider.getAll();
      } catch (error) {
        throw error;
      }

      return {
        // billings,
        // settings: settings.data,
      }
    } 

    Service.prototype.getAdminData = async function() {
      let administrators;
      let tenants;
      // let properties;
      // let settings;
      // let applications;
      // let billings;

      try {
        // billings       = await billingProvider.getAll();
        administrators = await adminProvider.getAll();
        tenants        = await tenantProvider.getAll();
        // properties     = await propProvider.getAll();
        // applications   = await appProvider.getAll();
        // settings       = await settingsProvider.getAll();
        // help           = await helpProvider.getAll();
      } catch (error) {
        throw error;
      }

      return {
        // billings,
        administrators: administrators.data,
        tenants: tenants.data,
        // properties: properties.data,
        // applications: applications.data,
        // settings: settings.data,
        // help: help.data,
      }
    }

    return new Service();
  }
}

InitService.$inject = ['CrudService', 'PathService', 'StripeService'];
