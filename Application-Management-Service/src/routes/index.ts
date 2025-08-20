import express, { IRouter } from 'express';
const router = express.Router();

import adminRoute from './admin.route';

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

  return router;
};

export default routes;
