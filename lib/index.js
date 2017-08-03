const Flexpad = require('./Flexpad')

const flexpad = code => new Flexpad(code).toJs()

module.exports = flexpad
