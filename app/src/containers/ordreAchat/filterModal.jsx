import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";

import { Modal } from "../../components/index.js";

export default function FiltersModal(props) {
  const loaderData = useLoaderData();
  const {open, setOpenedModal, searchParams, setSearchParams, filterQuantity = 0, setFilterQuantity} = props;
  const [expanded, setExpanded] = useState(null);
  const [fournisseurList, setFournisseurList] = useState(searchParams
    .get("fournisseur-list")
    ?.split("-")
    .map(item => parseInt(item))
    || []
  );
  const [statutList, setStatutList] = useState(searchParams
    .get("statut-list")
    ?.split("-")
    .map(item => parseInt(item))
    || []
  );
  const [startDate, setStartDate] = useState(searchParams.get("start_date") || "");
  const [endDate, setEndDate] = useState(searchParams.get("end_date") || "");

  const {fournisseurs, statutAchats} = loaderData;

  useEffect(() => {
    const newFilterQuantity = ["fournisseur-list", "statut-list", "start_date", "end_date"]
      .map(key => {
        const value = searchParams.get(key);
        if (!value) {
          return 0;
        }
        if (key.match(/-list$/)) {
          return value.split("-").length;
        }
        return 1;
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      },0);

    setFilterQuantity(newFilterQuantity);
  }, [searchParams]);

  function submitHandler(event) {
    event.preventDefault();

    [
      [fournisseurList.length > 0, "fournisseur-list", fournisseurList.join("-")],
      [statutList.length > 0, "statut-list", statutList.join("-")],
      [startDate, "start_date", startDate],
      [endDate, "end_date", endDate]
    ].forEach(([isDefined, paramsName, paramsValue]) => {
      if (!isDefined) {
        return searchParams.delete(paramsName);
      }
      searchParams.set(paramsName, paramsValue);
    });

    setSearchParams(searchParams);
    setOpenedModal(null);
  }

  function toggleItemSelect(state, setState) {
    return (event) => {
      const newValue = parseInt(event.target.value);

      if (!state.includes(newValue)) {
        return setState([...state, newValue]);
      }

      setState(state.filter(item => String(item) !== String(newValue)));
    };
  }

  function handleChange(panel) {
    return (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  }

  function deleteFilter() {
    setFournisseurList([]);
    setStatutList([]);
    setStartDate("");
    setEndDate("");
    [
      "fournisseur-list",
      "statut-list",
      "start_date",
      "end_date",
    ].forEach((paramsName) => searchParams.delete(paramsName));

    setSearchParams(searchParams);
    setOpenedModal(null);
  }

  return (
    <Modal
      {...{open, setOpenedModal, submitHandler}}
      title="Filtre"
    >
      {fournisseurs &&
        <Accordion expanded={expanded === "fournisseur"} onChange={handleChange("fournisseur")}>
          <AccordionSummary>
            <Typography>
              Fournisseurs
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {fournisseurs.map(item =>
                <FormControlLabel key={item.id}
                  control={
                    <Checkbox
                      value={item.id}
                      checked={fournisseurList.includes(item.id)}
                      onChange={toggleItemSelect(fournisseurList, setFournisseurList)}
                    />
                  }
                  label={item.description}
                />
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      }
      {statutAchats &&
        <Accordion expanded={expanded === "statut-list"} onChange={handleChange("statut-list")}>
          <AccordionSummary>
            <Typography>
              Statut
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {statutAchats.map(item =>
                <FormControlLabel key={item.id}
                  control={
                    <Checkbox
                      value={item.id}
                      checked={statutList.includes(item.id)}
                      onChange={toggleItemSelect(statutList, setStatutList)}
                    />
                  }
                  label={item.description}
                />
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      }
      <Accordion expanded={expanded === "date"} onChange={handleChange("date")}>
        <AccordionSummary>
          <Typography>
              Période
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{display: "flex", gap: "1rem", flexDirection: {xs: "column", sm: "row"}}}
        >
          <TextField
            type="datetime-local"
            name="start_date"
            label="Debut"
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <TextField
            variant="outlined"
            type="datetime-local"
            label="Fin"
            InputLabelProps={{
              shrink: true,
            }}
            name="end_date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </AccordionDetails>
      </Accordion>
      {!!filterQuantity &&
        <Button
          variant="contained"
          color="secondary"
          onClick={deleteFilter}
          sx={{position: "absolute", top: "1rem", right: "1rem"}}
        >
          Effacer
        </Button>
      }
    </Modal>
  );
}