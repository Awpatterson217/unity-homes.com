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
const users      = require('./dashboard_admin/users/users.js');
const props      = require('./dashboard_admin/props/props.js');
const propImages = require('./dashboard_admin/propImages/propImages.js');
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
  users     : users,
  adminUsers: adminUsers,
  props     : props,
  propImages: propImages,
  tenant    : tenant
}
