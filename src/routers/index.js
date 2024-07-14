import { Router } from "express";

import achatEnTete from "./achatEnTete.js";
import achatLigne from "./achatLigne.js";
import article from "./article.js";
import emplacement from "./emplacement.js";
import fournisseur from "./fournisseur.js";
import statutAchat from "./statutAchat.js";
import stock from "./stock.js";
import transaction from "./transaction.js";

import { notFound } from "../middlewares/index.js";

const router = Router();

// Main API routes
router.use("/achat-en-tete", achatEnTete);
router.use("/achat-ligne", achatLigne);
router.use("/article", article);
router.use("/emplacement", emplacement);
router.use("/fournisseur", fournisseur);
router.use("/statut-achat", statutAchat);
router.use("/stock", stock);
router.use("/transaction", transaction);

router.use(notFound);

export default router;