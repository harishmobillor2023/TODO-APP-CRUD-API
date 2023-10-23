import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty({ message: 'todo field cannot be empty' })
    todo_: string;

    @IsString()
    @IsNotEmpty({ message: 'priority field cannot be empty' })
    priority: string;

    @IsString()
    @IsNotEmpty({message: 'status field cannot be empty'})
    status: string;

    @IsString()
    @IsNotEmpty({ message: 'category field cannot be empty' })
    category: string;

    @IsString()
    @IsNotEmpty({ message: 'due_date field cannot be empty' })
    due_date: string;
}