import { PostCreateDto } from './dto/post-create.dto';
import { PostService } from './post.service';

export class PostController {
  /**
   * Post 생성
   * @param {PostCreateDto} postCreateDto - 생성 DTO
   * @returns {Promise<PostResponseDto>}
   */
  public static async create(postCreateDto: PostCreateDto) {
    // todo: 핸들러 캡슐화 -> 핸들러를 이 컨트롤러로 대체해보자!
    const postService = new PostService();
    return postService.create(postCreateDto);
  }
}
