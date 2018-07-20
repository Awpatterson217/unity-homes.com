'use strict';

const nodemailer = require('nodemailer');

const {
  ModelMethods
} = require('../common');
const {
  customErr
} = require('../../error');
const { 
  safeEmail,
  safeNum,
  safeStr,
} = require('../../safe');

const Mail = function() {
/**
 * Inherit from ModelMethods
 */
  ModelMethods.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.collection = 'mail';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.uniqueVal = ''; // TODO
/**
 * Properties unique to this model
 */
  this.host = {
    value   : '',
    required: true,
    safe    : str => safeStr(str)
  }
  this.username = {
    value   : '',
    required: true,
    safe    : email => safeEmail(email)
  }
  this.password = {
    value   : '',
    required: true,
    safe    : str => safeStr(str)
  }
  this.port = {
    value   : '',
    required: true,
    safe    : num => safeNum(num)
  }
  this.secure = {
    value   : '',
    required: false,
    safe    : bool => safeBool(bool)
  }
  this.requireTLS = {
    value   : '',
    required: false,
    safe    : bool => safeBool(bool)
  }
  this.from = {
    value   : '',
    required: true,
    safe    : str => safeStr(str)
  }
  this.to = {
    value   : '',
    required: true,
    safe    : email => safeEmail(email)
  }
  this.subject = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.text = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.html = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.send = (callback) => {
    const dataObj = this.getObject();

    Object.keys(dataObj).forEach((prop) => {
      if (prop.required) {
        if (prop.value === '') {
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
