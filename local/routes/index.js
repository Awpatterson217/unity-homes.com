"use strict";

const home     = require('./home');
const listings = require('./listings');
const apply    = require('./apply');
const contact  = require('./contact');
const register = require('./register');
const login    = require('./login');
const logout   = require('./logout');
const admin    = require('./dashboard/admin');
const tenant   = require('./dashboard/tenant');

module.exports = {
  home,
  listings,
  apply,
  contact,
  register,
  login,
  logout,
  admin,
  tenant
};
