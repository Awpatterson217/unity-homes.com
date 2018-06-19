"use strict"

export default function InitService(CrudService) {
  const billingProvider  = CrudService(paths.billing);
  const adminProvider    = CrudService(paths.administrator);
  const tenantProvider   = CrudService(paths.tenant);
  const propProvider     = CrudService(paths.property);
  const appProvider      = CrudService(paths.application);
  const settingsProvider = CrudService(paths.administrator);
  const helpProvider     = CrudService(paths.administrator);

  return function() {
    function Service() {}

    Service.prototype.getAllData = async function() {
      let administrators;
      let tenants;
      let properties;
      let settings;
      let applicants;
      let billings;

      try {
        billings       = await billingProvider.getAll();
        administrators = await adminProvider.getAll();
        tenants        = await tenantProvider.getAll();
        properties     = await propProvider.getAll();
        applicants     = await appProvider.getAll();
        settings       = await settingsProvider.getAll();
        help           = await helpProvider.getAll();
      } catch (error) {
        throw error;
      }

      return {
        billings,
        administrators,
        tenants,
        properties,
        applicants,
        settings,
        help,
      }
    }

  
    const initService = new Service()
    
    return initService;
  }
}

InitService.$inject = ['CrudService'];