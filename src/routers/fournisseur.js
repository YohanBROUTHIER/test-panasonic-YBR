import { Router } from "express";

import FournisseurController from "../controllers/fournisseur.js";
import { errorHandler as eh } from "../middlewares/index.js";

const router = Router();

router.route("/")
  .get(eh(FournisseurController.getAll.bind(FournisseurController)));
//   .post(eh(FournisseurController.create.bind(FournisseurController)));

// router.route("/:id")
//   .get(eh(FournisseurController.getByPk.bind(FournisseurController)))
//   .patch(eh(FournisseurController.update.bind(FournisseurController)))
//   .delete(eh(FournisseurController.delete.bind(FournisseurController)));

export default router;