'use strict';

const nodemailer = require('nodemailer');

const {
  ModelMethods,
  addProperty,
} = require('../common');

const {
  customErr,
} = require('../../error');

const {
  isEmpty,
} = require('../../functions');

const Mail = function() {
/**
 * Inherit from ModelMethods
 */
  ModelMethods.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.getCollection = () => 'mail';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.getUniqueVal = () => ''; // TODO
/**
 * Properties unique to this model
 */
  addProperty.call(this, 'host', 'string', true);
  addProperty.call(this, 'username', 'email', true);
  addProperty.call(this, 'password', 'string', true);
  addProperty.call(this, 'port', 'number', true);
  addProperty.call(this, 'secure', 'boolean', false);
  addProperty.call(this, 'requireTLS', 'boolean', false);
  addProperty.call(this, 'from', 'string', true);
  addProperty.call(this, 'to', 'email', true);
  addProperty.call(this, 'subject', 'string', true);
  addProperty.call(this, 'text', 'string', true);
  addProperty.call(this, 'html', 'string', true);
/**
 * Methods unique to this model
 */
  this.send = (callback) => {
    const dataObj = this.getObject();

    Object.keys(dataObj).forEach((prop) => {
      if (prop.required) {
        if (isEmpty(prop.value)) {
          this.reset();

          callback(customErr('Missing Required Value'))
        }
      }
    });

    nodemailer.createTransport({
      host      : this.host,
      secure    : this.secure,
      requireTLS: this.requireTLS,
      port      : this.port,
      auth      : {
        user: this.username,
        pass: this.password
      }
    }.bind(this)).sendMail({
      from   : this.from,
      to     : this.to,
      subject: this.subject,
      text   : this.text,
      html   : this.html,
    }.bind(this), (error, info) => {
      if (error) {
        return callback(error)
      }

      return callback(null, info);
    });
  }
}

module.exports = Mail;
