import { Router } from "express";
import { TaskController } from '../controllers/TaskController';



const router = Router()

const taskController = new TaskController()

router.get('/create-task', taskController.createTask)