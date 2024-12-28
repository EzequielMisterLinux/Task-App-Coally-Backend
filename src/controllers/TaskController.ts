import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/TaskRepository';
import mongoose from 'mongoose';

interface TaskControllerInterface {
  createTask(req: Request, res: Response)   : Promise<void>;
  getAllTasks(req: Request, res: Response)  : Promise<void>;
  getTask(req: Request, res: Response)      : Promise<void>;
  updateTask(req: Request, res: Response)   : Promise<void>;
  deleteTask(req: Request, res: Response)   : Promise<void>;
}

export class TaskController implements TaskControllerInterface {
  protected taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.user.userId;
      const { title, description } = req.body;
      
      const task = await this.taskRepository.create({ 
        title, 
        description, 
        user: new mongoose.Types.ObjectId(userId) 
      });

      res.status(201).json({
        msg: "Task added successfully",
        task: task
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An error occurred in the server" });
      }
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = new mongoose.Types.ObjectId(req.body.user.userId);
      const tasks = await this.taskRepository.findAll(userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve tasks" });
    }
  }

  async getTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const userId = new mongoose.Types.ObjectId(req.body.user.userId);
      const task = await this.taskRepository.findById(id, userId);
      task ? res.status(200).json(task) : res.status(404).json({ error: "Task not found" });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving task" });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const userId = new mongoose.Types.ObjectId(req.body.user.userId);
      const updatedTask = await this.taskRepository.update(id, userId, req.body);
      updatedTask ? res.status(200).json(updatedTask) : res.status(404).json({ error: "Task not found or unauthorized" });
    } catch (error) {
      res.status(500).json({ error: "Error updating task" });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const userId = new mongoose.Types.ObjectId(req.body.user.userId);
      const deletedTask = await this.taskRepository.delete(id, userId);
      deletedTask ? 
        res.status(200).json({ msg: "Task deleted successfully" }) : 
        res.status(404).json({ error: "Task not found or unauthorized" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting task" });
    }
  }
}