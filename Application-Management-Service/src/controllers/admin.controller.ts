/* eslint-disable @typescript-eslint/no-explicit-any */

import adminService from '../services/admin.service';

import { Request, Response, NextFunction } from 'express';
import Logger from '../config/logger';

class AdminController {
  public AdminService = new adminService();

  public login = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { email, password } = req.body;
      const data = await this.AdminService.login(email, password);
      return res.status(data.code).json(data);
    } catch (error) {
      const statusCode = error?.code || 500;
      return res.status(statusCode).json({
        code: statusCode,
        message: error?.message || "Internal Server Error"
      });
    }
  };


}

export default AdminController;
