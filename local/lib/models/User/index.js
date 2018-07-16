"use strict";

const bcrypt = require('bcryptjs');

const {
  DataModel,
  Basic,
} = require('../common');
const { customErr } = require('../../error');
const { _find }     = require('../../crud');
const { 
  safePass,
  safeStr,
  safeEmail,
} = require('../../safe');

const User = function() {
/**
 * Inherit from DataModel
 */
  DataModel.call(this);
/**
 * Inherit properties firstName, middleName,
 * lastName, email, and phone from Basic.
 */
  Basic.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.collection = 'user';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.uniqueVal = 'email';
/**
 * Properties unique to this model
 */
  this.email = {
    value   : '',
    required: true,
    safe    : email => safeEmail(email)
  }
  this.password = {
    value   : '',
    required: false
  }
  this.type = {
    value   : '',
    required: true,
    safe    : str => safeStr(str)
  }
  this.hash = async (password) => {
    const safePassword = safePass(password);

    if (safePassword.safe) {
      try{
         const salt = await bcrypt.genSalt(13);

         const hash = await bcrypt.hash(safePassword.val, salt);

         this.password.value = hash;
      } catch(err) {
        // TODO: Handle error
        console.log(err);
      }

      return true;
    }
    
    return false;
  }
  this.authenticate = async (email, password, callback) => {
    const thisEmail    = safeEmail(email);
    const thisPassword = safePass(password);

    if (!thisEmail.safe)
      return callback(customErr('Invalid Email'));

    if (!thisPassword.safe)
      return callback(customErr('Invalid Password'));

      try{
        const user = await _find('user', {'email': thisEmail.val});

        if (!user)
          return callback(customErr('Invalid Email'));

        const validPW = await bcrypt.compare(thisPassword.val, user.password);

        if (!validPW)
          return callback(customErr('Invalid Email'));

        return callback(null, user);
      } catch(err) {
        // TODO: Handle error
        console.log(err);
      }
  }
}

module.exports = User;
