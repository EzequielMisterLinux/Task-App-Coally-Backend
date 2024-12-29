import { Router, Request, Response } from "express";
import { TaskController } from '../controllers/TaskController';
import { UserController } from '../controllers/UserController';
import { Protected } from "../middlewares/security/Protected";
import { TaskValidation } from '../middlewares/validations/TaskValidation';
import { UserModel } from "../models/UserModel";
import { uploadImage } from "../middlewares/Multer";

const router = Router();
const userController = new UserController();
const protectedMiddleware = new Protected();
const taskController = new TaskController();


router.post('/register', uploadImage, (req: Request, res: Response) => userController.createUser(req, res));

router.post('/login', (req: Request, res: Response) => userController.login(req, res));

router.get(
    '/profile',
    protectedMiddleware.verifyToken,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await UserModel.findById(req.body.user.userId).select('-password');
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            
            res.json({ user });
        } catch (error) {
            res.status(500).json({ 
                message: 'Server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
);


router.post(
    '/logout',
    protectedMiddleware.verifyToken, 
    (req: Request, res: Response) => userController.logout(req, res)
);

router.get(
    '/tasks/:id',
    protectedMiddleware.verifyToken,
    TaskValidation.validateMiddleware(TaskValidation.getTaskValidation),
    (req: Request, res: Response) => taskController.getTask(req, res)
);

router.post(
    '/tasks',
    protectedMiddleware.verifyToken,
    TaskValidation.validateMiddleware(TaskValidation.createTaskValidation),
    (req: Request, res: Response) => taskController.createTask(req, res)
);

router.get(
    '/tasks',
    protectedMiddleware.verifyToken,
    (req: Request, res: Response) => taskController.getAllTasks(req, res)
);

router.put(
    '/tasks/:id',
    protectedMiddleware.verifyToken,
    TaskValidation.validateMiddleware(TaskValidation.updateTaskValidation),
    (req: Request, res: Response) => taskController.updateTask(req, res)
);

router.delete(
    '/tasks/:id',
    protectedMiddleware.verifyToken,
    TaskValidation.validateMiddleware(TaskValidation.deleteTaskValidation),
    (req: Request, res: Response) => taskController.deleteTask(req, res)
);

export default router;