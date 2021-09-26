import { useState } from "react";
import ReactDOM from 'react-dom';
// react-router-dom components
import { Link } from "react-router-dom";

// @material-ui core components
import Switch from "@material-ui/core/Switch";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import { Router, Route, Redirect } from 'react-router-dom';
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { createBrowserHistory } from "history";
// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

const hist = createBrowserHistory();

const Inicio = () => (
  <Router history={hist}>
    <Switch>
      <Redirect from="/" to="/admin/inicio" />
    </Switch>
  </Router>
);

export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  
  

  return (
    <CoverLayout
      title="Bienvenido"
      description="Ingresa tu Rut y contraseña"
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Rut
            </SuiTypography>
          </SuiBox>
          <SuiInput type="text" placeholder="RUT" />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Contraseña
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Password" />
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" buttonColor="info" fullWidth >
            Ingresar
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" textColor="text" fontWeight="regular">
            ¿No estas registrado?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              textColor="info"
              fontWeight="medium"
              textGradient
            >
              Registrate 
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}
