import { Body, Controller, Delete, Get, Param, Post,Put} from '@nestjs/common';
import { TodosService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // Retrieve all todos
  @Get()
  getTodos() {
    return this.todosService.fetchTodos();
  }

  // Create a todo note
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.addTodo(createTodoDto);
  }

  // Retrieve a todo by ID
  @Get('/:todo_id')
  getTodoById(@Param('todo_id') todo_id: string): Promise<Todo> {
    return this.todosService.fetchTodoById(todo_id);
  }

  // Delete a todo by ID
  @Delete('/:todo_id')
  delete(@Param('todo_id') todo_id: string) {
    return this.todosService.removeTodo(todo_id);
  }

  // Update a todo by ID
  @Put('/:todo_id')
  async updateTodo(@Param('todo_id') todo_id: string, @Body() data: UpdateTodoDto) {
    const todo = new Todo();
    Object.assign(todo, data);
    await this.todosService.updateTodo(todo_id, todo);
    return { message: 'todo info successfully updated', todo_id };
  }
}