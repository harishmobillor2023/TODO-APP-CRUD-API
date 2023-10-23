import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    todo_id: string;
  
    @Column()
    todo_: string;
  
    @Column({ name: 'priority', length: 160, nullable: false })
    priority: string;

    
    @Column({ name: 'status', length: 160, nullable: false })
    status: string;

    @Column({ name: 'category', length: 50, nullable: false })
    category: string;

    
    @Column({ name: 'due_date', length: 50, nullable: false })
    due_date: string;
  }