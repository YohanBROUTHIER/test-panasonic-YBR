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

  static async patchMethode(request, params) {
    const data = await request.json();
    const { lignes, ...body } = data;

    // La modification de l'entete après sa création n'a pas été demandé.
    // Il est possible de l'activé en décommentant la ligne ainsi que dans le router de l'api.
    // const updateAchatEnTete = new Promise((resolve) => resolve(this.Datamapper.update(params.id, data)));
    const updateLignes = Promise.all(
      lignes.map(ligne =>
        new Promise((resolve) => {
          const {quantite_reception, delai_confirme, statut_achat_id, ...other} = ligne;
          resolve(AchatLigneApi.update(ligne.id, {quantite_reception, delai_confirme, statut_achat_id}));
        })
      )
    );

    await Promise.all([
      // updateAchatEnTete,
      updateLignes
    ]);

    
    toast.success(this.toastName + " modifié avec succès.");
    return true;
  }
}