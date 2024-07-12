/* eslint-disable react/display-name */
import React from "react";
import { createTheme, ThemeProvider as  MuiThemeProvider} from "@mui/material/styles";
import { Link as RouterLink  } from "react-router-dom";
import { useMediaQuery } from "@mui/material";


const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export default function ThemeProvider({children}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
    palette: {
      // mode: prefersDarkMode ? "dark" : (prefersLightMode ? "light" : undefined),
      mode: undefined,
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
      backgroundPrimary: {
        main: "#c5cae9",
      },
      backgroundSecondary: {
        main: "#e8eaf6",
      }
    },
  });

  return (
    <MuiThemeProvider theme={theme} >
      {children}
    </MuiThemeProvider>
  );
};