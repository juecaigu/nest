import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '标题',
    length: 255,
  })
  title: string;

  @Column({
    comment: '摘要',
    length: 1000,
  })
  abstract: string;

  @Column({
    comment: '内容',
  })
  content: string;

  @Column({
    comment: '作者',
  })
  author: string;

  @Column({
    comment: '创建时间',
  })
  createTime: Date;

  @Column({
    comment: '点赞量',
  })
  likeCount: number;

  @Column({
    comment: '阅读量',
  })
  readCount: number;
}
