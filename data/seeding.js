import { faker } from "@faker-js/faker";
import "../src/helpers/envLoad.js";

import datamappers from "../src/datamappers/index.js";

// Génère 5 articles
const articleList = faker.helpers.multiple(createRandomArticle, {
  count: 10
});

//Génère 20 emplacements
const emplacementList = faker.helpers.multiple(createRandomEmplacement, {
  count: 20
});

//Génère 5 fournisseurs
const fournisseurList = faker.helpers.multiple(createRandomFournisseur, {
  count: 5
});

// Creation d'une promesse qui sera résolu si tout les articles sont crée
const createArticles = Promise.all(
  articleList.map(article =>
    new Promise(resolve => {
      resolve(datamappers.Article.create(article));
    })
  )
);

// Creation d'une promesse qui sera résolu si tout les emplacements sont crée
const createEmplacements = Promise.all(
  emplacementList.map(emplacement =>
    new Promise(resolve => {
      resolve(datamappers.Emplacement.create(emplacement));
    })
  )
);

const createFournisseur = Promise.all(
  fournisseurList.map(fournisseur =>
    new Promise(resolve => {
      resolve(datamappers.Fournisseur.create(fournisseur));
    })
  )
);

// Parallèlise la créastion des articles et des emplacements
const [articleListDB, emplacementListDB, fournisseurDB] = await Promise.all([
  createArticles,
  createEmplacements,
  createFournisseur
]);

//Génère 100 stocks
const stockList = faker.helpers.multiple(createRandomStock, {
  count: 100
});

// Créer les stock
const createStock = Promise.all(
  stockList.map(stock =>
    new Promise(resolve => {
      resolve(datamappers.Stock.create(stock));
    })
  )
);

// Génère 100 en tête d'achat
const achatEnTeteList = faker.helpers.multiple(createRandomAchatEnTete, {
  count: 100
});

const createAchat = Promise.all(
  achatEnTeteList.map(achatEnTete =>
    new Promise(resolve => {
      resolve(datamappers.AchatEnTete.create(achatEnTete));
    }).then(achatEnTeteDB => {
      const achatLigneList = faker.helpers.multiple(createRandomAchatLigne(achatEnTeteDB.id), {
        count: {
          min: 1,
          max: 6
        }
      });
      return Promise.all(
        achatLigneList.map(achatLigne =>
          new Promise(resolve => {
            resolve(datamappers.AchatLigne.create(achatLigne));
          })
        )
      );
    })
  )
);

await Promise.all([
  createStock,
  createAchat
]);




// Fonction qui génère un article aléatoire
function createRandomArticle() {
  return {
    description: faker.commerce.productName(),
    unite_de_stock: 0
  };
}

// Fonction qui génère un Emplacement aléatoire
function createRandomEmplacement() {
  return {
    description: faker.commerce.department(),
    statut_dispo: true
  };
}

// Fonction qui créer un stock aléatoire
function createRandomStock() {
  return {
    emplacement_id: getRandomElement(emplacementListDB).id,
    article_id: getRandomElement(articleListDB).id,
    quantity: 0,
    statut_dispo: true
  }
}

// Fonction qui génère un fournisseur aléatoire
function createRandomFournisseur() {
  return {
    description: faker.company.name()
  };
}

// Fonction qui génère un achat aléatoire
function createRandomAchatEnTete() {
  return {
    fournisseur_id: getRandomElement(fournisseurDB).id
  };
}

// Fonction qui génère un achat aléatoire
function createRandomAchatLigne(achat_en_tete_id) {
  return () => {
    const article_id = getRandomElement(articleListDB).id;
    const quantite_commande = getRandomInt(1, 20);
    const quantite_reception = getRandomInt(0, quantite_commande);
    const unite_commande = getRandomElement([
      "unité",
      "kg",
      "sac",
      "palette",
      "big bag"
    ]);
  
    const creation_date = faker.date.between({from:"2024-01-01", to:"2025-01-01"});
    const delai_demande = faker.date.soon({days: 30, refDate: creation_date});
    const delai_confirme = faker.date.soon({days: 8, refDate: delai_demande});
  
    const prix_unitaire = getRandomInt(4, 80);
  
    return {
      achat_en_tete_id,
      article_id,
      quantite_commande,
      quantite_reception,
      unite_commande,
      delai_demande,
      delai_confirme,
      prix_unitaire,
      creation_date
    };
  };
}

// Génère un entier entre les deux limites
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Fonction permettant de récupéré un élément aléatoire d'une liste
function getRandomElement(data) {
  return data[Math.floor(Math.random() * data.length)];
}

function getMultipleRandomElement(data,min,max) {
  max = max ? max : min;
  const nbResult = Math.floor(Math.random() * (max-min + 1)) + min;
  let result = [];
  while (result.length !== nbResult) {
    const newElement = getRandomElement(data);
    if (!result.some(element => element.id === newElement.id)) {
      result.push(newElement);
    }
  } 
  return result;
}

process.exit();