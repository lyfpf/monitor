const md5 = require('js-md5')

function calcuMD5(pwd) {
  pwd = pwd.toUpperCase()
  pwd = md5(pwd)
  return pwd
}

module.exports = {
  calcuMD5
}