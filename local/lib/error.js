'use strict';

const newErr = (error) => ({
  err: true,
  msg: error.msg,
});

const customErr = (message) => ({
  err: true,
  msg: message,
});

module.exports = {
  newErr,
  customErr,
};
