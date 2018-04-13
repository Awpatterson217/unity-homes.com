const mkdir = require('mkdir');
const os = require('os');

const { sep, log, execute } = require('./helperFunctions');

const mac = `curl https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.6.3.tgz`;
const linux = `curl https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-3.6.3.tgz`;

const getCurlCmd = () => {
  if(os.type = 'Darwin') return mac;
  if(os.type = 'Linux') return linux;
  if(os.type = 'Windows_NT') return log('INCOMPATIBLE - WINDOWS OS');
}

const mkDB = () => {
  execute(`${getCurlCmd()} | tar xzvf - -C ${__dirname}${sep}mongodb --strip-components=1`);
}
