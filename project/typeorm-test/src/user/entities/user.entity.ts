import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    comment: '用户名',
  })
  name: string;

  @Column({
    comment: '年龄',
  })
  age: number;

  @Column({
    comment: '邮箱',
  })
  email: string;
}
