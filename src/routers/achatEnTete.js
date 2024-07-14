import { Router } from "express";

import AchatEnTeteController from "../controllers/achatEnTete.js";
import { errorHandler as eh } from "../middlewares/index.js";

const router = Router();

router.route("/")
  .get(eh(AchatEnTeteController.getAll.bind(AchatEnTeteController)))
  .post(eh(AchatEnTeteController.create.bind(AchatEnTeteController)));

router.route("/:id")
  .get(eh(AchatEnTeteController.getByPk.bind(AchatEnTeteController)));
//   .patch(eh(AchatEnTeteController.update.bind(AchatEnTeteController)))
//   .delete(eh(AchatEnTeteController.delete.bind(AchatEnTeteController)));

export default router;