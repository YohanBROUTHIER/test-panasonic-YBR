import { Card, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";

import { ListPage } from "../../components/index.js";
import SortModal from "./sortModal.jsx";
import FilterModal from "./filterModal.jsx";
import AchatEnTeteApi from "../../services/api/achatEnTete.js";
import dayjs from "dayjs";
import AchatQueryMapper from "../../utils/queryMapper/achat.js";

export default function Lists() {
  return (
    <ListPage
      CardItem={CardAchat}
      loaderDataName="achat"
      Api={AchatEnTeteApi}
      actionPath="/buy-order"
      SortModal={SortModal}
      FilterModal={FilterModal}
      queryMapper={AchatQueryMapper}
    />
  );
}

function CardAchat(props) {
  const {item, ...otherProps} = props;

  return (
    <Card
      {...otherProps}
      component={Link}
      href={"./" + item.id}
      underline="none"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ":hover": {
          backgroundColor: "backgroundPrimary.main"
        }
      }}
    >
      <CardHeader
        title={item.fournisseur?.description || "Aucun fournisseur"}
        subheader={item.statut.description}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" rowGap={1}>
          <Typography variant="body2" sx={{mr: "1rem"}}>{dayjs(item.creation_date).format("DD/MM/YYYY HH:MM")}</Typography>
          <Typography variant="body2">{`Montant total: ${item.cout}€`}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}