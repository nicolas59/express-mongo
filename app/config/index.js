var env = process.env.NODE_ENV || 'local'
  , cfg = require('./config.'+env);

  module.exports = cfg;