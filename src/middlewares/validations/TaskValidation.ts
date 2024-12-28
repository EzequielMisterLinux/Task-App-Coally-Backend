import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult, ValidationChain } from 'express-validator';
import mongoose from 'mongoose';

export class TaskValidation {
    private static validate = (req: Request, res: Response, next: NextFunction): void | Response => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(error => {
                    if ('param' in error) {
                        return {
                            field: error.param,
                            message: error.msg
                        };
                    }
                    return { field: 'unknown', message: error.msg };
                }),
            });
        }
        next();
    };

    static createTaskValidation: ValidationChain[] = [
        body('title')
            .trim()
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        
        body('description')
            .trim()
            .notEmpty()
            .withMessage('Description is required')
            .isLength({ min: 10, max: 500 })
            .withMessage('Description must be between 10 and 500 characters'),
    ];

    static updateTaskValidation: ValidationChain[] = [
        param('id')
            .custom((value) => mongoose.Types.ObjectId.isValid(value))
            .withMessage('Invalid task ID format'),

        body('title')
            .optional()
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        
        body('description')
            .optional()
            .trim()
            .isLength({ min: 10, max: 500 })
            .withMessage('Description must be between 10 and 500 characters'),
    ];

    static deleteTaskValidation: ValidationChain[] = [
        param('id')
            .custom((value) => mongoose.Types.ObjectId.isValid(value))
            .withMessage('Invalid task ID format'),
    ];

    static getTaskValidation: ValidationChain[] = [
        param('id')
            .custom((value) => mongoose.Types.ObjectId.isValid(value))
            .withMessage('Invalid task ID format'),
    ];


    static validateMiddleware(validations: ValidationChain[]) {
        return [...validations, TaskValidation.validate];
    }
}
