"use strict";

const newErr = function(error) {
  const errorObj = {
    err: true,
    msg: error.msg
  }
  
  return errorObj;
}

const customErr = function(message) {
  const errorObj = {
    err: true,
    msg: message
  }
  
  return errorObj;
}

module.exports = {
  newErr,
  customErr
};
