import { Task, TaskModel } from '../models/TaskModel';
import { TaskInterface } from '../interfaces/TaskInterface';
import mongoose from 'mongoose';

export class TaskRepository implements TaskInterface {
  async create(taskData: Partial<Task>): Promise<Task> {
    const task = new TaskModel(taskData);
    return await task.save();
  }

  async findAll(userId: mongoose.Types.ObjectId): Promise<Task[]> {
    return await TaskModel.find({ user: userId })
      .sort({ createAt: -1 })
      .populate('user', 'names lastnames email');
  }

  async findById(id: string, userId: mongoose.Types.ObjectId): Promise<Task | null> {
    return await TaskModel.findOne({ 
      _id: id, 
      user: userId 
    }).populate('user', 'names lastnames email');
  }

  async findByTitle(title: string, userId: mongoose.Types.ObjectId): Promise<Task | null> {
    return await TaskModel.findOne({ 
      title, 
      user: userId 
    }).populate('user', 'names lastnames email');
  }

  async update(id: string, userId: mongoose.Types.ObjectId, taskData: Partial<Task>): Promise<Task | null> {
    return await TaskModel.findOneAndUpdate(
      { _id: id, user: userId },
      taskData,
      { new: true, runValidators: true }
    ).populate('user', 'names lastnames email');
  }

  async delete(id: string, userId: mongoose.Types.ObjectId): Promise<Task | null> {
    return await TaskModel.findOneAndDelete({ _id: id, user: userId });
  }
}