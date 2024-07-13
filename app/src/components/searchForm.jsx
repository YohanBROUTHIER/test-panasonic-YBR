import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Badge, Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import {
  Delete as DeleteIcon, FilterAlt as FilterIcon, Sort as SortIcon,
  LibraryAdd as AddIcon, Done as DoneIcon, Close as CloseIcon
} from "@mui/icons-material";

import { SearchBar } from "./index.js";

export default function SearchForm({addItem, deleteModeList, setDeleteModeList, deleteSubmit, setOpenedModal, filterQuantity = 0}) {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const { url } = loaderData;

  function searchChangeHandler(event) {
    const newValue = event.target.value;
    setSearch(newValue);

    if (event.target.value) {
      searchParams.set("search", newValue);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }

  function cancelHandler() {
    setSearch("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  }

  function toggleDeletemodeList() {
    if (deleteModeList) {
      return setDeleteModeList(false);
    }
    setDeleteModeList([]);
  }

  return(
    <Paper
      elevation={0}
      sx={{pt: "1rem", pb: "1rem"}}
    >
      <Stack
        component="form"
        maxWidth="sm"
        direction="row"
        alignItems="center"
        spacing={0.5}
        onSubmit={(event) => event.preventDefault()}
        sx={{m: "auto"}}
      >
        <SearchBar
          sx={{ flexGrow: 1 }}
          value={search}
          onChange={searchChangeHandler}
          cancelHandler={cancelHandler}
        />
        {setOpenedModal &&
          <>
            <IconButton aria-label="trie" onClick={() => setOpenedModal("sort")}>
              <SortIcon />
            </IconButton>
            <IconButton aria-label="filtre" onClick={() => setOpenedModal("filter")}>
              <Badge badgeContent={filterQuantity} color="secondary">
                <FilterIcon />
              </Badge>
            </IconButton>
          </>
        }
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={0.5}
        sx={{
          mt: "1rem",
          backgroundColor: deleteModeList ? "warning.main" : undefined
        }}
      >
        {deleteModeList ?
          <>
            <Typography>
              {deleteModeList.length > 0 ?
                `Voulez vous supprimer les ${deleteModeList.length} élements`
                :
                "Aucun element à supprimer"
              }
            </Typography>
            {deleteModeList.length > 0 &&
              <IconButton aria-label="supprimer" onClick={deleteSubmit}>
                <DoneIcon />
              </IconButton>
            }
            <IconButton aria-label="annuler" onClick={toggleDeletemodeList}>
              <CloseIcon />
            </IconButton>
          </>
          :
          <>
            <IconButton aria-label="ajouter" onClick={addItem}>
              <AddIcon />
            </IconButton>
            {setDeleteModeList &&
            <IconButton aria-label="supprimer" onClick={toggleDeletemodeList}>
              <DeleteIcon />
            </IconButton>
            }
          </>
        }
      </Stack>
    </Paper>
  );
}