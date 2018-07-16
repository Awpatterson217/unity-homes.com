"use strict";

const validator = require('validator');
const safe      = require('safe-regex');

const passExpl = /(?=.*[a-z])/;
const passExpL = /(?=.*[A-Z])/;
const passExpn = /(?=.*[0-9])/;

const sanitize = (input) => {
  let response;
  let trimmed;
  if (typeof input === 'string') {
    trimmed = validator.trim(input);
    if (!validator.isEmpty(trimmed)) {
      return response = validator.escape(trimmed);
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
  const safeEmail = {};
  safeEmail.val = sanitize(email);
  if (validator.isEmail(safeEmail.val)) {
    safeEmail.safe = true;

    return safeEmail;
  }

  safeEmail.safe = false;

  return safeEmail;
}

const safeCode = (code) => {
  const safeCode = {};
  safeCode.val = sanitize(code);
  if (validator.isNumeric(safeCode.val)) {
    safeCode.safe = true;
    return safeCode;
  }
  safeCode.safe = false;
  return safeCode;
}

const safePass = (password) => {
  const safePass = {};
  safePass.val = sanitize(password);
  if (safePass.val === '') {
    safePass.safe = false;
    return safePass;
  }
  if (isPassFormat(safePass.val)) {
    safePass.safe = true;
    return safePass;
  }
  safePass.safe = false;
  return safePass;
}

const safeNum = (num) => {
  const safeNum = {};
  safeNum.val = sanitize(num);
  if (safeNum.val === '') {
    safeNum.safe = false;
    return safeNum;
  }
  if (validator.isNumeric(safeNum.val)) {
    safeNum.safe = true;
    return safeNum;
  }
  safeNum.safe = false;
  return safeNum;
}

const safeYear = (num) => {
  const safeNum = {};
  safeNum.val = sanitize(num);
  if (safeNum.val === '') {
    safeNum.safe = false;
    return safeNum;
  }
  if (safeNum.val.length !== 4) {
    safeNum.safe = false;
      return safeNum;
  }
  if (validator.isNumeric(safeNum.val)) {
    safeNum.safe = true;
    return safeNum;
  }
  safeNum.safe = false;
  return safeNum;
}

const safeBool = (boolean) => {
  const safeBool = {};
  safeBool.val = sanitize(boolean);
  if (safeBool.val === '') {
    safeBool.safe = false;
    return safeBool;
  }
  if (validator.isBoolean(safeBool.val)) {
    safeBool.safe = true;
    return safeBool;
  }
  safeBool.safe = false;
  return safeBool;
}

const safeStr = (str) => {
  const safeStr = {};
  safeStr.val = sanitize(str);
  if (safeStr.val === '') {
    safeStr.safe = false;
    return safeStr;
  }
  safeStr.safe = true;
  return safeStr;
}

module.exports = {
  sanitize,
  isPassFormat,
  safeEmail,
  safeCode,
  safePass,
  safeNum,
  safeBool,
  safeStr,
  safeYear
}
