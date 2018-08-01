'use strict';

const validator = require('validator');
const safe      = require('safe-regex');

const {
  isEmpty,
} = require('../lib/functions');

const {
  isString,
} = require('is-lib');

const passExpl = /(?=.*[a-z])/;
const passExpL = /(?=.*[A-Z])/;
const passExpn = /(?=.*[0-9])/;

const sanitize = (input) => {
  if (isString(input)) {
    const trimmed = validator.trim(input);

    if (!validator.isEmpty(trimmed)) {
      return validator.escape(trimmed);
    }
  }

  return '';
};

const isPassFormat = (password) => {
  if (!password) {
    return false;
  }

  // Is password 8-20 characters
  if (!(validator.isLength(password, { min: 8, max: 20 }))) {
    return false;
  }

  // Make sure regular expressions
  // are not susceptible to DOS attack
  if (!safe(passExpl)) {
    return false;
  }

  if (!safe(passExpL)) {
    return false;
  }

  if (!safe(passExpn)) {
    return false;
  }

  // Does password have:
  // 1 uppercase
  // 1 lowercase
  // 1 number
  if (!(validator.matches(password, passExpl))) {
    return false;
  }

  if (!(validator.matches(password, passExpL))) {
    return false;
  }

  if (!(validator.matches(password, passExpn))) {
    return false;
  }

  return true;
}

const safeEmail = (email) => {
  const safeEmail = {
    val: sanitize(email),
    safe: false
  };

  if (validator.isEmail(safeEmail.val)) {
    safeEmail.safe = true;
  }

  return safeEmail;
}

const safeCode = (code) => {
  const safeCode = {
    val: sanitize(code),
    safe: false
  };

  if (validator.isNumeric(safeCode.val)) {
    safeCode.safe = true;
  }

  return safeCode;
}

const safePass = (password) => {
  const safePass = {
    val: sanitize(password),
    safe: false
  };

  if (isEmpty(safePass.val)) {
    return safePass;
  }

  if (isPassFormat(safePass.val)) {
    safePass.safe = true;
  }

  return safePass;
}

const safeNum = (num) => {
  const safeNum = {
    val: sanitize(num),
    safe: false
  };

  if (isEmpty(safeNum.val)) {
    return safeNum;
  }

  if (validator.isNumeric(safeNum.val)) {
    safeNum.safe = true;
  }

  return safeNum;
}

const safeYear = (num) => {
  const safe = safeNum(num);

  if(!safe.safe) {
    return safe;
  }

  if (safe.val.length !== 4) {
    safe.safe = false;
  }

  return safe;
}

const safeBool = (boolean) => {
  const safeBool = {
    val: sanitize(boolean),
    safe: false
  };

  if (isEmpty(safeBool.val)) {
    return safeBool;
  }
  if (validator.isBoolean(safeBool.val)) {
    safeBool.safe = true;
  }

  return safeBool;
}

const safeStr = (str) => {
  const safeStr = {
    val: sanitize(str),
    safe: false
  };

  if (isEmpty(safeStr.val)) {
    return safeStr;
  }

  safeStr.safe = true;

  return safeStr;
}

const safeDictionary = Object.create(null);

safeDictionary.string  = safeStr;
safeDictionary.number  = safeNum;
safeDictionary.boolean = safeBool;
safeDictionary.email   = safeEmail;
safeDictionary.code    = safeCode;
safeDictionary.year    = safeYear;

module.exports = {
  sanitize,
  isPassFormat,
  safeEmail,
  safeCode,
  safePass,
  safeNum,
  safeBool,
  safeStr,
  safeYear,
  safeDictionary
}
