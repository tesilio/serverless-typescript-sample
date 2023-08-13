import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PostController } from './post.controller';
import { PostCreateDto } from './dto/post-create.dto';
import { UtilityComponent } from '../../../component/utility.component';
import { SequelizeClient } from '../../../component/sequelize-client';

/**
 *
 * @param event
 * @returns {Promise<{input: any, message: string}>}
 */
const createPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const sequelizeClient = SequelizeClient.getInstance();
  sequelizeClient.initPools();
  const parsedBody = UtilityComponent.eventBodyParser(event.body) as any;
  const postCreateDto = new PostCreateDto(parsedBody);
  const responseBody = await PostController.create(postCreateDto);
  await sequelizeClient.close();
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
};

const createPostHandler = middy(createPost).use(
  errorLogger({
    logger: console.log,
  }),
);

export { createPostHandler };
