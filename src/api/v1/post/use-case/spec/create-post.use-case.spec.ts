import { expect } from 'chai';
import { createSandbox, SinonSandbox } from 'sinon';
import { CreatePostUseCase } from '../create-post.use-case';
import { PostCreateDto } from '../../dto/post-create.dto';
import { PostModel } from '../../post.model';
import { PostDao } from '../../post.dao';

const dummyRequestData = {
  title: '제목',
  contents: '내용',
};
const dummyPostCreateDto = new PostCreateDto(dummyRequestData);

const postModel = {
  id: 1,
  title: '제목',
  contents: '내용',
  createAt: new Date('2023-07-25 21:10:00'),
  updatedAt: new Date('2023-07-25 21:10:00'),
  deletedAt: null,
} as unknown as PostModel;

describe('CreatePostUseCase 테스트', () => {
  let sandbox: SinonSandbox;
  let createPostUseCase: CreatePostUseCase;

  beforeEach(() => {
    sandbox = createSandbox();
    createPostUseCase = new CreatePostUseCase();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('execute 테스트', () => {
    it('정상적으로 Post가 생성되어 반환된다.', async () => {
      sandbox.stub(PostDao, 'create').resolves(postModel);
      sandbox.stub(dummyPostCreateDto, 'toModel').resolves(postModel);

      const result = await createPostUseCase.execute(dummyPostCreateDto);

      expect(result).deep.equal(postModel);
    });
  });
});
