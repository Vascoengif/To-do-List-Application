import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity('task')
export class TaskEntity {
  @PrimaryColumn({ type: 'uuid', name: 'id' })
  @Generated('uuid')
  id: string

  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date

  @Column({ name: 'title' })
  title: string

  @Column({ name: 'description', nullable: true })
  description: string
}