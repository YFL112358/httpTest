const baseAbsPath = __dirname + '/';

const singleton = Symbol();
const singletonEnforcer = Symbol();

const yaml = require('js-yaml');
const fs = require('fs');

const Sequelize = require('sequelize');

const Logger = require('./Logger');

class MySQLManager {
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new MySQLManager(singletonEnforcer);
    }
    return this[singleton];
  }

  constructor(enforcer) {
    if (enforcer != singletonEnforcer)
      throw "Cannot construct singleton";

    const instance = this;

    this.dbRef = null;
    this.host = null;
    this.port = null;
    this.database = null;

    this.user = null;
    this.password = null;

    this.testConnectionAsync = this.testConnectionAsync.bind(this);

    try {
      const config = yaml.safeLoad(fs.readFileSync(baseAbsPath + '../config/mysql.conf', 'utf8'));
      this.host = config.host;
      this.port = config.port;
      this.database = config.database;

      this.user = config.user;
      this.password = config.password;

      this.dbRef = new Sequelize(instance.database, instance.user, instance.password, {
        host: instance.host,
        port: instance.port,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      });
    } catch (e) {
      // TODO
      Logger.instance.defaults.error(e);
    }
  }

  testConnectionAsync() {
    const instance = this;
    return instance.dbRef.authenticate();
  }
}

module.exports = MySQLManager;
