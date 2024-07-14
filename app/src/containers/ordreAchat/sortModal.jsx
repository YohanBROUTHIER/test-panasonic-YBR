import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { Modal } from "../../components";

export default function SortModal(props) {
  const {open, setOpenedModal, searchParams, setSearchParams} = props;
  const [orderBy, setOrderBy] = useState(searchParams.get("order")?.split("-")[0] || "reception_date");
  const [orderDirection, setOrderDirection] = useState(searchParams.get("order")?.split("-")[1] || "asc");

  function submitHandler(event) {
    event.preventDefault();
    searchParams.set("order", `${orderBy}-${orderDirection}`);
    setSearchParams(searchParams);
    setOpenedModal(null);
  }

  return (
    <Modal
      {...{open, setOpenedModal, submitHandler}}
      title="Trie"
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} >
        <InputLabel id="order_by-label">Propriété</InputLabel>
        <Select
          labelId="order_by-label"
          id="order_by"
          name="order_by"
          value={orderBy}
          label="Propriété"
          onChange={(event) => setOrderBy(event.target.value)}
        >
          <MenuItem value="reception_date">Date de réception</MenuItem>
          <MenuItem value="creation_date">Date de création</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} >
        <InputLabel id="order_direction-label">Direction</InputLabel>
        <Select
          labelId="order_direction-label"
          id="order_direction"
          name="order_direction"
          value={orderDirection}
          label="Direction"
          onChange={(event) => setOrderDirection(event.target.value)}
        >
          <MenuItem value="asc">Ascendant</MenuItem>
          <MenuItem value="desc">Descendant</MenuItem>
        </Select>
      </FormControl>
    </Modal>
  );
}