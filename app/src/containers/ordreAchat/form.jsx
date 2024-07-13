import { useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { Button, Container, Fab, FormControl, Grid, Input, InputBase, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Done as DoneIcon, Close as CloseIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { timeConvertor } from "../../utils/index.js";

const achatLigneColumns = [
  ["Descritpion", "article_id"],
  ["Qte commandé", "quantite_commande"],
  ["Qte receptionné", "quantite_reception"],
  ["Unité", "unite_commande"],
  ["Prix unitaire", "prix_unitaire"]
];

export default function Event() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const formRef = useRef();
  const actionData = useActionData();
  const loaderData = useLoaderData();

  const { achat, fournisseurList, articleList } = loaderData;

  const [achatLigneRow, setAchatLigneRow] = useState(achat?.lignes || []);

  console.log(achatLigneRow);

  function addNewLigne() {
    const emptyLigne = achatLigneColumns.reduce((previousValue, [_, currentValue]) => {
      const newValue = {};
      newValue[currentValue] = "";
      return {...previousValue, ...newValue};
    }, {});
    setAchatLigneRow([...achatLigneRow, emptyLigne]);
  }
  function updateLigne(index, fieldName) {
    return (event) => {
      const updatedLigne = [...achatLigneRow];
      let value = event.target.value;
      if (fieldName !== "description" && fieldName !== "unite_commande") {
        value = Math.round(parseInt(value));
        if (isNaN(value)) {
          return;
        }
      }

      updatedLigne[index][fieldName] = value;
      console.log(updatedLigne);
      setAchatLigneRow(updatedLigne);
    };
  }

  return(
    <>
      <Container component="main" maxWidth="md" sx={{mt: "4rem", ml: "auto", mr: "auto"}}>
        <Stack
          ref={formRef}
          component={Form}
          spacing={2}
          method={!achat ? "POST" : "PATCH"}
          action={!achat ? -1 : `./${achat.id}`}
        >
          {/* L'element select du fournisseur. */}
          <FormControl fullWidth required>
            <InputLabel htmlFor="fournisseur">Fournisseur</InputLabel>
            <Select
              id="fournisseur"
              name="fournisseur_id"
              label="Fournisseur"
              defaultValue=""
            >
              {fournisseurList?.map(fournisseur =>
                <MenuItem key={fournisseur.id} value={fournisseur.id}>
                  {fournisseur.description}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          
          {/* Affiche la table des ligne d'achat. */}
          <Table>
            <TableHead>
              <TableRow>
                {achatLigneColumns.map(([columnName]) =>
                  <TableCell key={columnName} >{columnName}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {achatLigneRow.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {achatLigneColumns.map(([label, propertyName]) => 
                    <TableCell key={index + propertyName} >
                      {propertyName === "article_id" ?
                        <Select
                          id={`${index}-${propertyName}`}
                          name={propertyName}
                          value={achatLigneRow[index][propertyName]}
                          onChange={updateLigne(index, propertyName)}
                          required
                          fullWidth
                          variant="standard"
                        >
                          {articleList.map(article =>
                            <MenuItem key={article.id} value={article.id}>{article.description}</MenuItem>
                          )}
                        </Select>
                        :
                        <Input
                          type={propertyName === "unite_commande" ? "text" : "number"}
                          name={propertyName}
                          value={achatLigneRow[index][propertyName]}
                          onChange={updateLigne(index, propertyName)}
                          fullWidth
                          variant="standard"
                        />
                      }
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            startIcon={<AddIcon/>}
            onClick={addNewLigne}
            sx={{width: "max-content", alignSelf: "center"}}
          >
            {"Ajouter une ligne"}
          </Button>
        </Stack>

        {/* Menu contenant les boutons de retour et d'envoi du formulaire. */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{
            position: "fixed",
            top: "4.5rem",
            right: "1rem",
          }}
        >
          <Fab size="small" color="primary" aria-label="Read mode" onClick={() => navigate(-1)} >
            <CloseIcon />
          </Fab>
          <Fab size="small" color="primary" aria-label="submit" type="submit" onClick={() => submit(formRef.current)} >
            <DoneIcon />
          </Fab>
        </Stack>
      </Container>
    </>
  );
}