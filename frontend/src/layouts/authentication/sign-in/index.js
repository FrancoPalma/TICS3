import { useState } from "react";
import ReactDOM from 'react-dom';
// react-router-dom components
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
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


import { useEffect } from "react";
import { useLocation } from "react-router-dom";




export default function SignIn() {
  const hist = useHistory();
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [isAutentificado, setsetisAutentificado] = useState(false);
  function EnviarDatos() {
    console.log(rut)
    console.log(password)
    if(1 == 1){
      fetch('/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut: rut,
        password: password,
      })
      })
      .then( (response) => {

        if(response.status !== 404) {
          setsetisAutentificado(true)
          return response.json()

        } else {
          console.log('FALLO EL INGRESO');
          setsetisAutentificado(false)
        }

      })
      .then(users => {
        if(isAutentificado === true) {
          console.log("LOGEADO")
          localStorage.setItem('usuario', JSON.stringify(users));
          hist.push('/dashboard')
        }

      })
      .catch((error) => {
        console.log(error)
      });
    }
  }

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
          <SuiInput type="text" placeholder="RUT" onChange={(event) => setRut(event.target.value)}/>
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Contraseña
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={EnviarDatos}>
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
