const validator = require('validator');
const safe      = require('safe-regex');

const passExpl = /(?=.*[a-z])/;
const passExpL = /(?=.*[A-Z])/;
const passExpn = /(?=.*[0-9])/;

let sanitize = function (input, callback) {
  if(typeof input !== 'string')
    return callback(new Error('Not a string'));
  let trimmed = validator.trim(input);
  if(validator.isEmpty(trimmed))
    return callback(new Error('Empty'));
  // Replace <, >, &, ', " and / with HTML entities.
  let escaped = validator.escape(trimmed);
  return callback(null, escaped);
};

let isPassFormatted = function(password){
  // Is password 8-20 characters
  if(!(validator.isLength(password, {min: 8, max: 20})))
    return false;
  // Make sure regular expressions
  // are not susceptible to DOS attack
  if(!safe(passExpl))
    return false;
  if(!safe(passExpL))
    return false;
  if(!safe(passExpn))
    return false;
  // Does password have:
  // 1 uppercase
  // 1 lowercase
  // 1 number
  if(!(validator.matches(password, passExpl)))
    return false;
  if(!(validator.matches(password, passExpL)))
    return false;
  if(!(validator.matches(password, passExpn)))
    return false;
  return true;
}

module.exports = {
  sanitize: sanitize,
  isPassFormatted: isPassFormatted
}
