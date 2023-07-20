import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

/**
 * post table
 */
@Table({
  modelName: 'post',
  freezeTableName: true,
  timestamps: true,
  paranoid: true,
  comment: '게시글 테이블',
})
export class PostModel extends Model {
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: '프라이머리 키',
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '제목',
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: '내용',
  })
  declare contents: string;

  @CreatedAt
  @Default(Date.now)
  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: '생성일시',
  })
  declare createdAt: Date;

  @UpdatedAt
  @Default(Date.now)
  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: '변경일시',
  })
  declare updatedAt: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '삭제일시',
  })
  declare deletedAt: Date;
}
