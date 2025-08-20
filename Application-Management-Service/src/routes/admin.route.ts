import express, { IRouter } from 'express';
import adminController from '../controllers/admin.controller';
import adminValidator from '../validators/admin.validator';
import { userAuth } from '../middlewares/auth.middleware';
import AdminValidator from '../validators/admin.validator';

class AdminRoutes {
  private AdminController = new adminController();
  private router = express.Router();
  private AdminValidator = new adminValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

     this.router.post('/', this.AdminValidator.loginValidator,this.AdminController.login);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default AdminRoutes;
