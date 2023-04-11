import * as Sequelize from 'sequelize';
import createDebug from 'debug';
import { initialize } from '../models';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const debug = createDebug('sequelize');

const createClient = async () => {
  const sequelize = config.url
    ? new Sequelize.Sequelize(config.url, config)
    : new Sequelize.Sequelize(config);

  sequelize
    .sync()
    .then(() => {
      debug('MySQL server connected');
    })
    .catch((err: any) => {
      debug(`MySQL connection error ${err}`);
      process.exit();
    });

  return initialize(sequelize);
};
export default createClient;
