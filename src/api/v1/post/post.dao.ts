import { PostModel } from './post.model';

export class PostDao {
  /**
   * PostModel 생성
   * @async
   * @param {PostModel} post - PostModel 인스턴스
   * @returns {Promise<PostModel>}
   */
  static async create(post: PostModel): Promise<PostModel> {
    return post.save();
  }
}
