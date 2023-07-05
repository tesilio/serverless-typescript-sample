import * as path from 'path';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as _ from 'lodash';
import ENV from './env';
import CONSTANTS from './constants';

type SequelizeClientOptions = SequelizeOptions & {
  host?: string;
  port?: string | number;
  database?: string;
  username?: string;
  password?: string;
  logging?: boolean | any;
};

/**
 * MySQL + Sequelize 클라이언트 클래스
 */
export class SequelizeClient {
  private static sequelizeClient: any;

  private _isInUse: boolean = false;

  private static createdAt: number;

  private readonly options: SequelizeClientOptions;

  private readonly _sequelize: any;

  /**
   * 생성자
   * @param {SequelizeClientOptions} options - 옵션
   * @private
   */
  private constructor(options?: SequelizeClientOptions) {
    this.options = {
      host: _.get(options, 'host', ENV.mysqlWriteHost),
      port: _.get(options, 'port', Number(ENV.mysqlWritePort)),
      database: _.get(options, 'database', ENV.mysqlDatabase),
      username: _.get(options, 'username', ENV.mysqlUsername),
      password: _.get(options, 'password', ENV.mysqlPassword),
      logging: _.get(options, 'logging', ENV.stage === CONSTANTS.STAGE.LOCAL ? console.log : false),
      dialect: 'mysql',
      timezone: '+09:00',
      define: {
        charset: 'utf8mb4',
      },
      pool: {
        max: 2,
        min: 0,
        idle: 0,
        acquire: 3000,
      },
      models: [path.join(__dirname, '../', 'src/model/mysql/')],
    };

    if (_.isEmpty(this._sequelize)) {
      this._sequelize = new Sequelize(this.options);
    }
  }

  /**
   * 인스턴스 반환(싱글톤)
   *
   * @param {SequelizeClientOptions} options - 연결 옵션
   * @param {number} remainingLifeSeconds - 인스턴스 생명주기
   * @returns {SequelizeClient}
   */
  public static getInstance(
    options?: SequelizeClientOptions,
    remainingLifeSeconds = 300,
  ): SequelizeClient {
    const now = Date.now();
    if (SequelizeClient.sequelizeClient === undefined) {
      SequelizeClient.sequelizeClient = new SequelizeClient(options);
      SequelizeClient.createdAt = now;
    }
    const remainingLifeMilliseconds = remainingLifeSeconds * 1000;
    const deadLine = now - remainingLifeMilliseconds;

    // case: 5분이 초과되면 새로운 인스턴스를 반환!
    if (SequelizeClient.createdAt < deadLine) {
      delete SequelizeClient.sequelizeClient;
      SequelizeClient.sequelizeClient = new SequelizeClient(options);
    }
    return SequelizeClient.sequelizeClient;
  }

  /**
   * 커넥션 연결
   * @returns {void}
   */
  initPools(): void {
    this._isInUse = true;
    this.sequelize.connectionManager.initPools();
    if (Object.hasOwn(this.sequelize.connectionManager, 'getConnection')) {
      this.sequelize.connectionManager.getConnection = undefined as any;
    }
  }

  /**
   * 커넥션 종료
   * @returns {void}
   */
  async close(): Promise<void> {
    this._isInUse = false;
    await this.sequelize.connectionManager.close();
  }

  /**
   * Sequelize 객체
   * @returns {Sequelize}
   */
  get sequelize(): Sequelize {
    return this._sequelize;
  }

  /**
   * 인스턴스 사용중여부
   * @returns {boolean}
   */
  public get isInUse(): boolean {
    return this._isInUse;
  }
}
