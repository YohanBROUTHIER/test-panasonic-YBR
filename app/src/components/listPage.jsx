import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Box, CircularProgress, Grid, IconButton, Stack, Typography } from "@mui/material";
import { RemoveCircle as RemoveCircleIcon, Cancel as CancelIcon } from "@mui/icons-material";

import { SearchForm } from "../components/index.js";

export default function Lists(props) {
  const { CardItem, loaderDataName, maxItemsPage, SortModal=null, FilterModal=null, Api, actionPath } = props;

  const navigate = useNavigate();
  const fetcher = useFetcher();
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openedModal, setOpenedModal] = useState(null);
  const [filterQuantity, setFilterQuantity] = useState(0);
  const [deleteModeList, setDeleteModeList] = useState(false);
  const [items, setItems] = useState(loaderData[loaderDataName]);
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(loaderData[loaderDataName]?.length < maxItemsPage);
  
  const url = new URL(window.location);

  useEffect(()=> {
    setItems(loaderData[loaderDataName]);
    setPage(1);
    setPageEnd(loaderData[loaderDataName]?.length < maxItemsPage);
  }, [loaderData[loaderDataName]]);

  useEffect(() => {
    if (pageEnd) {
      return;
    }
    async function loadNextPage(event) {
      const scrollingElement = event.target.scrollingElement;
      const maxScroll = scrollingElement.scrollHeight - scrollingElement.clientHeight;
      const scrollPosition = scrollingElement.scrollTop;

      if (maxScroll - 400 > scrollPosition) {
        return;
      }

      const params = new URLSearchParams(url.search);
      params.set("page", page + 1);
      const urlLimited = new URL(url.href.split("?")[0] + "?" + params.toString());

      // const query = queryMapper.events(urlLimited);
      const query = "";

      const newEvents = await Api.getAll(query);
      setItems([...items, ...newEvents]);
      setPage(page + 1);
      setPageEnd(newEvents.length < maxItemsPage);

      window.removeEventListener("scroll", loadNextPage);
    }


    window.addEventListener("scroll", loadNextPage);
    return () => window.removeEventListener("scroll", loadNextPage);
  }, [page, url]);


  function toggleDeleteItem(id) {
    return () => {
      if (deleteModeList.includes(id)) {
        return setDeleteModeList(deleteModeList.filter(item => item !== id));
      }
      setDeleteModeList([...deleteModeList, id]);
    };
  }

  function deleteItems() {
    Promise.all(
      deleteModeList.map(id =>
        new Promise((resolve) => 
          resolve(fetcher.submit(null,{
            method: "DELETE",
            action: `${actionPath}/${id}`
          }))
        )
      )
    );
    setDeleteModeList(false);
  }


  return(
    <>
      <Box component="main" >
        <SearchForm
          isFilterable={!!FilterModal}
          {...{deleteModeList, setDeleteModeList, setOpenedModal, filterQuantity}}
          addItem={() => navigate(`${actionPath}/new`)}
          deleteSubmit={deleteItems} />
        {items?.length > 0 ?
          <>
            <Grid
              container
              spacing={2}
              component="ul"
            >
              {items.map((item) =>
                <Grid
                  key={item.id}
                  component="li"
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{position: "relative"}}
                >
                  <CardItem {...{item}}/>
                  {deleteModeList && !item.isDeleted &&
                    <IconButton
                      aria-label="supprimer"
                      onClick={toggleDeleteItem(item.id)}
                      size="large"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: "-.4rem",
                        right: "-.4rem"
                      }}
                    >
                      {deleteModeList.includes(item.id) ?
                        <CancelIcon fontSize="inherit"/>
                        :
                        <RemoveCircleIcon fontSize="inherit"/>
                      }
                    </IconButton>
                  }
                </Grid>
              )}
            </Grid>
            {pageEnd ?
              <Typography color="text.secondary" sx={{mt: "1rem", ml: "auto", mr: "auto", width: "max-content"}}>
                Aucun autres elements pour cette recherche
              </Typography>
              :
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{mt: "1rem"}}
              >
                <CircularProgress/>
                <Typography color="text.secondary">
                  Chargement de la page suivante
                </Typography>
              </Stack>
            }
          </>
          :
          <Alert
            severity="info"
            sx={{width: "max-content", m: "auto"}}
          >
            Aucun element ne correspond à cette recherche.
          </Alert>
        }
      </Box>
      {SortModal &&
        <SortModal open={openedModal === "sort"} {...{setOpenedModal, searchParams, setSearchParams}}/>
      }
      {FilterModal &&
        <FilterModal open={openedModal === "filter"} {...{setOpenedModal, searchParams, setSearchParams, filterQuantity, setFilterQuantity}} />
      }
    </>
  );
}