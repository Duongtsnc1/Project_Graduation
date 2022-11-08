import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import { AppBar, Toolbar, IconButton, Popover, Menu, Icon, Checkbox } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Breadcrumbs from "examples/Breadcrumbs";

// Argon Dashboard 2 MUI example components
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Argon Dashboard 2 MUI context
import {
  useArgonController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import ArgonButton from "components/ArgonButton";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const route = useLocation().pathname.split("/").slice(1);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
        <ArgonBox
          color={light && transparentNavbar ? "white" : "dark"}
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <ArgonBox color={light ? "white" : "inherit"}>
            <IconButton sx={navbarIconButton} size="small" onClick={() => {
                navigate("/");
              }}>
              <Icon
                sx={({ palette: { dark, white } }) => ({
                  color: light && transparentNavbar ? white.main : dark.main,
                })}
              >
                dashboard
              </Icon>
              <ArgonTypography
                variant="button"
                fontWeight="medium"
                color={light && transparentNavbar ? "white" : "dark"}
                fontSize="15px"
              >
                Dashboard
              </ArgonTypography>
            </IconButton>
            <IconButton
              sx={navbarIconButton}
              size="small"
              onClick={() => {
                navigate("/logs");
              }}
            >
              <Icon
                sx={({ palette: { dark, white } }) => ({
                  color: light && transparentNavbar ? white.main : dark.main,
                })}
              >
                article
              </Icon>
              <ArgonTypography
                variant="button"
                fontWeight="medium"
                color={light && transparentNavbar ? "white" : "dark"}
                fontSize="15px"
              >
                AnomalyLogs
              </ArgonTypography>
            </IconButton>
            <IconButton
              sx={navbarIconButton}
              size="small"
              onClick={() => {
                navigate("/datadetail");
              }}
            >
              <Icon
                sx={({ palette: { dark, white } }) => ({
                  color: light && transparentNavbar ? white.main : dark.main,
                })}
              >
                data_saver_off  
              </Icon>
              <ArgonTypography
                variant="button"
                fontWeight="medium"
                color={light && transparentNavbar ? "white" : "dark"}
                fontSize="15px"
              >
                Datadetail
              </ArgonTypography>
            </IconButton>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>
          <ArgonBox color={light ? "white" : "inherit"}>
            <IconButton sx={navbarIconButton} size="small" >
              <Icon
                sx={({ palette: { dark, white } }) => ({
                  color: light && transparentNavbar ? white.main : dark.main,
                })}
              >
                account_circle
              </Icon>
              <ArgonTypography
                variant="button"
                fontWeight="medium"
                color={light && transparentNavbar ? "white" : "dark"}
              >
                Administrator
              </ArgonTypography>
            </IconButton>

            <IconButton
              size="small"
              color={light && transparentNavbar ? "white" : "dark"}
              sx={navbarMobileMenu}
              onClick={handleMiniSidenav}
            >
              <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
            </IconButton>
            <IconButton
              size="small"
              color={light && transparentNavbar ? "white" : "dark"}
              sx={navbarIconButton}
              aria-controls="notification-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleOpenMenu}
            >
              <Icon>notifications</Icon>
            </IconButton>
            {renderMenu()}
          </ArgonBox>
        </ArgonBox>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
