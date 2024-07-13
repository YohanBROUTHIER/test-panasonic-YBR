import { useRef } from "react";
import { useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { Container, Fab, Grid, Stack } from "@mui/material";
import { Edit as EditIcon, Done as DoneIcon, Close as CloseIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { timeConvertor } from "../../utils/index.js";

export default function Event({isNew}) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const formRef = useRef();
  const actionData = useActionData();
  const loaderData = useLoaderData();

  console.log(loaderData)

  return(
    <>
      <Container component="main" maxWidth="md" sx={{mt: "1rem", ml: "auto", mr: "auto"}}>
        <Grid
          ref={formRef}
          container
          component={"form"}
          spacing={2}
          method={isNew ? "POST" : "PATCH"}
          action={isNew ? "/event" : `/event/${event.id}`}
        >
          {event?.id &&
            <input type="hidden" name="id" value={event.id} />
          }
          

          {/* <Grid item container xs={12} spacing={2}>
            <Grid item>
              <TextField
                required
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                id="startDate"
                label="Début :"
                name="startDate"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                color={startDate ? 'success' : undefined}
                focused={startDate ? true : undefined}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                id="endDate"
                label="Début :"
                name="endDate"
                value={endDate}
                min={startDate}
                onChange={(event) => setEndDate(event.target.value)}
                color={endDate ? 'success' : undefined}
                focused={endDate ? true : undefined}
              />
            </Grid>
          </Grid>
          <Grid item xs="auto">
          </Grid>
          <Grid item xs={12}>
            <input type="hidden" name="risks" value={newRisks.join("-")} />
            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Risks
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="risks">Risques</InputLabel>
                  <Select
                    id="risks"
                    multiple
                    value={newRisks}
                    label="Risques"
                    onChange={(event) => setNewRisks(event.target.value)}
                    renderValue={(selected) =>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        useFlexGap
                        flexWrap="wrap"
                      >
                        {selected.map(id => {
                          const selectedRisk = risks.find(risk => risk.id === id);
                          return (
                            <Chip key={id} label={selectedRisk.name} />
                          );
                        })}
                      </Stack>
                    }
                  >
                    {risks?.map(risk =>
                      <MenuItem key={risk.id} value={risk.id}>
                        <Checkbox checked={newRisks.includes(risk.id)} />
                        <ListItemText primary={risk.name} />
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
                <TextField
                  multiline
                  maxRows={4}
                  fullWidth
                  id="otherRisk"
                  label="Autres risques"
                  name="otherRisk"
                  value={otherRisk}
                  onChange={(event) => setOtherRisk(event.target.value)}
                  error={Boolean(otherRisk && otherRiskError)}
                  helperText={otherRisk && otherRiskError ? otherRiskError: undefined}
                  color={otherRisk && !otherRiskError ? 'success' : undefined}
                  focused={otherRisk && !otherRiskError ? true : undefined}
                />
              </AccordionDetails>
            </Accordion>
          </Grid> */}
        </Grid>
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