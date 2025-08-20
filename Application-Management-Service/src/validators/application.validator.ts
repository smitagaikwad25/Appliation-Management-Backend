import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class ApplicationValidator {
    public createApplicationValidator = (req: Request, res: Response, next: NextFunction) => {
        // Validate body fields
        const schema = Joi.object({
            fullName: Joi.string().min(2).max(100).required().messages({
                "string.empty": "Full name is required",
                "string.min": "Full name must be at least 2 characters",
                "string.max": "Full name cannot exceed 100 characters",
            }),
            email: Joi.string().email().required().messages({
                "string.empty": "Email is required",
                "string.email": "Email must be valid",
            }),
            phone: Joi.string().pattern(/^[0-9+\-() ]*$/).required().messages({
                "string.pattern.base": "Phone number format is invalid",
            }),
            position: Joi.string().required().messages({
                "string.empty": "Position is required",
            }),
        });

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                success: false,
                message: "Validation error",
                details: error.details.map((err) => err.message),
            });
        }

        // Validate resume file
        if (!req.file) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                success: false,
                message: "Resume file is required",
            });
        }

        next();
    };

    public updateApplicationValidator = (req: Request, res: Response, next: NextFunction) => {
        // Validate body fields
        const schema = Joi.object({
            fullName: Joi.string().min(2).max(100).optional().messages({
                "string.empty": "Full name is required",
                "string.min": "Full name must be at least 2 characters",
                "string.max": "Full name cannot exceed 100 characters",
            }),
            email: Joi.string().email().optional().messages({
                "string.empty": "Email is required",
                "string.email": "Email must be valid",
            }),
            phone: Joi.string().pattern(/^[0-9+\-() ]*$/).optional().messages({
                "string.pattern.base": "Phone number format is invalid",
            }),
            position: Joi.string().optional().messages({
                "string.empty": "Position is required",
            }),
        });

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                success: false,
                message: "Validation error",
                details: error.details.map((err) => err.message),
            });
        }

        next();
    };

    public updateApplicationStatusValidator = (req: Request, res: Response, next: NextFunction) => {
        // Validate body fields
        const schema = Joi.object({
            status: Joi.string()
                .valid("hired", "rejected")
                .required()
                .messages({
                    "any.required": "Status is required",
                    "any.only": "Status must be either 'hired' or 'rejected'",
                    "string.empty": "Status cannot be empty",
                }),
        });

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                success: false,
                message: "Validation error",
                details: error.details.map((err) => err.message),
            });
        }



        next();
    };
}

export default ApplicationValidator;
