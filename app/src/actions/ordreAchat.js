import achatEnTeteApi from "../services/api/achatEnTete.js";
import AchatLigneApi from "../services/api/achatLigne.js";
import toast from "../utils/toast.js";
import Core from "./core";

export default class OrdreAchatAction extends Core{
  static Datamapper = achatEnTeteApi;
  static toastName = "L'ordre d'achat";
  static resultName = "ordreAchat";

  static async postMethode(request) {
    const data = await request.json();
    const { lignes, ...body } = data;

    const achatEnTete = await this.Datamapper.create(body);

    await Promise.all(
      lignes.map(ligne => 
        new Promise((resolve) => {
          resolve(AchatLigneApi.create({...ligne, achat_en_tete_id: achatEnTete.id}));
        })
      )
    );

    toast.success(this.toastName + " a été créé avec succès");
    return true;
  }
}