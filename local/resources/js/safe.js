"use strict";
const validator = require('validator');

const {sanitize}   = require('./sanitize');
const {isPassFormat} = require('./sanitize');

let safeEmail = function(email){
  let safeEmail = {};
  safeEmail.val = sanitize(email);
  if(validator.isEmail(safeEmail.val)){
    safeEmail.safe = true;
    return safeEmail;
  }
  safeEmail.safe = false;
  return safeEmail;
}
let safeCode = function(code){
  let safeCode = {};
  safeCode.val = sanitize(code);
  if(validator.isNumeric(safeCode.val)){
    safeCode.safe = true;
    return safeCode;
  }
  safeCode.safe = false;
  return safeCode;
}
let safePass = function(password){
  let safePass = {};
  safePass.val = sanitize(password);
  if(safePass.val === ''){
    safePass.safe = false;
    return safePass;
  }
  if(isPassFormat(safePass.val)){
    safePass.safe = true;
    return safePass;
  }
  safePass.safe = false;
  return safePass;
}
let safeNum = function(num){
  let safeNum = {};
  safeNum.val = sanitize(num);
  if(safeNum.val === ''){
    safeNum.safe = false;
    return safeNum;
  }
  if(validator.isNumeric(safeNum.val)){
    safeNum.safe = true;
    return safeNum;
  }
  safeNum.safe = false;
  return safeNum;
}
let safeBool = function(boolean){
  let safeBool = {};
  safeBool.val = sanitize(boolean);
  if(safeBool.val === ''){
    safeBool.safe = false;
    return safeBool;
  }
  if(validator.isBoolean(safeBool.val)){
    safeBool.safe = true;
    return safeBool;
  }
  safeBool.safe = false;
  return safeBool;
}
let safeStr = function(str){
  let safeStr = {};
  safeStr.val = sanitize(str);
  if(safeStr.val === ''){
    safeStr.safe = false;
    return safeStr;
  }
  safeStr.safe = true;
  return safeStr;
}

module.exports = {
  safeEmail: safeEmail,
  safeCode:  safeCode,
  safePass:  safePass,
  safeNum:   safeNum,
  safeBool:  safeBool,
  safeStr:   safeStr
}
