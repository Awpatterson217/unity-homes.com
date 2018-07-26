const {
  _create,
} = require('./create');

const {
  _update,
} = require('./update');

const {
  _delete,
} = require('./delete');

const {
  _find,
  _count,
  _all,
} = require('./read');

module.exports = {
  _create,
  _find,
  _count,
  _all,
  _update,
  _delete,
}
