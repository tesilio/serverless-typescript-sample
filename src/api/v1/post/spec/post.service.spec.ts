import { expect } from 'chai';
import { createSandbox, SinonSandbox } from 'sinon';
import { CreatePostUseCase } from '../use-case/create-post.use-case';
import { PostService } from '../post.service';
import { PostCreateDto } from '../dto/post-create.dto';
import { PostModel } from '../post.model';
import { PostResponseDto } from '../dto/post-response.dto';
import { PostDao } from '../post.dao';

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

describe('PostService 테스트', () => {
  let sandbox: SinonSandbox;
  let postService: PostService;

  beforeEach(() => {
    sandbox = createSandbox();
    postService = new PostService();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('create 테스트', () => {
    describe('성공', () => {
      it('정상적으로 Post가 생성되어 반환된다.', async () => {
        sandbox.stub(new CreatePostUseCase(), 'execute').resolves(postModel);
        sandbox.stub(PostDao, 'create').resolves(postModel);
        sandbox.stub(dummyPostCreateDto, 'toModel').resolves(postModel);

        const result = await postService.create(dummyPostCreateDto);

        expect(result).deep.equal(new PostResponseDto(postModel));
      });
    });
  });
});
