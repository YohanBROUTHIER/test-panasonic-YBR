import { Box, Card, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";

import { ListPage} from "../../components/index.js";
import AchatEnTeteApi from "../../services/api/achatEnTete.js";
import dayjs from "dayjs";

export default function Lists() {
  return (
    <ListPage
      CardItem={CardAchat}
      loaderDataName="achat"
      maxItemsPage={30}
      Api={AchatEnTeteApi}
      actionPath="/buy-order"
    />
  );
}

function CardAchat(props) {
  const {item, ...otherProps} = props;
  console.log(item)
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
        subheader={dayjs(item.creation_date).format("DD/MM/YYYY HH:MM")}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" rowGap={1}>
          <Typography variant="body2" sx={{mr: "1rem"}}>{item.creation_by}</Typography>
          <Typography variant="body2">{"Montant total: " + item.cout}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}