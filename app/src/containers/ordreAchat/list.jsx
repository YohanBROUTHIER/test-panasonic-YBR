import { Box, Card, CardContent, CardHeader, Link, Typography } from "@mui/material";

import { ListPage} from "../../components/index.js";
import AchatEnTeteApi from "../../services/api/achatEnTete.js";

export default function Lists() {
  return (
    <ListPage
      CardItem={CardAchat}
      loaderDataName="achatEnTete"
      maxItemsPage={30}
      Api={AchatEnTeteApi}
      actionPath="/buy-order"
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
        title={item.title}
        subheader={item.type.name}
      />
      <CardContent>
        <Box>
          <Typography variant="body2">
              Période:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(new Date(item.startDate)).toLocaleString("fr-FR") + " - " + (new Date(item.endDate)).toLocaleString("fr-FR")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}