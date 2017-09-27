const baseAbsPath = __dirname + '/';

const singleton = Symbol();
const singletonEnforcer = Symbol();

const log4js = require('log4js');

// Rolling reference https://nomiddlename.github.io/log4js-node/datefile.html.
// Filter reference https://github.com/nomiddlename/log4js-node/blob/master/docs/categoryFilter.md.
log4js.configure({
  appenders: { 
    stdout: {
      type: 'stdout', 
    },
    apiAccess: { 
      type: 'file', 
      filename: baseAbsPath + '../../logging/api_access.log', 
      maxLogSize: 10485760, 
      pattern: '.yyyy-MM-dd-hh',
      backups: 5, 
      compress: true
    }, 
    apiError: { 
      type: 'file', 
      filename: baseAbsPath + '../../logging/api_error.log', 
      maxLogSize: 10485760, 
      pattern: '.yyyy-MM-dd',
      backups: 10, 
      compress: true
    },
    app: {
      type: 'file', 
      filename: baseAbsPath + '../../logging/app.log', 
      maxLogSize: 10485760, 
      pattern: '.yyyy-MM-dd',
      backups: 10, 
      compress: true
    }
  },
  categories: { 
    default: { 
      appenders: ['stdout', 'app'],
      level: 'debug' // Accepts any log from the appenders at or above 'debug' level. 
    },
    apiAccess: {
      appenders: ['apiAccess'],
      level: 'info'  
    },
    apiError: {
      appenders: ['apiError'],
      level: 'error'  
    }
  }
});

class Logger {
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Logger(singletonEnforcer);
    }
    return this[singleton];
  }

  constructor(enforcer) {
    if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
    this.defaults = log4js.getLogger();
    this.apiAccess = log4js.getLogger('apiAccess');
    this.apiError = log4js.getLogger('apiError');
  }
}

module.exports = Logger;
