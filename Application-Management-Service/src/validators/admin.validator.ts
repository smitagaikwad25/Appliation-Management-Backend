import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class AdminValidator {
  public loginValidator = (req: Request, res: Response, next: NextFunction): any => {
    const loginSchema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email"
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters"
      })
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
    return res.status(400).json({
        code: 400,
        success: false,
        message: "Validation error",
        details: error.details.map((err) => err.message) // clean error messages
      });
    }
    next();
  };
}

export default AdminValidator;
