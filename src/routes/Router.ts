import { Router, Request, Response } from "express";
import { TaskController } from '../controllers/TaskController';
import { UserController } from '../controllers/UserController';
import { Protected } from "../middlewares/Protected";

const router = Router();
const userController = new UserController();
const protectedMiddleware = new Protected();

router.post('/register', async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  await userController.login(req, res);
});

router.get('/profile', protectedMiddleware.verifyToken, (req: Request, res: Response) => {
  res.json({ user: req.body.user });
});

const taskController = new TaskController();

router.get(
  '/get-task/:id',
  protectedMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    await taskController.getTask(req, res);
  }
);

router.post(
  '/create-task',
  protectedMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    const { userId } = req.body; 
    await taskController.createTask(req, res);
  }
);

router.get(
  '/all-tasks',
  protectedMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    await taskController.getAllTasks(req, res);
  }
);

router.put(
  '/update-task/:id',
  protectedMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    await taskController.updateTask(req, res);
  }
);

router.delete(
  '/delete-task/:id',
  protectedMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    await taskController.deleteTask(req, res);
  }
);

export default router;
