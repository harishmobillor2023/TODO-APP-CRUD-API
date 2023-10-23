import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>,
    ) {}
    // You add all CRUD logics here
    // Fetch all todos from the database
 async fetchTodos(): Promise < Todo[] > {
    return this.todosRepository.find();
}

   // Fetch a single note by ID from db
   async fetchTodoById(todo_id: string): Promise < Todo > {
    const found = await this.todosRepository.findOne({ where: { todo_id: todo_id } });
    if(!found) {
        throw new NotFoundException(`Todo "${todo_id}" not found`);
    }
    return found;
}

  // Add a new note to the database
  async addTodo(createTodoDto: CreateTodoDto): Promise < Todo > {
    const { todo_ , priority, status, category, due_date } = createTodoDto;
    const todo = this.todosRepository.create({
        todo_,
        priority,
        status,
        category,
        due_date
    });
    await this.todosRepository.save(todo);
    return todo;
}

    // Remove a note by ID from the database
    async removeTodo(todo_id: string) {
    const result = await this.todosRepository.delete(todo_id);
    if (result.affected === 0) {
        throw new NotFoundException(`A todo "${todo_id}" was not found`);
    }
    return { message: 'todo successfully deleted' };
}

 // Update a note by ID with new data
 async updateTodo(todo_id: string, updateTodoDto: UpdateTodoDto) {
    const hasTodo = await this.fetchTodoById(todo_id);
    if (!hasTodo) throw new Error(`A todo "${todo_id}" was not found`);
    await this.todosRepository.update(todo_id, updateTodoDto);
}


}
 