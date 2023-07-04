// @ts-ignore
module.exports = async ({ options }) => {
  const { name: serviceName, stage } = options;
  if (stage === 'local') {
    return {
      provider: {
        name: 'aws',
        apiName: `${serviceName}-${stage}`,
        runtime: 'nodejs18.x',
        stage,
        region: 'ap-northeast-2',
        timeout: 15,
        memorySize: '256',
        versionFunctions: false,
        iam: {
          role: 'This is IAM Role ARN',
        },
      },
      environment: {
        STAGE: 'local',
        REGION: 'ap-northeast-2',
        MYSQL_WRITE_HOST: 'localhost',
        MYSQL_WRITE_PORT: 3306,
        MYSQL_READ_HOST: 'localhost',
        MYSQL_READ_PORT: 3306,
        MYSQL_DATABASE: 'DATABASE',
        MYSQL_USERNAME: 'USERNAME',
        MYSQL_PASSWORD: 'PASSWORD',
      },
    };
  } else if (stage === 'dev') {
    return {};
  } else if (stage === 'staging') {
    return {};
  } else if (stage === 'production') {
    return {};
  } else {
    throw new Error('Wrong stage!');
  }
};
