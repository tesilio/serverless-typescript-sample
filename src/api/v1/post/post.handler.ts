import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PostController } from './post.controller';
import { PostCreateDto } from './dto/post-create.dto';
import { UtilityComponent } from '../../../component/utility.component';
import { SequelizeClient } from '../../../component/sequelize-client';
import { instanceToPlain } from 'class-transformer';

/**
 *
 * @param event
 * @returns {Promise<{input: any, message: string}>}
 */
const createPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const sequelizeClient = SequelizeClient.getInstance();
  sequelizeClient.initPools();
  const parsedBody = UtilityComponent.eventBodyParser(event.body) as any;
  const postCreateDto = new PostCreateDto();
  postCreateDto.title = parsedBody?.title || '젬옥';
  postCreateDto.contents = parsedBody?.title || '냉무';
  const postResponseDto = await PostController.create(postCreateDto);
  const body = instanceToPlain(postResponseDto);
  await sequelizeClient.close();
  return {
    statusCode: 200,
    body: body as any,
  };
};

const createPostHandler = middy(createPost).use(
  errorLogger({
    logger: console.log,
  }),
);

export { createPostHandler };
