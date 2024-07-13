/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";

import { App, ordreAchat } from '../containers/index.js';
import loaders from "../loaders/index.js";
import actions from "../actions/index.js";
import { errorHandler as eh } from "../utils/index.js";

// Contient toute la structure des pages de l'application.
// L'élement App est chargé sur toute les pages contenu dans children.
// Il contient l'interface
export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error404 />,
    children: [
      { path: "buy-order", action: eh(actions.OrdreAchat.many.bind(actions.OrdreAchat)), children: [
        {
          index: true,
          element: <ordreAchat.List />,
          loader: eh(loaders.OrdreAchat.many.bind(loaders.OrdreAchat))
        }, {
          path: "new",
          element: <ordreAchat.Form />,
          loader: eh(loaders.OrdreAchat.one.bind(loaders.OrdreAchat))
        }, {
          path: ":id",
          element: <ordreAchat.Form />,
          loader: eh(loaders.OrdreAchat.one.bind(loaders.OrdreAchat)),
          action: eh(actions.OrdreAchat.one.bind(actions.OrdreAchat))
        }
      ]}
    ]
  }
]);