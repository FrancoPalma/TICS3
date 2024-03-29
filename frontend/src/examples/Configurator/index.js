import { useState, useEffect } from "react";
// react-github-btn
import GitHubButton from "react-github-btn";
// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";
// @material-ui core components
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Icon from "@material-ui/core/Icon";
// @material-ui icons
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
// Custom styles for the Configurator
import styles from "examples/Configurator/styles";
// Soft UI Dashboard Material-UI context
import { useSoftUIController } from "context";
import { useHistory } from "react-router-dom";

function Configurator() {
  const hist = useHistory();
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const classes = styles({ sidenavColor });
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: false });
  };

  const handleTransparentSidenav = () => {
    dispatch({ type: "TRANSPARENT_SIDENAV", value: true });
  };

  const handleWhiteSidenav = () => {
    dispatch({ type: "TRANSPARENT_SIDENAV", value: false });
  };

  const handleFixedNavbar = () => {
    dispatch({ type: "FIXED_NAVBAR", value: !fixedNavbar });
  };

  function CerrarSesion(){
    fetch('/sesion/logout')
      .then( (response) => {
          if(response.status !== 404) {
            localStorage.setItem('usuario', JSON.stringify(null));
            dispatch({ type: "OPEN_CONFIGURATOR", value: false });
            hist.push('/authentication/sign-in');
          } else {
              alert("Algo no salio bien, intentalo de nuevo.")
          }
      })
      .catch((error) => {
          console.log(error)
      });
      
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.configurator, {
          [classes.configurator_open]: openConfigurator,
          [classes.configurator_close]: !openConfigurator,
        }),
      }}
    >
      <SuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <SuiBox>
          <SuiTypography variant="h5">Club Kiddo</SuiTypography>
        </SuiBox>

        <Icon
          className={`material-icons-round font-bold ${classes.configurator_close_icon}`}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SuiBox>

      <Divider />

      <SuiBox pt={1.25} pb={3} py={3} px={3}>
        <SuiBox mt={3}>
          <SuiBox customClass={classes.configurator_sidenav_types}>
            <SuiButton
              buttonColor="info"
              onClick={CerrarSesion}
              disabled={disabled}
              fullWidth
            >
              Cerrar Sesión
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Drawer>
  );
}

export default Configurator;
