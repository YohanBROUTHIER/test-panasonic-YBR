import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollTop(props) {
  const { anchorRef } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  if (!anchorRef?.current) {
    return;
  }

  const handleClick = (event) => {
    anchorRef.current.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: {xs: "4rem", sm: ".5rem"}, right: ".5rem" }}
      >
        <Fab size="small" aria-label="scroll back to top" color="primary">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
}