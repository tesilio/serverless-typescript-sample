import { PostCreateDto } from './dto/post-create.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { CreatePostUseCase } from './use-case/create-post.use-case';

export class PostService {
  private _createPostUseCase = new CreatePostUseCase();

  /**
   * PostModel 생성
   * @param {PostCreateDto} postCreateDto - 생성 요청 DTO
   * @returns {Promise<PostResponse>}
   */
  async create(postCreateDto: PostCreateDto): Promise<PostResponseDto> {
    const post = await this._createPostUseCase.execute(postCreateDto);
    return new PostResponseDto(post);
  }
}
