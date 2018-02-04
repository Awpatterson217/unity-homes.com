"use strict";

const home        = require('./home');
const listings    = require('./listings');
const apply       = require('./apply');
const contact     = require('./contact');
const register    = require('./register');
const login       = require('./login');
const logout      = require('./logout');
const admin       = require('./dashboard/admin');
const data        = require('./dashboard/admin/data');
const adminUsers  = require('./dashboard/admin/adminUsers');
const users       = require('./dashboard/admin/users');
const properties  = require('./dashboard/admin/properties');
const aBilling    = require('./dashboard/admin/billing');
const tenant      = require('./dashboard/tenant');
const tBilling    = require('./dashboard/tenant/billing');
const application = require('./dashboard/tenant/application');

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
};
