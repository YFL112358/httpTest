'use strict'

const Sequelize = require('sequelize');
const MySQLManager = require('../dao/MySQLManager').instance;
const dbConn = MySQLManager.dbRef;
const token = dbConn.define('token', {
  intAuthToken: Sequelize.STRING,
  tokenId: { type: Sequelize.STRING, allowNull: false, field :'id' },
  
  device: Sequelize.STRING,
  ip: Sequelize.STRING,
  email: Sequelize.STRING,
  updated_at: Sequelize.DATE,
  created_at: Sequelize.DATE
},{
    tableName: 'token',
    timestamps: false  
  });

exports.default = token;
