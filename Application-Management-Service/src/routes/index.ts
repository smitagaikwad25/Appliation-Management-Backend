import express, { IRouter } from 'express';
const router = express.Router();

import adminRoute from './admin.route';
import applicationRoutes from './application.route';

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

  return router;
};

export default routes;
