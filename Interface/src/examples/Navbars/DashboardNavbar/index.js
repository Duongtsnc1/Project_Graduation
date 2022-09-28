import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import { AppBar, Toolbar, IconButton, Popover, Menu, Icon, Checkbox } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

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

function DashboardNavbar({ absolute, light, isMini, sensors, onChangeFilter }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickFilter = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleCheck = (key) => {
    let tempChecked = [...sensors];
    if (tempChecked.filter((item) => item.show).length === 1) return;
    let index = tempChecked.findIndex((item) => item.title === key);
    tempChecked[index].show = !tempChecked[index].show;
    onChangeFilter(tempChecked);
  };

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

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
        ></ArgonBox>
        <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>
          <ArgonBox pr={1}>
            <ArgonButton variant="text" onClick={handleClickFilter}>
              Show/Hide sensor {Boolean(anchorEl) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </ArgonButton>
            <Popover
              id="simple-popper"
              open={Boolean(anchorEl)}
              onClose={handleCloseFilter}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: {
                  padding: "10px",

                  boxShadow: "5px 5px 10px #000",
                  backgroundColor: "#fff",
                },
              }}
              disableAutoFocus
              disableRestoreFocus
            >
              <div
                style={{
                  color: "#11cdef",
                  padding: "5px",
                  maxHeight: "400px",
                  overflowY: "scroll",
                }}
              >
                <div>
                  {sensors.map((value, index) => (
                    <div key={index}>
                      <Checkbox checked={value.show} onClick={() => handleCheck(value.title)} />
                      {value.title}
                    </div>
                  ))}
                </div>
              </div>
            </Popover>
          </ArgonBox>
          <ArgonBox color={light ? "white" : "inherit"}>
            <IconButton sx={navbarIconButton} size="small">
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
  onChangeFilter: PropTypes.any,
  sensors: PropTypes.any,
};

export default DashboardNavbar;
