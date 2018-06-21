"use strict"

export default function InitService(CrudService, PathService) {
  const {
    billing,
    administrator,
    tenant,
    property,
    application,
    setting,
    help,
  } = PathService();

  console.log('paths.billing: ', billing);

  const billingProvider  = CrudService(billing );
  const adminProvider    = CrudService(administrator);
  const tenantProvider   = CrudService(tenant);
  const propProvider     = CrudService(property);
  const appProvider      = CrudService(application);
  const settingsProvider = CrudService(setting);
  const helpProvider     = CrudService(help);

  return function() {
    function Service() {}

    Service.prototype.getAllData = async function() {
      let administrators;
      let tenants;
      let properties;
      let settings;
      let applications;
      let billings;

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
  
    const initService = new Service()
    
    return initService;
  }
}

InitService.$inject = ['CrudService', 'PathService'];
