
var env = process.env.NODE_ENV || 'local'
  , cfg = require('./config.'+env)
  , winston = require("winston");

  module.exports = cfg;


  var wsConfig = winston.config;
  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        timestamp: function() {
          return Date.now();
        },
        formatter: function(options) {
          // - Return string will be passed to logger.
          // - Optionally, use options.colorize(options.level, <string>) to
          //   colorize output based on the log level.
          return options.timestamp() + ' ' +
          wsConfig.colorize(options.level, options.level.toUpperCase()) + ' ' +
            (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
      })
    ]
  });

  cfg.logger = logger;