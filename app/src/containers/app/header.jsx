import { forwardRef, Fragment, useEffect, useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem, Link, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import {Menu as MenuIcon} from "@mui/icons-material";
import { useMatches, useNavigate } from "react-router-dom";


// Pages array contain element format: [value, href, IconElement]
const pages = [
  ["Accueil", "/"],
  ["Achat", "/buy-order"]
];

function TypoLogo({setSelectedTab, display, flexGrow}) {
  return (
    <Typography
      variant="h6"
      noWrap
      component={Link}
      href="/"
      onClick={() => setSelectedTab("/")}
      sx={{
        mr: 2,
        display,
        flexGrow,
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      PanaStock
    </Typography>
  );
}

export default forwardRef(function Header(_, ref) {
  const navigate = useNavigate();
  const matches = useMatches();
  const theme = useTheme();
  const xsBreakPoint = useMediaQuery(theme.breakpoints.up('sm'));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [linkAnchor, setLinkAnchor] = useState(null);
  const [navSubMenu, setNavSubMenu] = useState(null);

  useEffect(() => {
    setAnchorElNav(null);
    setAnchorElUser(null);
    setLinkAnchor(null);
    setNavSubMenu(null);
  }, [xsBreakPoint]);

  const [selectedTab, setSelectedTab] = useState(
    matches
      .map(match => {
        const matchPage = pages.filter(page => match.pathname.includes(page[1])).reverse()[0];
        if (matchPage) {
          return matchPage[1];
        }
        return null;
      })
      .filter(match => match)
      .reverse()[0]
  );
  function handleOpenNavMenu(event) {
    setAnchorElNav(event.currentTarget);
  }
  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  function tabOnChange(event, newValue) {
    if (!newValue) {
      return;
    }
    setSelectedTab(newValue);
  }

  return (
    <AppBar ref={ref} position="static" color="backgroundPrimary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TypoLogo setSelectedTab={setSelectedTab} display={{ xs: "none", md: "flex" }} />
    
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Menu">
              <IconButton
                size="large"
                aria-label="menu of navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            {anchorElNav && 
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map(([value, href]) => {
                      if (Array.isArray(href)) {
                        return (
                          <div key={value}>
                            <MenuItem>
                              <Typography underline="none" color="inherit" textAlign="center" sx={{display: "block"}}>{value}</Typography>
                            </MenuItem>

                            {href.map(([subValue, subHref]) =>
                              <MenuItem key={subValue} onClick={(event) => {navigate(subHref); handleCloseNavMenu(event);}}>
                                <Link sx={{ml:"1rem"}} href={subHref} underline="none" color="inherit" textAlign="center">{subValue}</Link>
                              </MenuItem>
                            )}

                          </div>
                        );
                      }
                      return (
                        <MenuItem key={value} onClick={(event) => {navigate(href); handleCloseNavMenu(event);}}>
                          <Link href={href} underline="none" color="inherit" textAlign="center">{value}</Link>
                        </MenuItem>
                      );
                    })}
                  </Menu>
            }
          </Box>
          <TypoLogo setSelectedTab={setSelectedTab} display={{ xs: "flex", md: "none" }} flexGrow={1} />
              
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            <Tabs
              value={selectedTab}
              onChange={tabOnChange}
            >
              {pages.map(([value, href]) => {
                if (Array.isArray(href)) {
                  return (
                    <Tab key={value} label={value} onClick={(event) => {setNavSubMenu(value); setLinkAnchor(event.target);}}/>
                  );
                }
                return (
                  <Tab key={value} value={href} label={value} href={href} />
                );
              })}
            </Tabs>
            {pages.map(([value, href]) => {
              if (!Array.isArray(href)) {
                return (<Fragment key={value}></Fragment>);
              }
              return (
                <Menu
                  key={value}
                  sx={{ mt: "45px", display: {xs: "none", md: "block"}}}
                  id={`menu-${value.toLowerCase()}`}
                  anchorEl={linkAnchor}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={navSubMenu === value}
                  onClose={() => setNavSubMenu(null)}
                >
                  {href.map(([subValue, subHref]) => (
                    <MenuItem key={subValue} onClick={() => {navigate(subHref); setNavSubMenu(null);}}>
                      <Link href={subHref} underline="none" color="inherit" textAlign="center">{subValue}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
