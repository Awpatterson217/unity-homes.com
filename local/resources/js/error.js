"use strict";

let newErr = function(error){
  const errorObj = {
    err: true,
    msg: error.msg
  }
  
  return errorObj;
}

let customErr = function(message){
  const errorObj = {
    err: true,
    msg: message
  }
  
  return errorObj;
}

module.exports = {
  newErr   : newErr,
  customErr: customErr
}