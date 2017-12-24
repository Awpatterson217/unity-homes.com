"use strict";

const nodemailer = require('nodemailer');

const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');
const {safeStr}   = require('../../resources/js/safe');
const {newErr}    = require('../../resources/js/error');
const {customErr} = require('../../resources/js/error');

const Mail = function(){
  this.host = {
    value   : '',
    required: true,
    safe    : function(str){
      return safeStr(str);
    }
  }
  this.username = {
    value   : '',
    required: true,
    safe    : function(email){
      return safeEmail(email);
    }
  }
  this.password = {
    value   : '',
    required: true,
    safe    : function(str){
      return safeStr(str);
    }
  }
  this.port = {
    value   : '',
    required: true,
    safe    : function(num){
      return safeNum(num);
    }
  }
  this.secure = {
    value   : '',
    required: false,
    safe    : function(bool){
      return safeBool(bool);
    }
  }
  this.requireTLS = {
    value   : '',
    required: false,
    safe    : function(bool){
      return safeBool(bool);
    }
  }
  this.from = {
    value   : '',
    required: true,
    safe    : function(str){
      return safeStr(str);
    }
  }
  this.to = {
    value   : '',
    required: true,
    safe    : function(email){
      return safeEmail(email);
    }
  }
  this.subject = {
    value   : '',
    required: false,
    safe    : function(str){
      return safeStr(str);
    }
  }
  this.text = {
    value   : '',
    required: false,
    safe    : function(str){
      return safeStr(str);
    }
  }
  this.html = {
    value   : '',
    required: false,
    safe    : function(str){
      return safeStr(str);
    }
  }
  this.setVal = function(key, val){
    let safeValue;

    if(typeof key !== 'string')
      return false;

    if(typeof val !== 'string')
      return false;

    safeValue = this[key].safe(val);

    if(safeValue.safe){
      this[key].value = safeValue.val;

      return true;
    }

    return false;
  }
  this.reset = function(){
    let keys   = [];

    Object.keys(this).forEach(function(val, i, arr){
      if(typeof this[val] !== 'function')
        keys.push(val);
    }.bind(this));

    for(let i = 0; i < keys.length - 1; i++){
      this[keys[i]].value = '';
    }

    return;
  }
  this.send = function(callback){
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
      if(error)
        return callback(error)
      return callback(null, info);
    });
  }
}

module.exports = Mail;
