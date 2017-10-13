"use strict";

const home         = require('./home.js');
const properties   = require('./properties.js');
const apply        = require('./apply.js');
const contact      = require('./contact.js');
const register     = require('./register.js');
const login        = require('./login.js');
const logout       = require('./logout.js');
const admin        = require('./dashboard_admin/admin.js');
const unregTenants = require('./dashboard_admin/unregTenants/unregTenants.js');
const regTenants   = require('./dashboard_admin/regTenants/regTenants.js');
const tenant       = require('./dashboard_tenant/tenant.js');

module.exports = {
  home:         home,
  properties:   properties,
  apply:        apply,
  contact:      contact,
  register:     register,
  login:        login,
  logout:       logout,
  admin:        admin,
  unregTenants: unregTenants,
  regTenants:   regTenants,
  tenant:       tenant
}
