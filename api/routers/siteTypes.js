import SiteTypesController from '../controllers/siteTypeCTRL.js';
import { Router } from 'express';

const router = Router();

export function siteTypesRoute() {
  const controller = SiteTypesController();

  router.route('/')
    .get(controller.get)

  return router;
}
