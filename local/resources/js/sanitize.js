const validator = require('validator');
const safe      = require('safe-regex');

const passExpl = /[a-z]{1}/;
const passExpL = /[A-Z]{1}/;
const passExpn = /[0-9]{1}/;

let sanitize = function (input, callback) {
  // Is input a string?
  if(typeof input !== 'string')
    return callback(new Error('Not a string'));
  // remove white space
  let trimmed = validator.trim(input);
  // Is user input empty? 
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
  // Does password have:
  // 1 uppercase
  // 1 lowercase
  // 1 number
  if(!(validator.matches(password, safe(passExpl)))) // TODO: SAFE REGEXP
    return false;
  if(!(validator.matches(password, safe(passExpL)))) // TODO: SAFE REGEXP
    return false;
  if(!(validator.matches(password, safe(passExpn)))) // TODO: SAFE REGEXP
    return false;
  return true;
}

module.exports = {
  sanitize: sanitize,
  isPassFormatted: isPassFormatted
}
