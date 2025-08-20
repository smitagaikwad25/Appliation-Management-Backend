import express, { IRouter } from 'express';
const router = express.Router();

import adminRoute from './admin.route';
import applicationRoutes from './application.route';
import swagger from 'swagger-ui-express';
import swaggerDoc from '../../src/swagger/openAPI.json'

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/admins', new adminRoute().getRoutes());
  router.use('/applications', new applicationRoutes().getRoutes());
  
    //swagger route
  router.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

  return router;
};

export default routes;
