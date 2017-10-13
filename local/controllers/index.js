"use strict";

const home       = require('./home.js');
const properties = require('./properties.js');
const apply      = require('./apply.js');
const contact    = require('./contact.js');
const register   = require('./register.js');
const login      = require('./login.js');
const logout     = require('./logout.js');
const admin      = require('./dashboard_admin/admin.js');
const adminUsers = require('./dashboard_admin/adminUsers/adminUsers.js');
const unregUsers = require('./dashboard_admin/unregUsers/unregUsers.js');
const regUsers   = require('./dashboard_admin/regUsers/regUsers.js');
const props      = require('./dashboard_admin/props/props.js');
const tenant     = require('./dashboard_tenant/tenant.js');

module.exports = {
  home      : home,
  properties: properties,
  apply     : apply,
  contact   : contact,
  register  : register,
  login     : login,
  logout    : logout,
  admin     : admin,
  unregUsers: unregUsers,
  adminUsers: adminUsers,
  regUsers  : regUsers,
  props     : props,
  tenant    : tenant
}
