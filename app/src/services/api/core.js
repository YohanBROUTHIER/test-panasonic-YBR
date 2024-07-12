import { apiBaseUrl } from "../config.js";
import AppError from "../../utils/appError.js";

export default class CoreApi {
  static routeName;

  // Méthode pour les requête de creation d'un élement.
  static async create(data) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}`, {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(data)
    });

    await this.errorHandler(httpResponse);

    return await httpResponse.json();
  }

  // Méthode pour les requête de récupération d'un élement par id.
  static async get(id) {
    const headers = new Headers();
    
    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
      headers,
      mode: "cors"
    });

    await this.errorHandler(httpResponse);

    return await httpResponse.json();
  }

  // Méthode pour les requête de récupération de tout les elements qui respect le filtre.
  static async getAll(query = null) {
    const headers = new Headers();

    let url = `${apiBaseUrl}/${this.routeName}`;
    if (query) {
      url += `?${query}`;
    }

    const httpResponse = await fetch(url, {
      headers,
      mode: "cors"
    });

    await this.errorHandler(httpResponse);

    return await httpResponse.json();
  }

  // Méthode pour les requête de modification d'un élement.
  static async update(id, data) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
      method: "PATCH",
      headers,
      mode: "cors",
      body: JSON.stringify(data)
    });
  
    await this.errorHandler(httpResponse);
    
    return await httpResponse.json();
  }

  // Méthode pour les requête de suppression d'un élement.
  static async delete(id) {
    const headers = new Headers();
    headers.append('x-xsrf-token', xsrfToken);

    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
      method: "DELETE",
      headers,
      mode: "cors"
    });
  
    await this.errorHandler(httpResponse);
  
    return true;
  }

  // Analyse si le retour du fetch contient une erreur.
  // Si c'est le cas contruire une erreur au format standard.
  static async errorHandler(res) {
    if (res.ok) return;
    let responce;
    try {
      responce = await res.json();
    } catch (error) {
      throw new AppError(res.statusText, {httpStatus: res.status});
    }
    throw new AppError(responce.error, {httpStatus: res.status});
  }
}