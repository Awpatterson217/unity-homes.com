"use strict";

const home        = require('./home.js');
const listings    = require('./listings.js');
const apply       = require('./apply.js');
const contact     = require('./contact.js');
const register    = require('./register.js');
const login       = require('./login.js');
const logout      = require('./logout.js');
const admin       = require('./dashboard/admin/index.js');
const data        = require('./dashboard/admin/data/index.js');
const adminUsers  = require('./dashboard/admin/adminUsers/index.js');
const users       = require('./dashboard/admin/users/index.js');
const properties  = require('./dashboard/admin/properties/index.js');
const aBilling    = require('./dashboard/admin/billing/index.js');
const tenant      = require('./dashboard/tenant/index.js');
const tBilling    = require('./dashboard/tenant/billing/index.js');
const application = require('./dashboard/tenant/application/index.js');

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
  aBilling,
  tBilling,
  tenant,
  application
}
