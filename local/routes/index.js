"use strict";

const home        = require('./home.js');
const listings    = require('./listings.js');
const apply       = require('./apply.js');
const contact     = require('./contact.js');
const register    = require('./register.js');
const login       = require('./login.js');
const logout      = require('./logout.js');
const admin       = require('./dashboard_admin/admin.js');
const data        = require('./dashboard_admin/data/data.js');
const adminUsers  = require('./dashboard_admin/adminUsers/adminUsers.js');
const users       = require('./dashboard_admin/users/users.js');
const properties  = require('./dashboard_admin/properties/properties.js');
const billing     = require('./dashboard_admin/billing/billing.js');
const tenant      = require('./dashboard_tenant/tenant.js');
const application = require('./dashboard_tenant/application/application.js');

module.exports = {
  home,
  listings,
  apply,
  contact,
  register,
  login,
  logout,
  admin,
  data,
  users,
  adminUsers,
  properties,
  billing,
  tenant,
  application
}
