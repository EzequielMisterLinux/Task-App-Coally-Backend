import { Task } from "../models/TaskModel";
import mongoose from "mongoose";

export interface TaskInterface {
    create(taskData: Partial<Task> & { user: mongoose.Types.ObjectId }) : Promise<Task>;
    findAll(userId: mongoose.Types.ObjectId)                            : Promise<Task[]>;
    findById(id: string, userId: mongoose.Types.ObjectId)               : Promise<Task | null>;
    findByTitle(title: string, userId: mongoose.Types.ObjectId)         : Promise<Task | null>;
    update(
        id: string, 
        userId: mongoose.Types.ObjectId,
        taskData: Partial<Task>
    ): Promise<Task | null>; 
    delete(id: string, userId: mongoose.Types.ObjectId)                  : Promise<Task | null>;
}