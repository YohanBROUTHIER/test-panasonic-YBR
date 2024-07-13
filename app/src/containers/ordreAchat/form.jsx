import { useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { Button, Container, Fab, FormControl, Input, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Add as AddIcon, Done as DoneIcon, Close as CloseIcon } from '@mui/icons-material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import OrdreAchatAction from "../../actions/ordreAchat";

// Liste des colones pour les lignes d'achats.
// Le format a respecté est [label, reqProperty, typeImput, loaderDataName]
const achatLigneColumns = [
  ["Descritpion", "article_id", "select", "articleList"],
  ["Qte commandé", "quantite_commande", "number"],
  ["Qte receptionné", "quantite_reception", "number"],
  ["Unité", "unite_commande", "text"],
  ["Delai demandé", "delai_demande", "date"],
  ["Delai confirmé", "delai_confirme", "date"],
  ["Prix unitaire", "prix_unitaire", "number"]
];

export default function Event() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const formRef = useRef();
  const actionData = useActionData();
  const loaderData = useLoaderData();

  const { achat, fournisseurList, articleList } = loaderData;

  const [fournisseur, setFournisseur] = useState(achat?.fournisseur.id || "");
  const [achatLigneRow, setAchatLigneRow] = useState(achat?.lignes || []);

  function addNewLigne() {
    const emptyLigne = achatLigneColumns.reduce((previousValue, [_, reqProperty, typeImput]) => {
      const newValue = {};
      let value;
      switch (typeImput) {
      case "number":
        value = 0;
        break;
      case "date":
        value = dayjs();
        break;
      
      default:
        value = "";
        break;
      }
      newValue[reqProperty] = value;


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
      setAchatLigneRow(updatedLigne);
    };
  }

  const isSubmitable = !!fournisseur && achatLigneRow.length > 0 && !achatLigneRow.some(row => 
    Object.values(row).some(cell => cell === '')
  );

  function submitOnClick() {
    const formData = new FormData(formRef.current);
    const body = OrdreAchatAction.parseFormData(formData);
    body["lignes"] = achatLigneRow;
    submit(body, {
      method: !achat ? "POST" : "PATCH",
      action: !achat ? "../" : `./${achat.id}`,
      encType: "application/json"
    });
  }

  return(
    <>
      <Container component="main" maxWidth="xl" sx={{mt: "4rem", ml: "auto", mr: "auto"}}>
        <Stack
          ref={formRef}
          component={Form}
          spacing={2}
          method={!achat ? "POST" : "PATCH"}
          action={!achat ? "../" : `./${achat.id}`}
        >
          {/* L'element select du fournisseur. */}
          <FormControl required sx={{width: "min(100%, 30rem)", alignSelf: "center"}}>
            <InputLabel htmlFor="fournisseur">Fournisseur</InputLabel>
            <Select
              id="fournisseur"
              name="fournisseur_id"
              label="Fournisseur"
              value={fournisseur}
              onChange={(event) => setFournisseur(event.target.value)}
            >
              {fournisseurList?.map(fournisseur =>
                <MenuItem key={fournisseur.id} value={fournisseur.id}>
                  {fournisseur.description}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          
          {/* Affiche la table des ligne d'achat. */}
          <Paper sx={{overflowX: "auto"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                      {achatLigneColumns.map(([_, reqProperty, typeImput, loaderDataName]) => 
                        <TableCell key={index + reqProperty} >
                          {typeImput === "select" &&
                            <Select
                              value={achatLigneRow[index][reqProperty]}
                              onChange={updateLigne(index, reqProperty)}
                              required
                              fullWidth
                              variant="standard"
                            >
                              {loaderData[loaderDataName].map(item =>
                                <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                              )}
                            </Select>
                          }
                          {typeImput === "date" &&
                            <DatePicker
                              slotProps={{textField: {variant: "standard"}}}
                              value={achatLigneRow[index][reqProperty]}
                              onChange={(value) => updateLigne(index, reqProperty)({target: {value}})}
                              sx={{minWidth: "9.5rem"}}
                            />
                          }
                          {typeImput !== "select" && typeImput !== "date" &&
                            <Input
                              type={typeImput}
                              value={achatLigneRow[index][reqProperty]}
                              onChange={updateLigne(index, reqProperty)}
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
            </LocalizationProvider>
          </Paper>
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
          <Fab
            size="small"
            color="primary"
            aria-label="Retour"
            onClick={() => navigate(-1)}
          >
            <CloseIcon />
          </Fab>
          <Fab
            size="small"
            color="primary"
            aria-label="submit"
            type="submit"
            onClick={submitOnClick}
            disabled={isSubmitable ? false : true}
          >
            <DoneIcon />
          </Fab>
        </Stack>
      </Container>
    </>
  );
}