import { PostCreateDto } from './dto/post-create.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { CreatePostUseCase } from './use-case/create-post.use-case';
import { validate } from 'class-validator';

export class PostService {
  private _createPostUseCase = new CreatePostUseCase();

  /**
   * PostModel 생성
   * @param {PostCreateDto} postCreateDto - 생성 요청 DTO
   * @returns {Promise<Record<string, any>>}
   */
  async create(postCreateDto: PostCreateDto): Promise<Record<string, any>> {
    validate(postCreateDto);
    const post = await this._createPostUseCase.execute(postCreateDto);
    const postResponseDto = new PostResponseDto(post);
    return postResponseDto.toPlain();
  }
}
