import { SequelizeClient } from './component/sequelize-client';

/**
 *
 * @param event
 * @returns {Promise<{input: any, message: string}>}
 */
export async function hello(event: any) {
  const sequelizeClient = SequelizeClient.getInstance();
  sequelizeClient.initPools();
  await sequelizeClient.sequelize.authenticate();
  await sequelizeClient.close();
  return {
    message: 'Hello World!',
    input: event,
  };
}
