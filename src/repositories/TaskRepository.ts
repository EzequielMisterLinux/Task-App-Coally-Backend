import { Task, TaskModel } from '../models/TaskModel';
import { TaskInterface } from './TaskRepositoryInterface';




export class TaskRepository implements TaskInterface {

    async create(taskData: Partial<Task>): Promise<Task> {
        const task = new TaskModel(taskData);


        return await task.save();
    }

    async findAll(): Promise<Task[]> {
        
        return await TaskModel.find().sort({ createAt: -1 });
    }

    async findById(id: string): Promise<Task | null> {
        return await TaskModel.findById(id); 
    }

    async findByTitle(title: string): Promise<Task | null> {
        return await TaskModel.findOne({ title });
    }

    async update(id: string, taskData: Partial<Task>): Promise<Task | null> {
        return await TaskModel.findByIdAndUpdate(
            id,
            taskData,
            { new: true, runValidators: true }
        );
    }

    async delete(id: string): Promise<Task | null> {
        return await TaskModel.findByIdAndDelete(id);
    }
}
