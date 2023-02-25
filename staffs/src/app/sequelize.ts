import * as Sequelize from 'sequelize';
import { initialize } from '../models';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
const createClient = async () => {
  const sequelize = config.url
    ? new Sequelize.Sequelize(config.url, config)
    : new Sequelize.Sequelize(
        config.database,
        config.username,
        config.password,
        config
      );

  sequelize
    .sync()
    .then(() => {
      // debug('MySQL server connected');
    })
    .catch((err: any) => {
      // debug(`MySQL connection error ${err}`);
      process.exit();
    });

  return initialize(sequelize);
};
export default createClient;
