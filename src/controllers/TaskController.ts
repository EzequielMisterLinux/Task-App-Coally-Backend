import { Request, Response,  } from 'express';
import { TaskRepository } from '../repositories/TaskRepository';


export interface TaskControllerInterface {
    createTask(req: Request, res: Response)  : Promise<void>;
    getAllTasks(req:Request, res:Response)   : Promise<void>;
    getTask(req:Request, res:Response)       : Promise<void>;
    updateTask(req:Request, res:Response)    : Promise<void>;
    deleteTask(req:Request, res:Response)    : Promise<void>;
}

export class TaskController implements TaskControllerInterface{

    
    protected taskRepository  :TaskRepository
    constructor(
        
    ){
        this.taskRepository = new TaskRepository;
    }

    async createTask(req: Request, res: Response): Promise<void> {

        try {

            const task = await this.taskRepository.create(req.body)

            res.status(201).json(task)
            
        } catch (error) {
            
            (error instanceof Error) ? res.status(400).json({error: error.message}) : res.status(500).json({error: "has problem ocurred in server"})
        }
        
    }

    async getAllTasks(req: Request, res: Response): Promise<void> {
        
    }

    async getTask(req: Request, res: Response): Promise<void> {
        
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        
    }
}