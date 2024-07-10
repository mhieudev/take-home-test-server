import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { EStatusToDo } from './to-do-list.type'

@Entity()
export class ToDoListEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ type: 'date', nullable: true })
  startDate?: string

  @Column({ type: 'date', nullable: true })
  endDate?: string

  @Column({ default: EStatusToDo.ACTIVATED })
  status!: string
}
