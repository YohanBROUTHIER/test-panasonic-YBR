import { Container } from "@mui/material";
import { Copyright } from "../../components";

export default function Footer()  {

  return(
    <Container component="footer" maxWidth="xl" sx={{ mt: "2rem", mb: "1rem" }}>
      <Copyright />
    </Container>
  );
}