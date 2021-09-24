import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number= 0;

    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date = new Date();

    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date = new Date();
  }
