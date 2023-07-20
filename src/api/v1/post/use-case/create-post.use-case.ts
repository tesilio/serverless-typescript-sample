import { PostCreateDto } from '../dto/post-create.dto';
import { PostDao } from '../post.dao';
import { PostModel } from '../post.model';

export class CreatePostUseCase {
  /**
   * 생성 요청 DTO를 통한 PostModel 생성(Sequelize)
   * @param {PostCreateDto} postCreateDto - 생성 요청 DTO
   * @returns {Promise<PostModel>}
   * @private
   */
  private createInSequelize(postCreateDto: PostCreateDto): Promise<PostModel> {
    const model = PostCreateDto.toModel(postCreateDto);
    return PostDao.create(model);
  }

  /**
   * 생성 메서드
   * @async
   * @param {PostCreateDto} postCreateDto - 생성 요청 DTO
   * @returns {Promise<PostModel>}
   */
  async execute(postCreateDto: PostCreateDto): Promise<PostModel> {
    const post = await this.createInSequelize(postCreateDto);
    return post;
  }
}
