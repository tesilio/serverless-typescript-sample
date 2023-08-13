import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostModel } from '../post.model';

export class PostCreateDto {
  /**
   * 생성자
   * @param {any} requestBody
   */
  constructor(requestBody: any) {
    this.title = requestBody?.title;
    this.contents = requestBody?.contents;
  }

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title!: string;

  @IsString()
  @MinLength(0)
  @MaxLength(5000)
  contents!: string;

  /**
   * DTO to Model
   * @returns {PostModel}
   */
  toModel(): PostModel {
    return PostModel.build({
      title: this.title,
      contents: this.contents,
    });
  }
}
