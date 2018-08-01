'use strict';

const bcrypt = require('bcryptjs');

const {
  ModelMethods,
  BasicProps,
  addProperty,
} = require('../common');

const {
  customErr,
} = require('../../error');

const {
  getMongoDB,
} = require('../../../mongoDB');

const mongoDB = getMongoDB();

const { 
  safePass,
  safeEmail,
} = require('../../safe');

const User = function() {
/**
 * Inherit from ModelMethods
 */
  ModelMethods.call(this);
/**
 * Inherit properties firstName, middleName,
 * lastName, email, and phone from BasicProps.
 */
  BasicProps.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.getCollection = () => 'user';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.getUniqueVal = () => 'email';
/**
 * Properties unique to this model
 */
  addProperty.call(this, 'type', 'string', true);

  this.password = {
    value   : '',
    required: false
  }
/**
 * Methods unique to this model
 */
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

    if (!thisEmail.safe) {
      return callback(customErr('Invalid Email'));
    }

    if (!thisPassword.safe) {
      return callback(customErr('Invalid Password'));
    }

      try {
        const user = await mongoDB.find('user', {'email': thisEmail.val});

        if (!user) {
          return callback(customErr('Invalid Email'));
        }

        const validPW = await bcrypt.compare(thisPassword.val, user.password);

        if (!validPW) {
          return callback(customErr('Invalid Email'));
        }

        return callback(null, user);
      } catch(err) {
        // TODO: Handle error
        console.log(err);
      }
  }
}

module.exports = User;
