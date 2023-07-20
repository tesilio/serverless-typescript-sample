import { Exclude, Expose } from 'class-transformer';
import { PostModel } from '../post.model';

@Exclude()
export class PostResponseDto {
  private readonly _id: number;

  private readonly _title: string;

  private readonly _contents: string;

  /**
   * 생성자
   * @param {PostModel} post - PostModel 인스턴스
   */
  constructor(post: PostModel) {
    this._id = post.id;
    this._title = post.title;
    this._contents = post.contents;
  }

  /**
   * id
   * @returns {number}
   */
  @Expose()
  get id(): number {
    return this._id;
  }

  /**
   * 제목
   * @returns {string}
   */
  @Expose()
  get title(): string {
    return this._title;
  }

  /**
   * 내용
   * @returns {string}
   */
  @Expose()
  get contents(): string {
    return this._contents;
  }
}
