const exec = require('child_process').exec;
const path = require('path');

const log = console.log;

const execute = (cmd) => {
  exec(cmd, function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    if (err !== null)
      log('exec error: ' + err);
  });
}

module.exports = {
  execute,
  log,
  sep: path.sep,
}