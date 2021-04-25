import { validateToken } from '../func.js';
import logsController from '../controllers/logsCTRL.js';
import { Router } from 'express';

const router = Router();

export function logsRoute() {
  const controller = logsController();

  router.route('/')
    .get(controller.get)
    .post(validateToken, controller.post)
    .delete(validateToken, controller.remove);

  return router;
}
