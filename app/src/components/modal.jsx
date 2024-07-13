import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function FormModal(props) {
  const {children, submitHandler, encType, title, setOpenedModal, ...otherProps} = props;

  function closeModal() {
    setOpenedModal(null);
  }

  return(
    <Dialog
      {...otherProps}
      onClose={closeModal}
      PaperProps={{
        component:"form",
        onSubmit: submitHandler,
        encType: encType
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Annuler</Button>
        <Button type="submit">Valider</Button>
      </DialogActions>
    </Dialog>

  );
}