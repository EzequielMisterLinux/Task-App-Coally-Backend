import { Router } from "express";
import { TaskController } from '../controllers/TaskController';

const router = Router();

const taskController = new TaskController();

router.get('/get-task/:id', (req, res) => taskController.getTask(req, res));

router.post('/create-task', (req, res) => taskController.createTask(req, res));

export default router;
