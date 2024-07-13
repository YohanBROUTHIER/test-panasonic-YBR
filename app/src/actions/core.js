import { redirect } from "react-router-dom";
import { AppError, toast } from "../utils";

export default class Core {
  static Datamapper;
  static toastName;
  static resultName;

  static async one({ request, params }) {
    switch (request.method) {
    case "PATCH": {
      return this.patchMethode(request, params);
    }
    case "DELETE": {
      const { id } = params;
      if (!id || !String(id).match(/^[1-9]\d*$/)) {
        throw new AppError("Le paramètre dois être un entier positif.", {httpStatus: 400});
      }
    
      await this.Datamapper.delete(params.id);
      
      toast.success(this.toastName + " supprimé avec succès.");

      return redirect("..");
    }
    default: {
      throw new Response("Invalide methode", { status: 405 });
    }
    }
  }
  static async many({ request }) {
    switch (request.method) {
    case "POST": {
      return this.postMethode(request);
    }
    default: {
      throw new Response("Invalide methode", { status: 405 });
    }
    }
  }

  static async getFormData(request) {
    const formData = await request.formData();

    return this.parseFormData(formData);
  }

  static parseFormData(formData) {
    let result = {};
    for (let [key, value] of formData.entries()) {
      if (value === "") {
        continue;
      }

      if (key.match(/[Ii]d$/)) {
        result[key] = parseInt(value);  
        continue;    
      }

      if (key.match(/-list$/)) {
        const propertyName = key.slice(0, -5);
        if (!result[propertyName]) {
          result[propertyName] = [];
        }
        result[propertyName].push(value);
        continue;
      }

      result[key] = value;
    }

    return result;
  }

  static async patchMethode(request, params) {
    const data = await this.getFormData(request);
    const dataDB = await this.Datamapper.get(params.id);
    
    await new Promise((resolve) => {
      const isModified = Object.entries(data).some(([key,value]) => {
        return dataDB[key] !== value;
      });
  
      if (isModified) {
        return resolve(this.Datamapper.update(dataDB.id, data));
      }
      resolve();
    });
    
    toast.success(this.toastName + " modifié avec succès.");
    return redirect("..");
  }

  static async postMethode(request) {
    const data = await this.getFormData(request);
    
    await this.Datamapper.create(data);

    toast.success(this.toastName + " a été créé avec succès");
    return data;
  }
}