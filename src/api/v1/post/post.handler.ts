import { APIGatewayProxyEvent } from 'aws-lambda';
import { SequelizeClient } from '../../../component/sequelize-client';
import { PostController } from './post.controller';
import { PostCreateDto } from './dto/post-create.dto';
import { UtilityComponent } from '../../../component/utility.component';

/**
 *
 * @param event
 * @returns {Promise<{input: any, message: string}>}
 */
const createPostHandler = async (event: APIGatewayProxyEvent) => {
  const sequelizeClient = SequelizeClient.getInstance();
  sequelizeClient.initPools();
  const parsedBody = UtilityComponent.eventBodyParser(event.body);
  const result = await PostController.create(parsedBody as PostCreateDto); // todo: 응답값 정리, 에러 핸들링
  await sequelizeClient.close();
  return result;
};

export { createPostHandler };
