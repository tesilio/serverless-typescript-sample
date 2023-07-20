import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostModel } from '../post.model';

export class PostCreateDto {
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
  static toModel(postCreateDto: PostCreateDto): PostModel {
    const { title, contents } = postCreateDto;
    return PostModel.build({
      title,
      contents,
    });
  }
}
