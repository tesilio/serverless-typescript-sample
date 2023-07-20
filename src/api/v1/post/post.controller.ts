import { PostCreateDto } from './dto/post-create.dto';
import { PostService } from './post.service';

export class PostController {
  /**
   * Post 생성
   * @param {PostCreateDto} postCreateDto - 생성 DTO
   * @returns {Promise<PostResponseDto>}
   */
  public static async create(postCreateDto: PostCreateDto) {
    const postService = new PostService();
    return postService.create(postCreateDto);
  }
}
