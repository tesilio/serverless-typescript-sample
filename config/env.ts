const PROCESS_ENV = process.env;

/**
 * 환경 변수
 */
export default {
  processEnv: PROCESS_ENV,
  stage: PROCESS_ENV.STAGE || 'local',
  region: PROCESS_ENV.REGION || 'ap-northeast-2',
  mysqlWriteHost: PROCESS_ENV.MYSQL_WRITE_HOST || 'localhost',
  mysqlWritePort: PROCESS_ENV.MYSQL_WRITE_PORT || 3306,
  mysqlReadHost: PROCESS_ENV.MYSQL_READ_HOST || 'localhost',
  mysqlReadPort: PROCESS_ENV.MYSQL_READ_PORT || 3306,
  mysqlDatabase: PROCESS_ENV.MYSQL_DATABASE || 'information_schema',
  mysqlUsername: PROCESS_ENV.MYSQL_USERNAME || '',
  mysqlPassword: PROCESS_ENV.MYSQL_PASSWORD || '',
  timezone: PROCESS_ENV.TZ || 'Asia/Seoul',
};
