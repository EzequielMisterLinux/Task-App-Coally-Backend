import { Task } from "../models/TaskModel";

export interface TaskInterface {
    
    create(taskData:Partial<Task>)              :Promise<Task>;
    findAll ()                                  :Promise<Task[]>;
    findById (id:string)                        :Promise<Task | null>;
    findByTitle (title: string)                 :Promise<Task | null>;
    update (id:string, taskData: Partial<Task>) :Promise<Task | null>;
    delete (id:string)                          :Promise<Task | null>;

}