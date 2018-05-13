'use strict';

const errors = require('./errors');

const requireBodyProperty = (req, property)  => {
  const value = req.body[property];
  if (!value) {
    throw new errors.ClientError('Required property `' + property + '` missing in request body.')
  }
  return value;
};

const getIp = req => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

module.exports = {
  requireBodyProperty: requireBodyProperty,
  getIp: getIp
};
